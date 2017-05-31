package no.dcat.controller;

import com.github.ulisesbocchio.spring.boot.security.saml.user.SAMLUserDetails;
import no.dcat.configuration.SpringSecurityContextBean;
import no.dcat.mock.service.AuthorisationService;
import no.dcat.mock.service.FolkeregisteretService;
import no.dcat.model.Catalog;
import no.dcat.model.user.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

import static org.springframework.http.HttpStatus.OK;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
public class LoginController {

    private static Logger logger = LoggerFactory.getLogger(LoginController.class);

    private CatalogController catalogController;
    private SpringSecurityContextBean springSecurityContextBean;

    @Autowired
    public LoginController(CatalogController catalogController, SpringSecurityContextBean springSecurityContextBean) {
        this.catalogController = catalogController;
        this.springSecurityContextBean = springSecurityContextBean;
    }

    @CrossOrigin
    @RequestMapping(value = "/innloggetBruker", method = GET)
    HttpEntity<User> getLoggedInUser() {
        Authentication authentication = springSecurityContextBean.getAuthentication();
        SAMLUserDetails userDetails = (SAMLUserDetails) authentication.getPrincipal();
        String ssn = userDetails.getAttribute("uid");

        User user = new User();
        user.setCatalog(AuthorisationService.getOrganisation(ssn));
        user.setName(FolkeregisteretService.getName(ssn));

        createCatalogIfNotExists(user.getCatalog());

        return new ResponseEntity<>(user, OK);
    }

    /**
     * Login method (temporary solution until SAML)
     *
     * @return acknowledgment of success or failure
     */
    @CrossOrigin
    @RequestMapping(value = "/login", method = POST)
    public HttpEntity<String> authenticateAndCreateMissingCatalogs() {
        Authentication auth = springSecurityContextBean.getAuthentication();

        //get logged in username
        String username = auth.getName();

        auth.getAuthorities()
                .forEach(authority -> createCatalogIfNotExists(authority.getAuthority()));

        logger.info("Authenticating user: ");
        return new ResponseEntity<>(username, OK);
    }

    private Optional<Catalog> createCatalogIfNotExists(String orgnr) {
        if (! orgnr.matches("\\d{9}")) {
            return Optional.empty();
        }

        HttpEntity<Catalog> catalogResponse = catalogController.getCatalog(orgnr);
        if (!((ResponseEntity) catalogResponse).getStatusCode().equals(HttpStatus.OK)) {
            return Optional.of(catalogController.createCatalog(new Catalog(orgnr)).getBody());
        }
        return Optional.empty();
    }
}
