import React, { Children, FC, isValidElement } from 'react';

import SC from './styled';
import type { Organization, TextLanguage } from '../../../../types';
import { SearchTypes } from '../../../../types/enums';
import { SearchHitHead } from '../search-hit-head/search-hit-head.component';
import { getTranslateText } from '../../../../lib/translateText';
import localization from '../../../../lib/localization';
import SearchHitAccessRights from '../search-hit-access-rigths/search-hit-access-rights.component';
import SearchHitOpenData from '../search-hit-open-data/search-hit-open-data.component';
import SearchHitThemes from '../search-hit-themes/searh-hit-themes.component';
import SearchHitFormats from '../search-hit-formats/search-hit-formats';
import SearchHitData from '../search-hit-data/search-hit-data.component';
import SearchHitEvents from '../search-hit-events';
import TruncatedText from '../../../truncated-text';
import Markdown from '../../../markdown';
import LanguageIndicator from '../../../language-indicator';

interface Props {
  id?: string;
  type: SearchTypes;
  title?: Partial<TextLanguage>;
  subtitle: React.ReactNode;
  description?: Partial<TextLanguage> | null;
  publisher?: Partial<Organization>;
  isAuthoritative?: boolean;
}

function getPublisherLabel(type: SearchTypes) {
  switch (type) {
    case SearchTypes.dataset:
      return localization.search_hit.owned;
    case SearchTypes.dataservice:
      return `${localization.provider}:`;
    case SearchTypes.concept:
      return `${localization.responsible}:`;
    case SearchTypes.informationModel:
      return `${localization.responsible}:`;
    case SearchTypes.publicService:
      return `${localization.provider}:`;
    case SearchTypes.event:
      return `${localization.provider}:`;
    default:
      return '';
  }
}

export const SearchHit: FC<Props> = ({
  id,
  type,
  title,
  subtitle,
  description,
  publisher,
  isAuthoritative = false,
  children
}) => {
  const {
    title: publisherTitle,
    name,
    identifier: pubIdentifier,
    id: pubId
  } = publisher || {};

  const pubisherId = pubId || pubIdentifier;

  const renderSearchHitOpenData = () =>
    Children.map(children, child =>
      isValidElement(child) && child.type === SearchHitOpenData ? (
        <SC.OpenData>{child}</SC.OpenData>
      ) : null
    )?.shift();

  const renderSearchHitAccessRights = () =>
    Children.map(children, child =>
      isValidElement(child) && child.type === SearchHitAccessRights ? (
        <SC.AccessRight>{child}</SC.AccessRight>
      ) : null
    )?.shift();

  const renderSearchHitThemes = () =>
    Children.map(children, child =>
      isValidElement(child) && child.type === SearchHitThemes ? (
        <SC.Theme>{child}</SC.Theme>
      ) : null
    )?.shift();

  const renderSearchHitFormats = () =>
    Children.map(children, child =>
      isValidElement(child) && child.type === SearchHitFormats ? (
        <SC.Format>{child}</SC.Format>
      ) : null
    )?.shift();

  const renderSearchHitEvents = () =>
    Children.map(children, child =>
      isValidElement(child) && child.type === SearchHitEvents ? (
        <SC.Event>{child}</SC.Event>
      ) : null
    )?.shift();

  const renderSearchHitData = () =>
    Children.map(children, child =>
      isValidElement(child) && child.type === SearchHitData ? (
        <SC.Data>{child}</SC.Data>
      ) : null
    )?.shift();

  const translatedDescription = getTranslateText(description);

  return (
    <SC.SearchHit>
      <SearchHitHead
        id={id}
        type={type}
        title={title}
        subtitle={subtitle}
        isAuthoritative={isAuthoritative}
      />
      <SC.SearchHitMetaData>
        {pubisherId && (publisherTitle || name) && (
          <SC.PublisherLink href={`/organizations/${pubisherId}`}>
            <span>{getPublisherLabel(type)}&nbsp;</span>
            <span>{getTranslateText(publisherTitle) || name}</span>
          </SC.PublisherLink>
        )}
        {title && <LanguageIndicator textLanguage={title} />}
      </SC.SearchHitMetaData>
      {renderSearchHitOpenData()}
      {renderSearchHitAccessRights()}
      {translatedDescription && (
        <SC.Description>
          <TruncatedText visibleLines={4} lineHeight={20}>
            <Markdown>{translatedDescription}</Markdown>
          </TruncatedText>
        </SC.Description>
      )}
      {renderSearchHitData()}
      {renderSearchHitThemes()}
      {renderSearchHitEvents()}
      {renderSearchHitFormats()}
    </SC.SearchHit>
  );
};
