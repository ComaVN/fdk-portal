import React from 'react';
import { NavLink } from 'react-router-dom';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';

import ChevronUpIcon from '@fellesdatakatalog/icons/assets/svg/chevron-up-stroke.svg';

import {
  PATHNAME_DATASETS,
  PATHNAME_DATA_SERVICES,
  PATHNAME_CONCEPTS,
  PATHNAME_CONCEPTS_COMPARE,
  PATHNAME_GUIDANCE,
  PATHNAME_GUIDANCE_METADATA,
  PATHNAME_INFORMATIONMODELS,
  PATHNAME_MAIN_PAGE,
  PATHNAME_ORGANIZATIONS,
  PATHNAME_PUBLIC_SERVICES,
  PATHNAME_EVENTS,
  PATHNAME_REPORTS,
  PATHNAME_SPARQL,
  PATHNAME_ABOUT_DATASETS,
  PATHNAME_ABOUT_DATA_SERVICES,
  PATHNAME_ABOUT_CONCEPTS,
  PATHNAME_ABOUT_INFORMATIONMODELS,
  PATHNAME_AI,
  PATHNAME_TRANSPORT_GENERAL,
  PATHNAME_TRANSPORT_GENERAL_INFO_ABOUT_THE_PORTAL,
  PATHNAME_TRANSPORT_GENERAL_ITS,
  PATHNAME_TRANSPORT_GENERAL_ROLES,
  PATHNAME_TRANSPORT_USERS_NEWS,
  PATHNAME_TRANSPORT_USERS_WHERE,
  PATHNAME_TRANSPORT_USERS_WHAT,
  PATHNAME_TRANSPORT_USERS_DATA_IN_NAP,
  PATHNAME_TRANSPORT_PROVIDERS_ADD,
  PATHNAME_TRANSPORT_PROVIDERS_COMPLIANCE,
  PATHNAME_REQUESTS,
  PATHNAME_ABOUT_HARVESTING,
  PATHNAME_ABOUT_REGISTRATION,
  PATHNAME_TERMS_OF_USE,
  PATHNAME_PUBLISHING
} from '../../constants/constants';
import DatasetBreadcrumb from './dataset-breadcrumb';
import DataServiceBreadcrumb from './data-service-breadcrumb';
import ConceptBreadcrumb from './concept-breadcrumb';
import InformationModelBreadcrumb from './informationModel-breadbrumb';
import PathNameBreadcrumb from './pathname-breadcrumb';
import './breadcrumbs.scss';
import OrganizationBreadcrumb from './organization-breadcrumb';
import PublicServiceBreadcrumb from './public-service-breadcrumb';
import EventBreadcrumb from './event-breadcrumb';
import SparqlPageBreadcrumb from './sparql-page-breadcrumb';
import { getConfig } from '../../config';

