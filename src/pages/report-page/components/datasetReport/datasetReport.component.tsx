/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable eslint-comments/no-duplicate-disable */
/* eslint-disable react/no-unstable-nested-components */
import React, { FC, memo, useEffect } from 'react';
import { compose } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { PieChart } from 'react-minimal-pie-chart';
import ThemeProvider from '@fellesdatakatalog/theme';

import BoxRegular, {
  Variant as BoxFlowVariant
} from '../../../../components/box-regular/box-regular.component';
import {
  StatisticsRegular,
  IllustrationWithCount,
  SC,
  FontVariant,
  FlowVariant
} from '../../../../components/statistics-regular/statistics-regular';
import { getConfig } from '../../../../config';
import { themeFDK, themeNAP } from '../../../../app/theme';
import { Entity, Filter, MediaTypeOrExtentType } from '../../../../types/enums';
import {
  CatalogWithCountObject,
  DatasetsReport,
  KeyWithCountObject
} from '../../../../types';

import AccessUnknownIcon from '../../../../images/icon-access-unknown-md-v2.svg';
import { List } from '../../../../components/list/list';
import { PATHNAME_DATASETS } from '../../../../constants/constants';
import { patchSearchQuery } from '../../../../lib/addOrReplaceUrlParam';
import localization from '../../../../lib/localization';
import { getTranslateText as translate } from '../../../../lib/translateText';
import { Line } from '../../../../components/charts';
import withReferenceData, {
  Props as ReferenceDataProps
} from '../../../../components/with-reference-data';
import { sortKeyWithCount } from '../../sort-helper';
import { translatePrefixedFormat } from '../../../../utils/common';
import {
  ContainerPaneContent as ContainerPaneContentSC,
  ContainerBoxRegular as ContainerBoxRegularSC,
  NapBookBookmarkStrokeIcon as NapBookBookmarkStrokeIconSC,
  NapLockLockedStrokeIcon as NapLockLockedStrokeIconSC,
  NapLockOpenStrokeIcon as NapLockOpenStrokeIconSC,
  NapLockSemiOpenStrokeIcon as NapLockSemiOpenStrokeIconSC,
  NapPlusStrokeIcon as NapPlusStrokeIconSC,
  NapSquareThreeStrokeIcon as NapSquareThreeStrokeIconSC,
  NapStarStrokeIcon as NapStarStrokeIconSC
} from '../../styled';

interface ExternalProps {
  datasetsReport: Partial<DatasetsReport>;
  datasetsTimeSeries: any;
}

interface Props
  extends ExternalProps,
    RouteComponentProps,
    ReferenceDataProps {}

