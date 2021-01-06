import {
  DataFormat,
  RatingCategory,
  Entity as EntityType,
  DimensionType,
  IndicatorType
} from './enums';

export interface InformationModel {
  id: string;
  uri: string;
  identifier?: string;
  publisher?: Partial<Publisher>;
  harvestSourceUri?: string;
  harvest?: Partial<Harvest>;
  title?: Partial<TextLanguage>;
  name?: Partial<TextLanguage>;
  schema?: string;
  containsSubjects?: string[];
  modelElements?: Record<string, Partial<InformationModelElement>>;
  modelProperties?: Record<string, Partial<InformationModelProperty>>;
  isPartOf?: string;
  hasPart?: string;
  isReplacedBy?: string;
  replaces?: string;
  objectTypes?: Partial<Node>[];
  codeTypes?: Partial<Node>[];
  dataTypes?: Partial<Node>[];
  simpleTypes?: Partial<Node>[];
  description?: Partial<TextLanguage>;
  modelDescription?: Partial<TextLanguage>;
  isDescribedByUri?: string;
  dctType?: string;
  status?: string;
  issued?: string;
  modified?: string;
  validFromIncluding?: string;
  validToIncluding?: string;
  versionInfo?: string;
  license?: InformationModelLicense[];
  language?: InformationModelLanguage[];
  keyword?: Partial<TextLanguage>[];
  category?: string;
  homepage?: string;
  landingPage?: string;
  spatial?: SpatialRestriction[];
  concept?: Partial<Concept>;
  theme?: EuTheme[];
  losTheme?: LosTheme[];
  contactPoint?: Partial<InformationModelContactPoint>[];
}

export interface ModelCodeElement {
  uri: string;
  identifier: string;
  prefLabel: Partial<TextLanguage> | null;
  inScheme: string[] | null;
  subject: string | null;
  notation: string | null;
  topConceptOf: string[] | null;
  definition: string[] | null;
  example: string[] | null;
  exclusionNote: Partial<TextLanguage> | null;
  previousElement: string[] | null;
  hiddenLabel: Partial<TextLanguage> | null;
  inclusionNote: Partial<TextLanguage> | null;
  note: Partial<TextLanguage> | null;
  nextElement: string[] | null;
  scopeNote: Partial<TextLanguage> | null;
  altLabel: Partial<TextLanguage> | null;
}

export interface InformationModelElement {
  uri: string;
  identifier: string;
  title: Partial<TextLanguage> | null;
  description: Partial<TextLanguage> | null;
  subject: string | null;
  belongsToModule: string | null;
  hasProperty: string[] | null;
  elementTypes: string[] | null;
  codeListReference: string | null;
  codes: Partial<ModelCodeElement>[] | null;
  typeDefinitionReference: string | null;
  length: number | null;
  maxLength: number | null;
  minInclusive: number | null;
  maxInclusive: number | null;
  pattern: number | null;
  totalDigits: number | null;
}

export interface InformationModelProperty {
  uri: string;
  identifier: string;
  title: Partial<TextLanguage> | null;
  description: Partial<TextLanguage> | null;
  subject: string | null;
  propertyTypes: string[] | null;
  minOccurs: number | null;
  maxOccurs: number | null;
  hasType: string[] | null;
  belongsToModule: string | null;
  isAbstractionOf: string | null;
  refersTo: string | null;
  hasDataType: string | null;
  hasSimpleType: string | null;
  hasObjectType: string | null;
  hasValueFrom: string | null;
  hasSome: string[] | null;
  hasMember: string | null;
  contains: string | null;
  hasSupplier: string | null;
  hasGeneralConcept: string | null;
}

interface InformationModelLicense {
  uri: string;
  code: string;
  prefLabel: Partial<TextLanguage>;
}

interface InformationModelLanguage {
  uri: string;
  code: string;
  prefLabel: Partial<TextLanguage>;
}