// define some custom breadcrumbs for certain routes (optional)
const routes = [
  {
    path: PATHNAME_MAIN_PAGE,
    breadcrumb: () => (
      <PathNameBreadcrumb
        pathName={getConfig().themeNap ? 'homeNAP' : 'home'}
      />
    )
  },
  { path: `${PATHNAME_DATASETS}/:id`, breadcrumb: DatasetBreadcrumb },
  {
    path: `${PATHNAME_DATA_SERVICES}/:id`,
    breadcrumb: DataServiceBreadcrumb
  },
  {
    path: `${PATHNAME_CONCEPTS}${PATHNAME_CONCEPTS_COMPARE}`,
    breadcrumb: () => <PathNameBreadcrumb pathName='conceptsCompare' />
  },
  { path: '/concepts/:id', breadcrumb: ConceptBreadcrumb },
  {
    path: `${PATHNAME_INFORMATIONMODELS}/:id`,
    breadcrumb: InformationModelBreadcrumb
  },
  { path: '/about', breadcrumb: () => <PathNameBreadcrumb pathName='about' /> },
  {
    path: PATHNAME_REPORTS,
    breadcrumb: () => <PathNameBreadcrumb pathName='reports' />
  },
  {
    path: PATHNAME_GUIDANCE,
    breadcrumb: () => <PathNameBreadcrumb pathName='guidance' />
  },
  {
    path: PATHNAME_GUIDANCE_METADATA,
    breadcrumb: () => <PathNameBreadcrumb pathName='guidanceMetadata' />
  },
  {
    path: PATHNAME_ORGANIZATIONS,
    breadcrumb: () => <PathNameBreadcrumb pathName='organizations' />
  },
  {
    path: `${PATHNAME_ORGANIZATIONS}/:organizationId`,
    breadcrumb: () => <OrganizationBreadcrumb />
  },
  {
    path: `${PATHNAME_ORGANIZATIONS}/:organizationId/datasets`,
    breadcrumb: () => <PathNameBreadcrumb pathName='datasets' />
  },
  {
    path: `${PATHNAME_ORGANIZATIONS}/:organizationId/datasets/:id`,
    breadcrumb: DatasetBreadcrumb
  },
  {
    path: `${PATHNAME_PUBLIC_SERVICES}/:publicServiceId`,
    breadcrumb: () => <PublicServiceBreadcrumb />
  },
  {
    path: `${PATHNAME_EVENTS}/:eventId`,
    breadcrumb: () => <EventBreadcrumb />
  },
  {
    path: PATHNAME_SPARQL,
    breadcrumb: () => <SparqlPageBreadcrumb pathName='sparql' />
  },
  {
    path: PATHNAME_ABOUT_DATASETS,
    breadcrumb: () => <PathNameBreadcrumb pathName='aboutDatasets' />
  },
  {
    path: PATHNAME_ABOUT_DATA_SERVICES,
    breadcrumb: () => <PathNameBreadcrumb pathName='aboutDataServices' />
  },
  {
    path: PATHNAME_ABOUT_CONCEPTS,
    breadcrumb: () => <PathNameBreadcrumb pathName='aboutConcepts' />
  },
  {
    path: PATHNAME_ABOUT_INFORMATIONMODELS,
    breadcrumb: () => <PathNameBreadcrumb pathName='aboutInformationModels' />
  },
  {
    path: PATHNAME_ABOUT_HARVESTING,
    breadcrumb: () => (
      <PathNameBreadcrumb pathName='aboutHarvestingDataEndpoints' />
    )
  },
  {
    path: `${PATHNAME_PUBLISHING}${PATHNAME_ABOUT_HARVESTING}`,
    breadcrumb: () => (
      <PathNameBreadcrumb pathName='aboutHarvestingDataEndpoints' />
    )
  },
  {
    path: PATHNAME_ABOUT_REGISTRATION,
    breadcrumb: () => <PathNameBreadcrumb pathName='aboutRegistration' />
  },
  {
    path: `${PATHNAME_PUBLISHING}${PATHNAME_ABOUT_REGISTRATION}`,
    breadcrumb: () => <PathNameBreadcrumb pathName='aboutRegistration' />
  },
  {
    path: `${PATHNAME_PUBLISHING}${PATHNAME_TERMS_OF_USE}`,
    breadcrumb: () => <PathNameBreadcrumb pathName='termsOfUse' />
  },
  {
    path: PATHNAME_AI,
    breadcrumb: () => <PathNameBreadcrumb pathName='ai' />
  },
  {
    path: PATHNAME_TRANSPORT_GENERAL,
    breadcrumb: () => <PathNameBreadcrumb pathName='transportGeneral' />
  },
  {
    path: PATHNAME_TRANSPORT_GENERAL_ROLES,
    breadcrumb: () => (
      <PathNameBreadcrumb pathName='transportRolesAndResponsibilies' />
    )
  },
  {
    path: PATHNAME_TRANSPORT_GENERAL_ITS,
    breadcrumb: () => (
      <PathNameBreadcrumb pathName='transportItsDirectiveAndDelegatedRegulations' />
    )
  },
  {
    path: PATHNAME_TRANSPORT_GENERAL_INFO_ABOUT_THE_PORTAL,
    breadcrumb: () => (
      <PathNameBreadcrumb pathName='transportInformationAboutThePortal' />
    )
  },
  {
    path: PATHNAME_TRANSPORT_USERS_NEWS,
    breadcrumb: () => <PathNameBreadcrumb pathName='transportNews' />
  },
  {
    path: PATHNAME_TRANSPORT_USERS_WHERE,
    breadcrumb: () => (
      <PathNameBreadcrumb pathName='transportWhereDoIFindTheData' />
    )
  },
  {
    path: PATHNAME_TRANSPORT_USERS_WHAT,
    breadcrumb: () => (
      <PathNameBreadcrumb pathName='transportWhatDataIsAvailable' />
    )
  },
  {
    path: PATHNAME_TRANSPORT_USERS_DATA_IN_NAP,
    breadcrumb: () => <PathNameBreadcrumb pathName='transportDataInNap' />
  },
  {
    path: PATHNAME_TRANSPORT_PROVIDERS_ADD,
    breadcrumb: () => <PathNameBreadcrumb pathName='transportAddData' />
  },
  {
    path: PATHNAME_TRANSPORT_PROVIDERS_COMPLIANCE,
    breadcrumb: () => (
      <PathNameBreadcrumb pathName='transportDeclarationOfCompliance' />
    )
  },
  {
    path: PATHNAME_REQUESTS,
    breadcrumb: () => <PathNameBreadcrumb pathName='requests' />
  }
];

const options = {
  disableDefaults: true,
  excludePaths: []
};

// map & render your breadcrumb components however you want.
// each `breadcrumb` has the props `key`, `location`, and `match` included!
function PureBreadcrumbs({ breadcrumbs }) {
  if (breadcrumbs && breadcrumbs.length > 1) {
    return (
      <div className='fdk-p-path'>
        <div className='container'>
          <p className='col-12 col-xs-12 my-2'>
            {breadcrumbs.map(({ key, match, breadcrumb }, index) => (
              <span key={key}>
                {index < breadcrumbs.length - 1 && (
                  <>
                    <NavLink to={match.url}>{breadcrumb}</NavLink>
                    <ChevronUpIcon className='fdk-path-chevron' />
                  </>
                )}
                {index === breadcrumbs.length - 1 && breadcrumb}
              </span>
            ))}
          </p>
        </div>
      </div>
    );
  }
  return null;
}

export const Breadcrumbs = withBreadcrumbs(routes, options)(PureBreadcrumbs);