// eslint-disable-next-line react/function-component-definition
const DatasetReport: FC<Props> = ({
  referenceData: { los },
  referenceDataActions: { getReferenceDataRequested: getReferenceData },
  location: { search: searchParams } = {},
  datasetsReport: {
    totalObjects = 0,
    newLastWeek = 0,
    organizationCount = 0,
    nationalComponent = 0,
    withSubject = 0,
    opendata = 0,
    accessRights = [],
    formats = [],
    themesAndTopicsCount = [],
    catalogs = []
  } = {},
  datasetsTimeSeries: { timeSeriesData = [] } = {}
}) => {
  useEffect(() => {
    if (!los) {
      getReferenceData('los');
    }
  }, []);

  timeSeriesData.push([Date.now(), totalObjects]);

  const accessRightsPublic =
    accessRights?.find((item: KeyWithCountObject) => item.key === 'PUBLIC')
      ?.count || 0;
  const accessRightsRestriced =
    accessRights?.find((item: KeyWithCountObject) => item.key === 'RESTRICTED')
      ?.count || 0;
  const accessRightsNonPublic =
    accessRights?.find((item: KeyWithCountObject) => item.key === 'NON_PUBLIC')
      ?.count || 0;

  const accessRightsUnknown =
    totalObjects -
    accessRightsPublic -
    accessRightsRestriced -
    accessRightsNonPublic;

  const topMostUsedFormats: KeyWithCountObject[] = sortKeyWithCount(formats)
    .filter(
      ({ key }: KeyWithCountObject) =>
        key !== 'MISSING' && key !== MediaTypeOrExtentType.UNKNOWN
    )
    .slice(0, 10);

  const topMostUsedThemes: KeyWithCountObject[] = sortKeyWithCount(
    themesAndTopicsCount.filter(
      ({ key }: KeyWithCountObject) => key !== 'MISSING'
    )
  ).slice(0, 10);

  const theme = getConfig().themeNap ? themeNAP : themeFDK;

  return (
    <ThemeProvider theme={theme}>
      <main id='content'>
        <ContainerPaneContentSC>
          <ContainerBoxRegularSC>
            <BoxRegular>
              <StatisticsRegular to={`${PATHNAME_DATASETS}${searchParams}`}>
                <IllustrationWithCount
                  icon={<NapSquareThreeStrokeIconSC />}
                  count={totalObjects}
                />
                <SC.StatisticsRegular.Label>
                  {localization.report.datasetsDescription}
                </SC.StatisticsRegular.Label>
              </StatisticsRegular>
            </BoxRegular>
          </ContainerBoxRegularSC>
          <ContainerBoxRegularSC>
            <BoxRegular>
              <StatisticsRegular
                to={`${PATHNAME_DATASETS}${patchSearchQuery(
                  Filter.LASTXDAYS,
                  '7'
                )}`}
              >
                <IllustrationWithCount
                  icon={<NapPlusStrokeIconSC />}
                  count={newLastWeek}
                />
                <SC.StatisticsRegular.Label>
                  {localization.report.newPastWeek}
                </SC.StatisticsRegular.Label>
              </StatisticsRegular>
            </BoxRegular>
          </ContainerBoxRegularSC>
        </ContainerPaneContentSC>

        <div className='row'>
          <div className='col-12'>
            <BoxRegular>
              <StatisticsRegular to='' as='div'>
                <IllustrationWithCount
                  icon={<NapSquareThreeStrokeIconSC />}
                  count={organizationCount}
                />
                <SC.StatisticsRegular.Label variant={FontVariant.LARGE}>
                  {localization.formatString(
                    localization.report.countCatalogsLabel,
                    {
                      catalog:
                        translate(
                          getConfig().themeNap
                            ? localization.nap
                            : localization.nationalDataCatalog
                        ) ?? ''
                    }
                  )}
                </SC.StatisticsRegular.Label>
              </StatisticsRegular>
            </BoxRegular>
          </div>
        </div>

        {timeSeriesData?.length > 0 && timeSeriesData?.length > 0 && (
          <div className='row'>
            <div className='col-12'>
              <BoxRegular
                header={localization.report.growth}
                subHeader={localization.report.growthFromFirstPublish}
              >
                <Line
                  name={localization.datasetLabel}
                  data={timeSeriesData}
                  lineColor={theme.extendedColors[Entity.DATASET].dark}
                />
              </BoxRegular>
            </div>
          </div>
        )}

        {Number(totalObjects) > 0 && (
          <div>
            <div className='row'>
              <div className='col-12'>
                <BoxRegular header={localization.accessLevel}>
                  <StatisticsRegular
                    to={`${PATHNAME_DATASETS}${patchSearchQuery(
                      Filter.OPENDATA,
                      'true'
                    )}`}
                  >
                    <IllustrationWithCount
                      variant={FlowVariant.COLUMN}
                      chart={
                        <PieChart
                          data={[
                            {
                              value: Number(opendata),
                              color: theme.extendedColors[Entity.DATASET].dark
                            },
                            {
                              value: Number(totalObjects) - Number(opendata),
                              color: theme.extendedColors[Entity.DATASET].light
                            }
                          ]}
                          startAngle={-90}
                          lineWidth={40}
                          animate
                          label={({ dataIndex }) => (
                            <NapLockOpenStrokeIconSC
                              key={dataIndex}
                              x={30}
                              y={30}
                              viewBox='0 0 40 40'
                            />
                          )}
                        />
                      }
                      count={opendata}
                    />
                    <SC.StatisticsRegular.Label>
                      {localization.report.opendata}
                    </SC.StatisticsRegular.Label>
                  </StatisticsRegular>

                  <StatisticsRegular
                    to={`${PATHNAME_DATASETS}${patchSearchQuery(
                      Filter.ACCESSRIGHTS,
                      'PUBLIC'
                    )}`}
                  >
                    <IllustrationWithCount
                      variant={FlowVariant.COLUMN}
                      chart={
                        <PieChart
                          data={[
                            {
                              value: Number(accessRightsPublic),
                              color: theme.extendedColors[Entity.DATASET].dark
                            },
                            {
                              value:
                                Number(totalObjects) -
                                Number(accessRightsPublic),
                              color: theme.extendedColors[Entity.DATASET].light
                            }
                          ]}
                          startAngle={-90}
                          lineWidth={40}
                          animate
                          label={({ dataIndex }) => (
                            <NapLockOpenStrokeIconSC
                              key={dataIndex}
                              x={30}
                              y={30}
                              viewBox='0 0 40 40'
                            />
                          )}
                        />
                      }
                      count={accessRightsPublic}
                    />
                    <SC.StatisticsRegular.Label>
                      {localization.report.public}
                    </SC.StatisticsRegular.Label>
                  </StatisticsRegular>

                  <StatisticsRegular
                    to={`${PATHNAME_DATASETS}${patchSearchQuery(
                      Filter.ACCESSRIGHTS,
                      'RESTRICTED'
                    )}`}
                  >
                    <IllustrationWithCount
                      variant={FlowVariant.COLUMN}
                      chart={
                        <PieChart
                          data={[
                            {
                              value: Number(accessRightsRestriced),
                              color: theme.extendedColors[Entity.DATASET].dark
                            },
                            {
                              value:
                                Number(totalObjects) -
                                Number(accessRightsRestriced),
                              color: theme.extendedColors[Entity.DATASET].light
                            }
                          ]}
                          startAngle={-90}
                          lineWidth={40}
                          animate
                          label={({ dataIndex }) => (
                            <NapLockSemiOpenStrokeIconSC
                              key={dataIndex}
                              x={30}
                              y={30}
                              viewBox='0 0 40 40'
                            />
                          )}
                        />
                      }
                      count={accessRightsRestriced}
                    />
                    <SC.StatisticsRegular.Label>
                      {localization.report.restricted}
                    </SC.StatisticsRegular.Label>
                  </StatisticsRegular>

                  <StatisticsRegular
                    to={`${PATHNAME_DATASETS}${patchSearchQuery(
                      Filter.ACCESSRIGHTS,
                      'NON_PUBLIC'
                    )}`}
                  >
                    <IllustrationWithCount
                      variant={FlowVariant.COLUMN}
                      chart={
                        <PieChart
                          data={[
                            {
                              value: Number(accessRightsNonPublic),
                              color: theme.extendedColors[Entity.DATASET].dark
                            },
                            {
                              value:
                                Number(totalObjects) -
                                Number(accessRightsNonPublic),
                              color: theme.extendedColors[Entity.DATASET].light
                            }
                          ]}
                          startAngle={-90}
                          lineWidth={40}
                          animate
                          label={({ dataIndex }) => (
                            <NapLockLockedStrokeIconSC
                              key={dataIndex}
                              x={30}
                              y={30}
                              viewBox='0 0 40 40'
                            />
                          )}
                        />
                      }
                      count={accessRightsNonPublic}
                    />
                    <SC.StatisticsRegular.Label>
                      {localization.report.nonPublic}
                    </SC.StatisticsRegular.Label>
                  </StatisticsRegular>

                  <StatisticsRegular
                    to={`${PATHNAME_DATASETS}${patchSearchQuery(
                      Filter.ACCESSRIGHTS,
                      'Ukjent'
                    )}`}
                  >
                    <IllustrationWithCount
                      variant={FlowVariant.COLUMN}
                      chart={
                        <PieChart
                          data={[
                            {
                              value: accessRightsUnknown,
                              color: theme.extendedColors[Entity.DATASET].dark
                            },
                            {
                              value: Number(totalObjects) - accessRightsUnknown,
                              color: theme.extendedColors[Entity.DATASET].light
                            }
                          ]}
                          startAngle={-90}
                          lineWidth={40}
                          animate
                          label={({ dataIndex }) => (
                            <AccessUnknownIcon
                              key={dataIndex}
                              x={35}
                              y={35}
                              viewBox='0 0 100 100'
                            />
                          )}
                        />
                      }
                      count={accessRightsUnknown}
                    />
                    <SC.StatisticsRegular.Label>
                      {localization.report.unknown}
                    </SC.StatisticsRegular.Label>
                  </StatisticsRegular>
                </BoxRegular>
              </div>
            </div>

            <div className='row'>
              <div className='col-12'>
                <BoxRegular>
                  <StatisticsRegular
                    to={`${PATHNAME_DATASETS}${patchSearchQuery(
                      Filter.PROVENANCE,
                      'NASJONAL'
                    )}`}
                  >
                    <IllustrationWithCount
                      icon={<NapStarStrokeIconSC />}
                      count={nationalComponent}
                    />
                    <SC.StatisticsRegular.Label variant={FontVariant.LARGE}>
                      {localization.report.authoritative}
                    </SC.StatisticsRegular.Label>
                  </StatisticsRegular>
                </BoxRegular>
              </div>
            </div>

            <div className='row'>
              <div className='col-12'>
                <BoxRegular>
                  <StatisticsRegular
                    to={`${PATHNAME_DATASETS}${patchSearchQuery(
                      Filter.SUBJECTEXISTS,
                      'true'
                    )}`}
                  >
                    <IllustrationWithCount
                      variant={FlowVariant.COLUMN}
                      chart={
                        <PieChart
                          data={[
                            {
                              value: Number(withSubject),
                              color: theme.extendedColors[Entity.DATASET].dark
                            },
                            {
                              value: Number(totalObjects) - Number(withSubject),
                              color: theme.extendedColors[Entity.DATASET].light
                            }
                          ]}
                          startAngle={0}
                          lineWidth={40}
                          animate
                          label={({ dataIndex }) => (
                            <NapBookBookmarkStrokeIconSC
                              key={dataIndex}
                              x={30}
                              y={30}
                              viewBox='0 0 40 40'
                            />
                          )}
                        />
                      }
                      count={withSubject}
                    />
                    <SC.StatisticsRegular.Label variant={FontVariant.LARGE}>
                      {localization.report.useConcepts}
                    </SC.StatisticsRegular.Label>
                  </StatisticsRegular>
                </BoxRegular>
              </div>
            </div>

            {Array.isArray(topMostUsedFormats) &&
              topMostUsedFormats?.length > 0 && (
                <div className='row'>
                  <div className='col-12'>
                    <BoxRegular header={localization.report.usedFormats}>
                      <List
                        headerText1={localization.report.format}
                        headerText2={localization.report.countDataset}
                        listItems={topMostUsedFormats?.map(
                          ({ key, count }: KeyWithCountObject, index: any) => ({
                            id: index,
                            path: `${PATHNAME_DATASETS}?${
                              Filter.FORMAT
                            }=${encodeURIComponent(key)}`,
                            text1: translatePrefixedFormat(key),
                            text2: `${count}`
                          })
                        )}
                      />
                    </BoxRegular>
                  </div>
                </div>
              )}

            {Array.isArray(topMostUsedThemes) &&
              topMostUsedThemes?.length > 0 && (
                <div className='row'>
                  <div className='col-12'>
                    <BoxRegular
                      variant={BoxFlowVariant.COLUMN}
                      header={localization.report.usedThemes}
                    >
                      <List
                        headerText1={localization.report.themeAndTopic}
                        headerText2={localization.report.countDataset}
                        listItems={topMostUsedThemes?.map(
                          ({ key, count }: KeyWithCountObject, index: any) => ({
                            id: index,
                            path: `${PATHNAME_DATASETS}?${
                              Filter.LOS
                            }=${encodeURIComponent(key)}`,
                            text1: translate(
                              los?.losNodes?.find((losTheme: any) =>
                                losTheme.losPaths.includes(key)
                              )?.name
                            ),
                            text2: `${count}`
                          })
                        )}
                      />
                    </BoxRegular>
                  </div>
                </div>
              )}

            <div className='row'>
              <div className='col-12'>
                <BoxRegular header={localization.report.datasetCatalogs}>
                  {Array.isArray(catalogs) && catalogs?.length > 0 && (
                    <List
                      headerText1={localization.report.catalogName}
                      headerText2={localization.report.countDataset}
                      listItems={catalogs.map(
                        (
                          { title, count }: CatalogWithCountObject,
                          index: any
                        ) => ({
                          id: index,
                          path: `${PATHNAME_DATASETS}?${
                            Filter.CATALOGNAME
                          }=${encodeURIComponent(translate(title) ?? '')}`,
                          text1: translate(title),
                          text2: `${count}`
                        })
                      )}
                      showMoreLabel={localization.report.showAllCatalogs}
                      showLessLabel={localization.report.showLessCatalogs}
                    />
                  )}
                </BoxRegular>
              </div>
            </div>
          </div>
        )}
      </main>
    </ThemeProvider>
  );
};

export default compose<FC<ExternalProps>>(
  memo,
  withRouter,
  withReferenceData
)(DatasetReport);