export interface Node {
  identifier: string;
  name: Partial<TextLanguage>;
  description: Partial<TextLanguage>;
  belongsToModule: Partial<TextLanguage>;
  roles: Partial<Property>[];
  attributes: Partial<Property>[];
  properties: Partial<Property>[];
  isSubclassOf?: Partial<Type>;
  modelElementType: string;
  isDescribedByUri: string;
  typeDefinitionReference: string;
  concept?: Partial<Concept>;
  codeListReference?: string;
}

export interface TextLanguage {
  nb: string;
  nn: string;
  en: string;
  no: string;
}

export interface Publisher {
  uri: string;
  id: string;
  name: string;
  orgPath: string;
  organizationId: string;
  prefLabel: Partial<TextLanguage>;
}

export interface Harvest {
  firstHarvested: string;
  lastHarvested: string;
}

export interface Theme {
  id: string;
}

export interface LosTheme {
  uri: string;
  name: Partial<TextLanguage>;
  losPaths?: string[];
}

export interface EuTheme {
  id: string;
  title: Partial<TextLanguage>;
  code?: string;
}

export interface Type {
  identifier: string;
  name: Partial<TextLanguage>;
}

export interface Property {
  identifier: string;
  name: Partial<TextLanguage>;
  description: Partial<TextLanguage>;
  belongsToModule: string;
  parameters: any;
  type: Partial<Type>;
  isDescribedByUri: string;
  concept?: Partial<Concept>;
}

export interface Concept {
  id: string;
  uri: string;
  identifier: string;
  prefLabel: Partial<TextLanguage>;
  altLabel?: Partial<TextLanguage>[];
  hiddenLabel?: Partial<TextLanguage>[];
  definition: ConceptDefinition;
  publisher: Partial<Publisher>;
  example: Partial<TextLanguage>;
  subject?: Partial<TextLanguage>;
  application?: Partial<TextLanguage>[];
  harvest?: Partial<Harvest>;
  contactPoint?: Partial<ConceptContactPoint>;
  validFromIncluding?: string;
  validToIncluding?: string;
  seeAlso?: string[];
}

export interface ConceptDefinition {
  text?: Partial<TextLanguage>;
  remark?: Partial<TextLanguage>;
  sources?: Array<{ text?: string; uri?: stirng }>;
  range?: { text?: Partial<TextLanguage>; uri?: stirng };
  sourceRelationship?: string;
}

export interface PublicServiceType {
  uri: string;
  prefLabel: Partial<TextLanguage>;
}

export interface PublicServiceLanguage {
  uri: string;
  code: string;
  prefLabel: Partial<TextLanguage>;
}

export interface PublicServiceEvent {
  uri: string;
  identifier: string;
  title: Partial<TextLanguage>;
  description: Partial<TextLanguage>;
  type: string;
}

export interface PublicServiceOutput {
  uri: string;
  identifier: string;
  name: Partial<TextLanguage>;
  description: Partial<TextLanguage>;
  type: Partial<Concept>[];
}

export interface PublicServiceCriterionRequirement {
  uri: string;
  identifier: string;
  name: Partial<TextLanguage>;
  type: Partial<Concept>[];
}

export interface PublicServiceRule {
  uri: string;
  identifier: string;
  name: Partial<TextLanguage>;
  description: Partial<TextLanguage>;
  language: PublicServiceLanguage[];
  implements: PublicService[];
}

export interface PublicServiceLegalResource {
  uri: string;
  description: Partial<TextLanguage>;
}

export interface PublicServiceInput {
  uri: string;
  identifier: string;
  name: Partial<TextLanguage>;
  description: Partial<TextLanguage>;
}

export interface PublicServiceParticipation {
  uri: string;
  identifier: string;
  description: Partial<TextLanguage>;
  role: PublicServiceType[];
}

export interface PublicService {
  type: string;
  id: string;
  uri: string;
  identifier: string;
  title: Partial<TextLanguage>;
  description: Partial<TextLanguage>;
  isGroupedBy?: PublicServiceEvent[];
  hasCompetentAuthority?: Partial<Publisher>[];
  harvest?: Partial<Harvest>;
  keyword?: Partial<TextLanguage>[];
  sector?: Partial<Concept>[];
  isClassifiedBy?: Partial<Concept>[];
  language?: PublicServiceLanguage[];
  requires?: PublicService[];
  produces?: PublicServiceOutput[];
  hasCriterion?: PublicServiceCriterionRequirement[];
  follows?: PublicServiceRule[];
  hasLegalResource?: PublicServiceLegalResource[];
  hasInput?: PublicServiceInput[];
  hasParticipation?: PublicServiceParticipation[];
}

