gpackage no.dcat.portal.webapp;

import no.dcat.portal.webapp.comparator.PublisherOrganisasjonsformComparator;
import no.dcat.portal.webapp.comparator.ThemeTitleComparator;
import no.dcat.portal.webapp.utility.DataitemQuery;
import no.dcat.portal.webapp.utility.ResponseManipulation;
import no.dcat.portal.webapp.utility.TransformModel;
import no.difi.dcat.datastore.domain.dcat.DataTheme;
import no.difi.dcat.datastore.domain.dcat.Dataset;
import no.difi.dcat.datastore.domain.dcat.Publisher;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.StatusLine;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.HttpClientUtils;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.util.Locale;
import java.util.List;
import java.util.Collections;
import java.util.ArrayList;
import java.net.URI;
import java.io.IOException;
import javax.servlet.http.HttpSession;

/**
 * Delivers html pages to support the DCAT Portal application.
 *
 *
 * Created by nodavsko on 12.10.2016.
 */
@Controller
public class PortalController {
    public static final String MODEL_THEME = "theme";
    public static final String MODEL_PUBLISHER = "publisher";

    private static Logger logger = LoggerFactory.getLogger(PortalController.class);

    private final PortalConfiguration buildMetadata;
    private static String codeLists = null;

    @Autowired
    public PortalController(final PortalConfiguration metadata) {
        this.buildMetadata = metadata;
    }

    /**
     * The result page. Sets callback service and version identification and returns
     * result.html page.
     *
     * @param session the session objec
     * @param theme Filter on the specified filter.
     * @param publisher Filter on the specified publisher.
     * @return the result html page (or just the name of the page)
     */
    @RequestMapping(value = {"/results"})
    final ModelAndView result(final HttpSession session,
                              @RequestParam(value = "q", defaultValue = "") String q,
                              @RequestParam(value = "theme", defaultValue = "") String theme,
                              @RequestParam(value = "publisher", defaultValue = "") String publisher) {

        session.setAttribute("dcatQueryService", buildMetadata.getQueryServiceExternal());

        ModelAndView model = new ModelAndView("result");

        logger.debug(buildMetadata.getQueryServiceExternal());
        logger.debug(buildMetadata.getVersionInformation());

        session.setAttribute("versionInformation", buildMetadata.getVersionInformation());
        session.setAttribute("theme", theme);
        session.setAttribute("publisher", publisher);

        model.addObject("themes", getCodeLists());

        model.addObject("query", q);
        return model; // templates/result.html
    }

    /**
     * Controller for getting the dataset corresponding to the provided id.
     *
     * @param id The id that identifies the dataset.
     * @return One Dataset attatched to a ModelAndView.
     */
    @RequestMapping({"/detail"})
    public ModelAndView detail(@RequestParam(value = "id", defaultValue = "") String id) {
        ModelAndView model = new ModelAndView("detail");

        try {
            URI uri = new URIBuilder(buildMetadata.getDetailsServiceUrl()).addParameter("id", id).build();
            HttpClient httpClient = HttpClientBuilder.create().build();

            logger.debug(String.format("Query for dataset: %s", uri.getQuery()));
            String json = httpGet(httpClient, uri);

            logger.debug(String.format("Found dataset: %s", json));
            Dataset dataset = new ElasticSearchResponse().toListOfObjects(json, Dataset.class).get(0);

            dataset = new ResponseManipulation().fillWithAlternativeLangValIfEmpty(dataset, "nb");
            model.addObject("dataset", dataset);
        } catch (Exception e) {
            logger.error(String.format("An error occured: %s", e.getMessage()));
            model.addObject("exceptionmessage", e.getMessage());
            model.setViewName("error");
        }

        return model;
    }

