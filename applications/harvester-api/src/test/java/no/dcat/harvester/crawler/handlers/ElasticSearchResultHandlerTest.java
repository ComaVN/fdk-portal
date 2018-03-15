package no.dcat.harvester.crawler.handlers;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import no.dcat.shared.Dataset;
import no.dcat.shared.Distribution;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.util.FileManager;
import org.junit.Before;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import static org.junit.Assert.*;
import static org.hamcrest.Matchers.*;

public class ElasticSearchResultHandlerTest {
    private static Logger logger = LoggerFactory.getLogger(ElasticSearchResultHandlerTest.class);

    @Test
    public void delete() throws Throwable {

        Set<String> valid = new HashSet<>();
        valid.add("http://data.brreg.no/datakatalog/dataset/971040823/28");
        valid.add("http://data.brreg.no/datakatalog/dataset/971040823/27");

        assertThat(valid.contains("http://data.brreg.no/datakatalog/dataset/971040823/28"), is(true));

        valid.remove("http://data.brreg.no/datakatalog/dataset/971040823/27");

        assertThat(valid.size(), is(1));
    }

    String msgs = "[\n" +
            "\"[validation_summary] 0 errors, 32 warnings and 0 other messages \",\n" +
            "\"[validation_warning] ValidationError{className\\u003d\\u0027License Document\\u0027, ruleId\\u003d166, ruleSeverity\\u003dwarning, ruleDescription\\u003d\\u0027dct:LicenseDocument does not exist.\\u0027, message\\u003d\\u0027The recommended class dct:LicenseDocument does not exist.\\u0027, subject\\u003dnull, predicate\\u003dnull, object\\u003dnull}, crawler_id\\u003dhttp://dcat.difi.no/dcatSource_1815c610-e5b1-4fd5-8fb6-eb3dcd7c1e9a, crawler_name\\u003ddatanorge, crawler_url\\u003dhttp://data.norge.no/api/dcat2/991825827/data.jsonld, crawler_user\\u003dtest_admin\",\n" +
            "\"[validation_warning] ValidationError{className\\u003d\\u0027Agent\\u0027, ruleId\\u003d2, ruleSeverity\\u003dwarning, ruleDescription\\u003d\\u0027dct:type is a recommended property for Agent.\\u0027, message\\u003d\\u0027The foaf:Agent http://data.brreg.no/enhetsregisteret/enhet/972417858 does not have a dct:type property.\\u0027, subject\\u003dhttp://data.brreg.no/enhetsregisteret/enhet/972417858, predicate\\u003dhttp://www.w3.org/1999/02/22-rdf-syntax-ns#type, object\\u003dhttp://xmlns.com/foaf/0.1/Agent}, crawler_id\\u003dhttp://dcat.difi.no/dcatSource_1815c610-e5b1-4fd5-8fb6-eb3dcd7c1e9a, crawler_name\\u003ddatanorge, crawler_url\\u003dhttp://data.norge.no/api/dcat2/991825827/data.jsonld, crawler_user\\u003dtest_admin\",\n" +
            "\"[validation_warning] ValidationError{className\\u003d\\u0027Catalog\\u0027, ruleId\\u003d21, ruleSeverity\\u003dwarning, ruleDescription\\u003d\\u0027dct:license is a recommended property for Catalog.\\u0027, message\\u003d\\u0027The dcat:Catalog http://www.w3.org/ns/dcat#Catalog does not have dct:license.\\u0027, subject\\u003dhttp://data.norge.no/api/dcat2/991825827/data.jsonld, predicate\\u003dhttp://www.w3.org/1999/02/22-rdf-syntax-ns#type, object\\u003dhttp://www.w3.org/ns/dcat#Catalog}, crawler_id\\u003dhttp://dcat.difi.no/dcatSource_1815c610-e5b1-4fd5-8fb6-eb3dcd7c1e9a, crawler_name\\u003ddatanorge, crawler_url\\u003dhttp://data.norge.no/api/dcat2/991825827/data.jsonld, crawler_user\\u003dtest_admin\",\n" +
            "\"[validation_warning] ValidationError{className\\u003d\\u0027Catalog\\u0027, ruleId\\u003d24, ruleSeverity\\u003dwarning, ruleDescription\\u003d\\u0027dct:issued is a recommended property for Catalog.\\u0027, message\\u003d\\u0027The dcat:Catalog http://www.w3.org/ns/dcat#Catalog does not have a dct:issued property.\\u0027, subject\\u003dhttp://data.norge.no/api/dcat2/991825827/data.jsonld, predicate\\u003dhttp://www.w3.org/1999/02/22-rdf-syntax-ns#type, object\\u003dhttp://www.w3.org/ns/dcat#Catalog}, crawler_id\\u003dhttp://dcat.difi.no/dcatSource_1815c610-e5b1-4fd5-8fb6-eb3dcd7c1e9a, crawler_name\\u003ddatanorge, crawler_url\\u003dhttp://data.norge.no/api/dcat2/991825827/data.jsonld, crawler_user\\u003dtest_admin\",\n" +
            "\"[validation_warning] ValidationError{className\\u003d\\u0027Dataset\\u0027, ruleId\\u003d44, ruleSeverity\\u003dwarning, ruleDescription\\u003d\\u0027dcat:distribution is a recommended property for Dataset.\\u0027, message\\u003d\\u0027The dcat:Dataset http://www.w3.org/ns/dcat#Dataset does not have a dcat:distribution property.\\u0027, subject\\u003dhttp://data.norge.no/node/215, predicate\\u003dhttp://www.w3.org/1999/02/22-rdf-syntax-ns#type, object\\u003dhttp://www.w3.org/ns/dcat#Dataset}, crawler_id\\u003dhttp://dcat.difi.no/dcatSource_1815c610-e5b1-4fd5-8fb6-eb3dcd7c1e9a, crawler_name\\u003ddatanorge, crawler_url\\u003dhttp://data.norge.no/api/dcat2/991825827/data.jsonld, crawler_user\\u003dtest_admin\",\n" +
            "\"[validation_warning] ValidationError{className\\u003d\\u0027Dataset\\u0027, ruleId\\u003d47, ruleSeverity\\u003dwarning, ruleDescription\\u003d\\u0027dcat:keyword is a recommended property for Dataset.\\u0027, message\\u003d\\u0027The dcat:Dataset http://www.w3.org/ns/dcat#Dataset does not have a dcat:keyword property.\\u0027, subject\\u003dhttp://data.norge.no/node/2121, predicate\\u003dhttp://www.w3.org/1999/02/22-rdf-syntax-ns#type, object\\u003dhttp://www.w3.org/ns/dcat#Dataset}, crawler_id\\u003dhttp://dcat.difi.no/dcatSource_1815c610-e5b1-4fd5-8fb6-eb3dcd7c1e9a, crawler_name\\u003ddatanorge, crawler_url\\u003dhttp://data.norge.no/api/dcat2/991825827/data.jsonld, crawler_user\\u003dtest_admin\",\n" +
            "\"[validation_warning] ValidationError{className\\u003d\\u0027Distribution\\u0027, ruleId\\u003d85, ruleSeverity\\u003dwarning, ruleDescription\\u003d\\u0027dct:format has maximum cardinality of 1 for Distribution.\\u0027, message\\u003d\\u0027The dcat:Distribution http://data.norge.no/node/2012 has more than 1 dct:format.\\u0027, subject\\u003dhttp://data.norge.no/node/2012, predicate\\u003dhttp://www.w3.org/1999/02/22-rdf-syntax-ns#type, object\\u003dhttp://www.w3.org/ns/dcat#Distribution}, crawler_id\\u003dhttp://dcat.difi.no/dcatSource_1815c610-e5b1-4fd5-8fb6-eb3dcd7c1e9a, crawler_name\\u003ddatanorge, crawler_url\\u003dhttp://data.norge.no/api/dcat2/991825827/data.jsonld, crawler_user\\u003dtest_admin\",\n" +
            "\"[validation_warning] ValidationError{className\\u003d\\u0027Distribution\\u0027, ruleId\\u003d85, ruleSeverity\\u003dwarning, ruleDescription\\u003d\\u0027dct:format has maximum cardinality of 1 for Distribution.\\u0027, message\\u003d\\u0027The dcat:Distribution http://data.norge.no/node/765 has more than 1 dct:format.\\u0027, subject\\u003dhttp://data.norge.no/node/765, predicate\\u003dhttp://www.w3.org/1999/02/22-rdf-syntax-ns#type, object\\u003dhttp://www.w3.org/ns/dcat#Distribution}, crawler_id\\u003dhttp://dcat.difi.no/dcatSource_1815c610-e5b1-4fd5-8fb6-eb3dcd7c1e9a, crawler_name\\u003ddatanorge, crawler_url\\u003dhttp://data.norge.no/api/dcat2/991825827/data.jsonld, crawler_user\\u003dtest_admin\",\n" +
            "\"[validation_warning] ValidationError{className\\u003d\\u0027Distribution\\u0027, ruleId\\u003d85, ruleSeverity\\u003dwarning, ruleDescription\\u003d\\u0027dct:format has maximum cardinality of 1 for Distribution.\\u0027, message\\u003d\\u0027The dcat:Distribution http://data.norge.no/node/711 has more than 1 dct:format.\\u0027, subject\\u003dhttp://data.norge.no/node/711, predicate\\u003dhttp://www.w3.org/1999/02/22-rdf-syntax-ns#type, object\\u003dhttp://www.w3.org/ns/dcat#Distribution}, crawler_id\\u003dhttp://dcat.difi.no/dcatSource_1815c610-e5b1-4fd5-8fb6-eb3dcd7c1e9a, crawler_name\\u003ddatanorge, crawler_url\\u003dhttp://data.norge.no/api/dcat2/991825827/data.jsonld, crawler_user\\u003dtest_admin\",\n" +
            "\"[validation_warning] ValidationError{className\\u003d\\u0027Distribution\\u0027, ruleId\\u003d85, ruleSeverity\\u003dwarning, ruleDescription\\u003d\\u0027dct:format has maximum cardinality of 1 for Distribution.\\u0027, message\\u003d\\u0027The dcat:Distribution http://data.norge.no/node/965 has more than 1 dct:format.\\u0027, subject\\u003dhttp://data.norge.no/node/965, predicate\\u003dhttp://www.w3.org/1999/02/22-rdf-syntax-ns#type, object\\u003dhttp://www.w3.org/ns/dcat#Distribution}, crawler_id\\u003dhttp://dcat.difi.no/dcatSource_1815c610-e5b1-4fd5-8fb6-eb3dcd7c1e9a, crawler_name\\u003ddatanorge, crawler_url\\u003dhttp://data.norge.no/api/dcat2/991825827/data.jsonld, crawler_user\\u003dtest_admin\",\n" +
            "\"[validation_warning] ValidationError{className\\u003d\\u0027Distribution\\u0027, ruleId\\u003d85, ruleSeverity\\u003dwarning, ruleDescription\\u003d\\u0027dct:format has maximum cardinality of 1 for Distribution.\\u0027, message\\u003d\\u0027The dcat:Distribution http://data.norge.no/node/967 has more than 1 dct:format.\\u0027, subject\\u003dhttp://data.norge.no/node/967, predicate\\u003dhttp://www.w3.org/1999/02/22-rdf-syntax-ns#type, object\\u003dhttp://www.w3.org/ns/dcat#Distribution}, crawler_id\\u003dhttp://dcat.difi.no/dcatSource_1815c610-e5b1-4fd5-8fb6-eb3dcd7c1e9a, crawler_name\\u003ddatanorge, crawler_url\\u003dhttp://data.norge.no/api/dcat2/991825827/data.jsonld, crawler_user\\u003dtest_admin\",\n" +
            "\"[validation_warning] ValidationError{className\\u003d\\u0027Distribution\\u0027, ruleId\\u003d85, ruleSeverity\\u003dwarning, ruleDescription\\u003d\\u0027dct:format has maximum cardinality of 1 for Distribution.\\u0027, message\\u003d\\u0027The dcat:Distribution http://data.norge.no/node/757 has more than 1 dct:format.\\u0027, subject\\u003dhttp://data.norge.no/node/757, predicate\\u003dhttp://www.w3.org/1999/02/22-rdf-syntax-ns#type, object\\u003dhttp://www.w3.org/ns/dcat#Distribution}, crawler_id\\u003dhttp://dcat.difi.no/dcatSource_1815c610-e5b1-4fd5-8fb6-eb3dcd7c1e9a, crawler_name\\u003ddatanorge, crawler_url\\u003dhttp://data.norge.no/api/dcat2/991825827/data.jsonld, crawler_user\\u003dtest_admin\",\n" +
            "\"[validation_warning] ValidationError{className\\u003d\\u0027Distribution\\u0027, ruleId\\u003d85, ruleSeverity\\u003dwarning, ruleDescription\\u003d\\u0027dct:format has maximum cardinality of 1 for Distribution.\\u0027, message\\u003d\\u0027The dcat:Distribution http://data.norge.no/node/933 has more than 1 dct:format.\\u0027, subject\\u003dhttp://data.norge.no/node/933, predicate\\u003dhttp://www.w3.org/1999/02/22-rdf-syntax-ns#type, object\\u003dhttp://www.w3.org/ns/dcat#Distribution}, crawler_id\\u003dhttp://dcat.difi.no/dcatSource_1815c610-e5b1-4fd5-8fb6-eb3dcd7c1e9a, crawler_name\\u003ddatanorge, crawler_url\\u003dhttp://data.norge.no/api/dcat2/991825827/data.jsonld, crawler_user\\u003dtest_admin\",\n" +
            "\"[validation_warning] ValidationError{className\\u003d\\u0027Distribution\\u0027, ruleId\\u003d85, ruleSeverity\\u003dwarning, ruleDescription\\u003d\\u0027dct:format has maximum cardinality of 1 for Distribution.\\u0027, message\\u003d\\u0027The dcat:Distribution http://data.norge.no/node/1652 has more than 1 dct:format.\\u0027, subject\\u003dhttp://data.norge.no/node/1652, predicate\\u003dhttp://www.w3.org/1999/02/22-rdf-syntax-ns#type, object\\u003dhttp://www.w3.org/ns/dcat#Distribution}, crawler_id\\u003dhttp://dcat.difi.no/dcatSource_1815c610-e5b1-4fd5-8fb6-eb3dcd7c1e9a, crawler_name\\u003ddatanorge, crawler_url\\u003dhttp://data.norge.no/api/dcat2/991825827/data.jsonld, crawler_user\\u003dtest_admin\",\n" +
            "\"[validation_warning] ValidationError{className\\u003d\\u0027Distribution\\u0027, ruleId\\u003d85, ruleSeverity\\u003dwarning, ruleDescription\\u003d\\u0027dct:format has maximum cardinality of 1 for Distribution.\\u0027, message\\u003d\\u0027The dcat:Distribution http://data.norge.no/node/1234 has more than 1 dct:format.\\u0027, subject\\u003dhttp://data.norge.no/node/1234, predicate\\u003dhttp://www.w3.org/1999/02/22-rdf-syntax-ns#type, object\\u003dhttp://www.w3.org/ns/dcat#Distribution}, crawler_id\\u003dhttp://dcat.difi.no/dcatSource_1815c610-e5b1-4fd5-8fb6-eb3dcd7c1e9a, crawler_name\\u003ddatanorge, crawler_url\\u003dhttp://data.norge.no/api/dcat2/991825827/data.jsonld, crawler_user\\u003dtest_admin\",\n" +
            "\"[validation_warning] ValidationError{className\\u003d\\u0027Distribution\\u0027, ruleId\\u003d85, ruleSeverity\\u003dwarning, ruleDescription\\u003d\\u0027dct:format has maximum cardinality of 1 for Distribution.\\u0027, message\\u003d\\u0027The dcat:Distribution http://data.norge.no/node/1355 has more than 1 dct:format.\\u0027, subject\\u003dhttp://data.norge.no/node/1355, predicate\\u003dhttp://www.w3.org/1999/02/22-rdf-syntax-ns#type, object\\u003dhttp://www.w3.org/ns/dcat#Distribution}, crawler_id\\u003dhttp://dcat.difi.no/dcatSource_1815c610-e5b1-4fd5-8fb6-eb3dcd7c1e9a, crawler_name\\u003ddatanorge, crawler_url\\u003dhttp://data.norge.no/api/dcat2/991825827/data.jsonld, crawler_user\\u003dtest_admin\",\n" +
            "\"[validation_warning] ValidationError{className\\u003d\\u0027Distribution\\u0027, ruleId\\u003d85, ruleSeverity\\u003dwarning, ruleDescription\\u003d\\u0027dct:format has maximum cardinality of 1 for Distribution.\\u0027, message\\u003d\\u0027The dcat:Distribution http://data.norge.no/node/1151 has more than 1 dct:format.\\u0027, subject\\u003dhttp://data.norge.no/node/1151, predicate\\u003dhttp://www.w3.org/1999/02/22-rdf-syntax-ns#type, object\\u003dhttp://www.w3.org/ns/dcat#Distribution}, crawler_id\\u003dhttp://dcat.difi.no/dcatSource_1815c610-e5b1-4fd5-8fb6-eb3dcd7c1e9a, crawler_name\\u003ddatanorge, crawler_url\\u003dhttp://data.norge.no/api/dcat2/991825827/data.jsonld, crawler_user\\u003dtest_admin\",\n" +
            "\"[validation_warning] ValidationError{className\\u003d\\u0027Distribution\\u0027, ruleId\\u003d85, ruleSeverity\\u003dwarning, ruleDescription\\u003d\\u0027dct:format has maximum cardinality of 1 for Distribution.\\u0027, message\\u003d\\u0027The dcat:Distribution http://data.norge.no/node/960 has more than 1 dct:format.\\u0027, subject\\u003dhttp://data.norge.no/node/960, predicate\\u003dhttp://www.w3.org/1999/02/22-rdf-syntax-ns#type, object\\u003dhttp://www.w3.org/ns/dcat#Distribution}, crawler_id\\u003dhttp://dcat.difi.no/dcatSource_1815c610-e5b1-4fd5-8fb6-eb3dcd7c1e9a, crawler_name\\u003ddatanorge, crawler_url\\u003dhttp://data.norge.no/api/dcat2/991825827/data.jsonld, crawler_user\\u003dtest_admin\",\n" +
            "\"[validation_warning] ValidationError{className\\u003d\\u0027Distribution\\u0027, ruleId\\u003d85, ruleSeverity\\u003dwarning, ruleDescription\\u003d\\u0027dct:format has maximum cardinality of 1 for Distribution.\\u0027, message\\u003d\\u0027The dcat:Distribution http://data.norge.no/node/962 has more than 1 dct:format.\\u0027, subject\\u003dhttp://data.norge.no/node/962, predicate\\u003dhttp://www.w3.org/1999/02/22-rdf-syntax-ns#type, object\\u003dhttp://www.w3.org/ns/dcat#Distribution}, crawler_id\\u003dhttp://dcat.difi.no/dcatSource_1815c610-e5b1-4fd5-8fb6-eb3dcd7c1e9a, crawler_name\\u003ddatanorge, crawler_url\\u003dhttp://data.norge.no/api/dcat2/991825827/data.jsonld, crawler_user\\u003dtest_admin\",\n" +
            "\"[validation_warning] ValidationError{className\\u003d\\u0027Distribution\\u0027, ruleId\\u003d85, ruleSeverity\\u003dwarning, ruleDescription\\u003d\\u0027dct:format has maximum cardinality of 1 for Distribution.\\u0027, message\\u003d\\u0027The dcat:Distribution http://data.norge.no/node/1235 has more than 1 dct:format.\\u0027, subject\\u003dhttp://data.norge.no/node/1235, predicate\\u003dhttp://www.w3.org/1999/02/22-rdf-syntax-ns#type, object\\u003dhttp://www.w3.org/ns/dcat#Distribution}, crawler_id\\u003dhttp://dcat.difi.no/dcatSource_1815c610-e5b1-4fd5-8fb6-eb3dcd7c1e9a, crawler_name\\u003ddatanorge, crawler_url\\u003dhttp://data.norge.no/api/dcat2/991825827/data.jsonld, crawler_user\\u003dtest_admin\",\n" +
            "\"[validation_warning] ValidationError{className\\u003d\\u0027Distribution\\u0027, ruleId\\u003d85, ruleSeverity\\u003dwarning, ruleDescription\\u003d\\u0027dct:format has maximum cardinality of 1 for Distribution.\\u0027, message\\u003d\\u0027The dcat:Distribution http://data.norge.no/node/1653 has more than 1 dct:format.\\u0027, subject\\u003dhttp://data.norge.no/node/1653, predicate\\u003dhttp://www.w3.org/1999/02/22-rdf-syntax-ns#type, object\\u003dhttp://www.w3.org/ns/dcat#Distribution}, crawler_id\\u003dhttp://dcat.difi.no/dcatSource_1815c610-e5b1-4fd5-8fb6-eb3dcd7c1e9a, crawler_name\\u003ddatanorge, crawler_url\\u003dhttp://data.norge.no/api/dcat2/991825827/data.jsonld, crawler_user\\u003dtest_admin\",\n" +
            "\"[validation_warning] ValidationError{className\\u003d\\u0027Distribution\\u0027, ruleId\\u003d85, ruleSeverity\\u003dwarning, ruleDescription\\u003d\\u0027dct:format has maximum cardinality of 1 for Distribution.\\u0027, message\\u003d\\u0027The dcat:Distribution http://data.norge.no/node/827 has more than 1 dct:format.\\u0027, subject\\u003dhttp://data.norge.no/node/827, predicate\\u003dhttp://www.w3.org/1999/02/22-rdf-syntax-ns#type, object\\u003dhttp://www.w3.org/ns/dcat#Distribution}, crawler_id\\u003dhttp://dcat.difi.no/dcatSource_1815c610-e5b1-4fd5-8fb6-eb3dcd7c1e9a, crawler_name\\u003ddatanorge, crawler_url\\u003dhttp://data.norge.no/api/dcat2/991825827/data.jsonld, crawler_user\\u003dtest_admin\",\n" +
            "\"[validation_warning] ValidationError{className\\u003d\\u0027Distribution\\u0027, ruleId\\u003d85, ruleSeverity\\u003dwarning, ruleDescription\\u003d\\u0027dct:format has maximum cardinality of 1 for Distribution.\\u0027, message\\u003d\\u0027The dcat:Distribution http://data.norge.no/node/1269 has more than 1 dct:format.\\u0027, subject\\u003dhttp://data.norge.no/node/1269, predicate\\u003dhttp://www.w3.org/1999/02/22-rdf-syntax-ns#type, object\\u003dhttp://www.w3.org/ns/dcat#Distribution}, crawler_id\\u003dhttp://dcat.difi.no/dcatSource_1815c610-e5b1-4fd5-8fb6-eb3dcd7c1e9a, crawler_name\\u003ddatanorge, crawler_url\\u003dhttp://data.norge.no/api/dcat2/991825827/data.jsonld, crawler_user\\u003dtest_admin\",\n" +
            "\"[validation_warning] ValidationError{className\\u003d\\u0027Distribution\\u0027, ruleId\\u003d85, ruleSeverity\\u003dwarning, ruleDescription\\u003d\\u0027dct:format has maximum cardinality of 1 for Distribution.\\u0027, message\\u003d\\u0027The dcat:Distribution http://data.norge.no/node/1277 has more than 1 dct:format.\\u0027, subject\\u003dhttp://data.norge.no/node/1277, predicate\\u003dhttp://www.w3.org/1999/02/22-rdf-syntax-ns#type, object\\u003dhttp://www.w3.org/ns/dcat#Distribution}, crawler_id\\u003dhttp://dcat.difi.no/dcatSource_1815c610-e5b1-4fd5-8fb6-eb3dcd7c1e9a, crawler_name\\u003ddatanorge, crawler_url\\u003dhttp://data.norge.no/api/dcat2/991825827/data.jsonld, crawler_user\\u003dtest_admin\",\n" +
            "\"[validation_warning] ValidationError{className\\u003d\\u0027Distribution\\u0027, ruleId\\u003d85, ruleSeverity\\u003dwarning, ruleDescription\\u003d\\u0027dct:format has maximum cardinality of 1 for Distribution.\\u0027, message\\u003d\\u0027The dcat:Distribution http://data.norge.no/node/1267 has more than 1 dct:format.\\u0027, subject\\u003dhttp://data.norge.no/node/1267, predicate\\u003dhttp://www.w3.org/1999/02/22-rdf-syntax-ns#type, object\\u003dhttp://www.w3.org/ns/dcat#Distribution}, crawler_id\\u003dhttp://dcat.difi.no/dcatSource_1815c610-e5b1-4fd5-8fb6-eb3dcd7c1e9a, crawler_name\\u003ddatanorge, crawler_url\\u003dhttp://data.norge.no/api/dcat2/991825827/data.jsonld, crawler_user\\u003dtest_admin\",\n" +
            "\"[validation_warning] ValidationError{className\\u003d\\u0027Distribution\\u0027, ruleId\\u003d85, ruleSeverity\\u003dwarning, ruleDescription\\u003d\\u0027dct:format has maximum cardinality of 1 for Distribution.\\u0027, message\\u003d\\u0027The dcat:Distribution http://data.norge.no/node/1275 has more than 1 dct:format.\\u0027, subject\\u003dhttp://data.norge.no/node/1275, predicate\\u003dhttp://www.w3.org/1999/02/22-rdf-syntax-ns#type, object\\u003dhttp://www.w3.org/ns/dcat#Distribution}, crawler_id\\u003dhttp://dcat.difi.no/dcatSource_1815c610-e5b1-4fd5-8fb6-eb3dcd7c1e9a, crawler_name\\u003ddatanorge, crawler_url\\u003dhttp://data.norge.no/api/dcat2/991825827/data.jsonld, crawler_user\\u003dtest_admin\",\n" +
            "\"[validation_warning] ValidationError{className\\u003d\\u0027Distribution\\u0027, ruleId\\u003d85, ruleSeverity\\u003dwarning, ruleDescription\\u003d\\u0027dct:format has maximum cardinality of 1 for Distribution.\\u0027, message\\u003d\\u0027The dcat:Distribution http://data.norge.no/node/1265 has more than 1 dct:format.\\u0027, subject\\u003dhttp://data.norge.no/node/1265, predicate\\u003dhttp://www.w3.org/1999/02/22-rdf-syntax-ns#type, object\\u003dhttp://www.w3.org/ns/dcat#Distribution}, crawler_id\\u003dhttp://dcat.difi.no/dcatSource_1815c610-e5b1-4fd5-8fb6-eb3dcd7c1e9a, crawler_name\\u003ddatanorge, crawler_url\\u003dhttp://data.norge.no/api/dcat2/991825827/data.jsonld, crawler_user\\u003dtest_admin\",\n" +
            "\"[validation_warning] ValidationError{className\\u003d\\u0027Distribution\\u0027, ruleId\\u003d85, ruleSeverity\\u003dwarning, ruleDescription\\u003d\\u0027dct:format has maximum cardinality of 1 for Distribution.\\u0027, message\\u003d\\u0027The dcat:Distribution http://data.norge.no/node/1273 has more than 1 dct:format.\\u0027, subject\\u003dhttp://data.norge.no/node/1273, predicate\\u003dhttp://www.w3.org/1999/02/22-rdf-syntax-ns#type, object\\u003dhttp://www.w3.org/ns/dcat#Distribution}, crawler_id\\u003dhttp://dcat.difi.no/dcatSource_1815c610-e5b1-4fd5-8fb6-eb3dcd7c1e9a, crawler_name\\u003ddatanorge, crawler_url\\u003dhttp://data.norge.no/api/dcat2/991825827/data.jsonld, crawler_user\\u003dtest_admin\",\n" +
            "\"[validation_warning] ValidationError{className\\u003d\\u0027Distribution\\u0027, ruleId\\u003d85, ruleSeverity\\u003dwarning, ruleDescription\\u003d\\u0027dct:format has maximum cardinality of 1 for Distribution.\\u0027, message\\u003d\\u0027The dcat:Distribution http://data.norge.no/node/1263 has more than 1 dct:format.\\u0027, subject\\u003dhttp://data.norge.no/node/1263, predicate\\u003dhttp://www.w3.org/1999/02/22-rdf-syntax-ns#type, object\\u003dhttp://www.w3.org/ns/dcat#Distribution}, crawler_id\\u003dhttp://dcat.difi.no/dcatSource_1815c610-e5b1-4fd5-8fb6-eb3dcd7c1e9a, crawler_name\\u003ddatanorge, crawler_url\\u003dhttp://data.norge.no/api/dcat2/991825827/data.jsonld, crawler_user\\u003dtest_admin\",\n" +
            "\"[validation_warning] ValidationError{className\\u003d\\u0027Distribution\\u0027, ruleId\\u003d85, ruleSeverity\\u003dwarning, ruleDescription\\u003d\\u0027dct:format has maximum cardinality of 1 for Distribution.\\u0027, message\\u003d\\u0027The dcat:Distribution http://data.norge.no/node/1271 has more than 1 dct:format.\\u0027, subject\\u003dhttp://data.norge.no/node/1271, predicate\\u003dhttp://www.w3.org/1999/02/22-rdf-syntax-ns#type, object\\u003dhttp://www.w3.org/ns/dcat#Distribution}, crawler_id\\u003dhttp://dcat.difi.no/dcatSource_1815c610-e5b1-4fd5-8fb6-eb3dcd7c1e9a, crawler_name\\u003ddatanorge, crawler_url\\u003dhttp://data.norge.no/api/dcat2/991825827/data.jsonld, crawler_user\\u003dtest_admin\",\n" +
            "\"[validation_warning] ValidationError{className\\u003d\\u0027Distribution\\u0027, ruleId\\u003d85, ruleSeverity\\u003dwarning, ruleDescription\\u003d\\u0027dct:format has maximum cardinality of 1 for Distribution.\\u0027, message\\u003d\\u0027The dcat:Distribution http://data.norge.no/node/1174 has more than 1 dct:format.\\u0027, subject\\u003dhttp://data.norge.no/node/1174, predicate\\u003dhttp://www.w3.org/1999/02/22-rdf-syntax-ns#type, object\\u003dhttp://www.w3.org/ns/dcat#Distribution}, crawler_id\\u003dhttp://dcat.difi.no/dcatSource_1815c610-e5b1-4fd5-8fb6-eb3dcd7c1e9a, crawler_name\\u003ddatanorge, crawler_url\\u003dhttp://data.norge.no/api/dcat2/991825827/data.jsonld, crawler_user\\u003dtest_admin\",\n" +
            "\"[validation_warning] ValidationError{className\\u003d\\u0027Distribution\\u0027, ruleId\\u003d85, ruleSeverity\\u003dwarning, ruleDescription\\u003d\\u0027dct:format has maximum cardinality of 1 for Distribution.\\u0027, message\\u003d\\u0027The dcat:Distribution http://data.norge.no/node/2148 has more than 1 dct:format.\\u0027, subject\\u003dhttp://data.norge.no/node/2148, predicate\\u003dhttp://www.w3.org/1999/02/22-rdf-syntax-ns#type, object\\u003dhttp://www.w3.org/ns/dcat#Distribution}, crawler_id\\u003dhttp://dcat.difi.no/dcatSource_1815c610-e5b1-4fd5-8fb6-eb3dcd7c1e9a, crawler_name\\u003ddatanorge, crawler_url\\u003dhttp://data.norge.no/api/dcat2/991825827/data.jsonld, crawler_user\\u003dtest_admin\"\n" +
            "]";