export interface ESPage {
  currentPage: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

interface Provenance {
  code: string;
  prefLabel: Partial<TextLanguage>;
}

interface AccessRights {
  code: string;
}

interface ContactPoint {
  email: string;
  uri: string;
  organizationUnit: string;
  organizationName: string;
  hasURL: string;
  hasTelephone: string;
}

interface InformationModelContactPoint {
  uri: string;
  fullname: string;
  email: string;
  organizationName: string;
  organizationUnit: string;
  hasURL: string;
  hasTelephone: string;
}

interface ConceptContactPoint {
  email: string;
  telephone: string;
}

interface SpatialRestriction {
  code: string;
  prefLabel: Partial<TextLanguage>;
  uri: string;
}

interface TemporalRestriction {
  startDate: string;
  endDate: string;
}

interface ReferenceType {
  uri: string;
  code: string;
  prefLabel: Partial<TextLanguage>;
}

interface DatasetReference {
  referenceType: ReferenceType;
  source: { uri: string };
}

interface Annotation {
  hasBody: Partial<TextLanguage>;
}

interface AccrualPeriodicity {
  prefLabel: Partial<TextLanguage>;
}

interface Sample {
  description?: Partial<TextLanguage>;
  format: DataFormat[];
  accessURL: string[];
}

interface LegalBasis {
  uri: string;
  prefLabel: Partial<TextLanguage>;
}

export interface Dataset {
  id: string;
  type: string;
  uri: string;
  publisher: Partial<Publisher>;
  title: Partial<TextLanguage>;
  description: Partial<TextLanguage>;
  descriptionFormatted: Partial<TextLanguage>;
  objective: Partial<TextLanguage>;
  keyword: Partial<TextLanguage>[];
  theme?: EuTheme[];
  losTheme?: LosTheme[];
  issued: string;
  modified: string;
  distribution: Distribution[];
  accessRights?: AccessRights;
  accrualPeriodicity?: AccrualPeriodicity;
  provenance?: Provenance;
  harvest: Partial<Harvest>;
  contactPoint: Partial<ContactPoint>[];
  spatial?: SpatialRestriction[];
  temporal?: TemporalRestriction[];
  references?: DatasetReference[];
  subject?: Partial<Concept>[];
  hasRelevanceAnnotation?: Partial<Annotation>;
  hasCompletenessAnnotation?: Partial<Annotation>;
  hasAccuracyAnnotation?: Partial<Annotation>;
  hasAvailabilityAnnotation?: Partial<Annotation>;
  hasCurrentnessAnnotation?: Partial<Annotation>;
  sample?: Sample[];
  legalBasisForRestriction?: LegalBasis[];
  legalBasisForProcessing?: LegalBasis[];
  legalBasisForAccess?: LegalBasis[];
  conformsTo: ConformsTo[];
  informationModel?: Partial<ReferenceType>[];
  language?: Partial<ReferenceType>[];
  landingPage: string[];
  qualifiedAttributions: QualifiedAttribution[];
  assessment?: Assessment;
}

export interface DataService {
  id: string;
  uri: string;
  publisher: Partial<Publisher>;
  title: Partial<TextLanguage>;
  description?: Partial<TextLanguage>;
  descriptionFormatted?: Partial<TextLanguage>;
  nationalComponent: boolean;
  isOpenAccess: boolean;
  isOpenLicense: boolean;
  isFree: boolean;
  harvest?: Partial<Harvest>;
  mediaType?: Partial<MediaType>[];
  endpointURL?: string[];
  endpointDescription?: string[];
  conformsTo?: ConformsTo[];
  servesDataset?: string[];
  contactPoint?: Partial<ContactPoint>[];
}

interface License {
  uri: string;
  prefLabel?: Partial<TextLanguage>;
}

interface ConformsTo {
  uri: string;
  prefLabel?: Partial<TextLanguage>;
}

interface Page {
  uri: string;
}

interface EndpointDescription {
  uri: string;
}

export interface AccessService {
  description: Partial<TextLanguage>;
  endpointDescription: EndpointDescription[];
}

export interface Distribution {
  uri: string;
  type: string;
  title: Partial<TextLanguage>;
  description: Partial<TextLanguage>;
  format: string[];
  license: License[];
  openLicense: boolean;
  accessURL: string[];
  downloadURL: string[];
  conformsTo: ConformsTo[];
  page?: Page[];
  accessService?: AccessService[];
}

export interface MediaType {
  uri: string;
  code: string;
  name: string;
  prefLabel?: Partial<TextLanguage>;
}

export interface ReferenceData {
  los?: LosTheme[];
  themes?: EuTheme[];
  referencetypes?: ReferenceType[];
  mediatypes?: MediaType[];
  linguisticsystem?: ReferenceType[];
  apiservicetype?: ReferenceType[];
}

export interface Link {
  href: string;
}
export interface Links {
  next: Link;
  self: Link;
}

export interface NewsItemAttributes {
  title?: string;
  created?: string;
  changed?: string;
  field_ingress?: string;
  field_modules: any;
}

export interface News extends NewsItemAttributes {
  type: string;
  id: string;
  links: Partial<Links>;
}

export interface Organization {
  id: string;
  organization: {
    name: Partial<TextLanguage>;
    orgPath: string;
  };
  dataset_count: number;
  concept_count: number;
  dataservice_count: number;
  informationmodel_count: number;
}

interface QualifiedAttribution {
  agent: Partial<Publisher>;
  role: string;
}

export interface DataPoint {
  xAxis: string;
  yAxis: string;
}

interface Report {
  totalObjects: number;
  newLastWeek: number;
  organizationCount: number;
  catalogs: KeyWithCountObject[];
}

export interface DatasetsReport extends Report {
  formats: KeyWithCountObject[];
  nationalComponent: number;
  opendata: number;
  withSubject: number;
  accessRights: KeyWithCountObject[];
  themesAndTopicsCount: KeyWithCountObject[];
}

export interface ConceptsReport extends Report {
  mostInUse: KeyWithCountObject[];
}

export interface DataServiceReport extends Report {
  formats: KeyWithCountObject[];
}

export interface KeyWithCountObject {
  key: string;
  count: number;
}

export interface Rating {
  score: number;
  maxScore: number;
  satisfiedCriteria: number;
  totalCriteria: number;
  category: RatingCategory;
  dimensionsRating: Record<DimensionType, Pick<Rating, 'score' | 'maxScore'>>;
}

export interface Catalog {
  id: string;
  uri?: string;
}

export interface Entity {
  uri: string;
  type: EntityType;
  catalog: Catalog;
}

export interface Indicator {
  type: IndicatorType;
  weight: number;
  conforms: boolean;
}

export interface Dimension {
  type: DimensionType;
  rating: Rating;
  indicators: Indicator[];
}

export interface Assessment {
  id: string;
  entity: Entity;
  rating: Rating;
  dimensions: Dimension[];
  updated: string;
}

interface EnhetsregisteretAdresse {
  land: string;
  landkode: string;
  postnummer: string;
  poststed: string;
  adresse: string[];
  kommune: string;
  kommunenummer: string;
}

export interface EnhetsregisteretOrganization {
  organisasjonsnummer: string;
  navn: string;
  organisasjonsform: {
    kode: string;
    beskrivelse: string;
  };
  hjemmeside: string;
  postadresse: EnhetsregisteretAdresse;
  naeringskode1: {
    beskrivelse: string;
    kode: string;
  };
  forretningsadresse: EnhetsregisteretAdresse;
  institusjonellSektorkode: {
    kode: string;
    beskrivelse: string;
  };
}

export interface DropdownMenuItem {
  label: string;
}

export interface DropdownButtonItem extends DropdownMenuItem {
  onClick: () => void;
}

export interface DropdownLinkItem extends DropdownMenuItem {
  url: string;
}