    /**
     * Controller for getting all themes loaded in elasticsearch.
     * <p/>
     * Retrieves all themes that is loaded into elasticsearch.
     * The list is sorted on theme-name and finally added to the viewmodell.
     * <p/>
     *
     * @return A list of DatatTheme attatched to a ModelAndView.
     */
    @RequestMapping({"/"})
    public ModelAndView themes() {
        ModelAndView model = new ModelAndView(MODEL_THEME);
        List<DataTheme> dataThemes = new ArrayList<>();
        Locale l = LocaleContextHolder.getLocale();
        logger.debug(l.getLanguage());

        try {
            HttpClient httpClient = HttpClientBuilder.create().build();
            URI uri = new URIBuilder(buildMetadata.getThemeServiceUrl()).build();
            logger.debug("Query for all themes at URL: " + uri.toString());

            String json = httpGet(httpClient, uri);

            dataThemes = new ElasticSearchResponse().toListOfObjects(json, DataTheme.class);

            Collections.sort(dataThemes, new ThemeTitleComparator(l.getLanguage() == "en" ? "en" : "nb"));

            logger.debug(String.format("Found datathemes: %s", json));
        } catch (Exception e) {
            logger.error(String.format("An error occured: %s", e.getMessage()));
            model.addObject("exceptionmessage", e.getMessage());
            model.setViewName("error");
        }

        model.addObject("lang", l.getLanguage() == "en" ? "en" : "nb");
        model.addObject("themes", dataThemes);
        model.addObject("dataitemquery", new DataitemQuery());
        return model;
    }

    /**
     * Controller for getting all publisher loaded in elasticsearch.
     * <p/>
     * Retrieves all publisher loaded into elasticsearch.
     * Transfrom the list into an hierarchical model where the top-publisher is added to a list
     * which is added to the modelView. The list is sorted on type of Publisher.
     *
     * @return A list of Publisher attatched to a ModelAndView.
     */
    @RequestMapping({"/publisher"})
    public ModelAndView publisher() {
        ModelAndView model = new ModelAndView(MODEL_PUBLISHER);
        List<Publisher> publisherGrouped = new ArrayList<>();

        try {
            HttpClient httpClient = HttpClientBuilder.create().build();
            URI uri = new URIBuilder(buildMetadata.getPublisherServiceUrl()).build();
            logger.debug("Query for all publisher");

            String json = httpGet(httpClient, uri);

            List<Publisher> publishersFlat = new ElasticSearchResponse().toListOfObjects(json, Publisher.class);

            List<Publisher> publishersHier = TransformModel.organisePublisherHierarcally(publishersFlat);

            publisherGrouped = TransformModel.groupPublisher(publishersHier);

            Collections.sort(publisherGrouped , new PublisherOrganisasjonsformComparator());

            logger.debug(String.format("Found publishers: %s", json));
        } catch (Exception e) {
            logger.error(String.format("An error occured: %s", e.getMessage()));
            model.addObject("exceptionmessage", e.getMessage());
            model.setViewName("error");
        }

        model.addObject("publisher", publisherGrouped);
        model.addObject("dataitemquery", new DataitemQuery());
        return model;
    }

    /**
     * Returns a JSON structure that contains the code-lists that the portal webapp uses.
     * The code-lists are fetched from the query service first time.
     * <p>
     * Code lists:
     * - data-theme (EU Themes)
     * <p>
     * TODO - add necessary codelists
     *
     * @return a JSON of the code-lists. { "data-theme" : [ {"AGRI" : {"nb": "Jord og skogbruk"}}, ...], ...}
     */
    private String getCodeLists() {
        if (codeLists == null) {
            HttpClient httpClient = HttpClientBuilder.create().build();
            try {
                URI uri = new URIBuilder(buildMetadata.getThemeServiceUrl() + "?size=50").build();

                String json = httpGet(httpClient, uri);

                codeLists = "var codeList = { \"data-themes\":" + json + "};";

            } catch (Exception e) {
                logger.error(String.format("Could not load data-themes: %s", e.getMessage()));
                codeLists = null;
            }
        }
        return codeLists;
    }

    private String httpGet(HttpClient httpClient, URI uri) throws IOException {
        HttpEntity entity;
        HttpResponse response = null;
        String json = null;
        try {
            HttpGet getRequest = new HttpGet(uri);
            response = httpClient.execute(getRequest);

            checkStatusCode(response);

            entity = response.getEntity();

            json = EntityUtils.toString(entity, "UTF-8");

            // Release used resources.
            EntityUtils.consume(entity);
        } finally {
            // Release used resources.
            if (response != null) {
                HttpClientUtils.closeQuietly(response);
            }
        }
        return json;
    }

    private void checkStatusCode(final HttpResponse response) {
        StatusLine statusLine = response.getStatusLine();
        if (statusLine.getStatusCode() != HttpStatus.OK.value()) {
            logger.error(String.format("Query failed, http-code: %s, reason: %s", statusLine.getStatusCode(), statusLine.getReasonPhrase()));
            throw new RuntimeException(String.format("Query failed, http-code: %s, reason: %s", statusLine.getStatusCode(), statusLine.getReasonPhrase()));
        }
    }
}