    private ElasticSearchResultHandler resultHandler;
    private List<String> validationMessages;

    @Before
    public void setup() {
        resultHandler = new ElasticSearchResultHandler(null, 0, null, null, null, null);
        validationMessages = new Gson().fromJson(msgs, new TypeToken<List<String>>(){}.getType());
    }

    @Test
    public void validationMessageExtractionDataset1() {
        Dataset dataset = new Dataset();
        dataset.setUri("http://data.norge.no/node/215/xxx");
        Distribution distribution = new Distribution();
        distribution.setUri("http://data.norge.no/node/960");
        dataset.setDistribution(Arrays.asList(distribution));

        List<String> actual = resultHandler.filterValidationMessagesForDataset(validationMessages, dataset);
        logger.info(actual.toString());
        assertThat("can extract validation message for distribution in dataset", actual.size(), is(1));

        dataset.setUri("http://data.norge.no/node/2121");
        dataset.setDistribution(null);
        actual = resultHandler.filterValidationMessagesForDataset(validationMessages, dataset);
        logger.info(actual.toString());

        assertThat( "Can extract validation message for dataset", actual.size(), is(1));
    }

    @Test
    public void validDistribution() throws Throwable {
        Dataset dataset = new Dataset();

        dataset.setUri("http://2");
        Distribution dist = new Distribution();
        dist.setUri("http://data.norge.no/node/960");
        dataset.setDistribution(Arrays.asList(dist));

        List<String> actual = resultHandler.filterValidationMessagesForDataset(validationMessages, dataset);

        logger.info(actual.toString());

        assertThat("Should return 1 validation messages", actual.size(), is(1));

    }

    @Test
    public void getDatasetUris() throws Throwable {
        Model model = FileManager.get().loadModel("ramsund.ttl");

        Set<String> actual = resultHandler.getDatasetsUris(model, "http://brreg.no/catalogs/910244132");

        assertThat("Should return 4 dataset uris", actual.size(), is(4));
    }


    @Test
    public void testDatasetHarvestRecord() throws Throwable {


    }

}
