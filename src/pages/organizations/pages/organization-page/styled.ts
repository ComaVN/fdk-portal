import styled, { css } from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';

import { getConfig } from '../../../../config';

import MetadataQualityExcellentSVG from '../../../../images/icon-quality-excellent-md.svg';
import MetadataQualityGoodSVG from '../../../../images/icon-quality-good-md.svg';
import MetadataQualitySufficientSVG from '../../../../images/icon-quality-sufficient-md.svg';
import MetadataQualityPoorSVG from '../../../../images/icon-quality-poor-md.svg';

const isTransportportal = getConfig().themeNap;

const OrganizationPage = styled.article`
  flex: 1 0 auto;
  overflow: hidden;
`;

const BetaRibbon = styled.span`
  position: absolute;
  top: 8px;
  right: -33px;
  transform: rotate(45deg);
  padding: ${theme.spacing('S6')} ${theme.spacing('S40')};
  font-weight: ${theme.fontWeight('FW700')};
  color: ${theme.colour(Colour.BLUE, 'B50')};
  background: ${theme.colour(Colour.YELLOW, 'Y30')};
`;

const Title = styled.h1`
  font-size: ${theme.fontSize('FS48')};
  font-weight: ${theme.fontWeight('FW700')};
`;

const Section = styled.section`
  margin-top: ${theme.spacing('S40')};
`;

const Box = styled.div<{ colspan?: number }>`
  flex: 1 0 auto;
  padding: ${theme.spacing('S24')};
  border-radius: 4px;
  background: ${theme.colour(Colour.NEUTRAL, 'N0')};

  ${({ colspan }) => {
    switch (colspan) {
      case 2:
        return css`
          min-width: calc(100% / 2 - ${theme.spacing('S8')});
        `;
      default:
        return css`
          min-width: calc(100% / 4 - 3 * ${theme.spacing('S8')});
        `;
    }
  }}
`;

const OrganizationInformation = styled.div`
  padding: ${theme.spacing('S24')};
  border-radius: 4px;
  background: ${theme.colour(Colour.NEUTRAL, 'N0')};
`;

const DatasetCataloguesStatistics = styled.div`
  & > h2 {
    display: flex;
    align-items: center;
    padding: ${theme.spacing('S12')};
    border-radius: 4px;
    font-size: ${theme.fontSize('FS24')};
    font-weight: ${theme.fontWeight('FW700')};

    & > svg {
      height: 40px;
      width: 40px;
      min-height: 40px;
      min-width: 40px;
      margin-right: ${theme.spacing('S12')};
    }

    ${() =>
      isTransportportal
        ? css`
            background: ${theme.colour(Colour.GREEN, 'G20')};
            color: ${theme.colour(Colour.GREEN, 'G50')};

            & > svg > path {
              fill: ${theme.colour(Colour.GREEN, 'G50')};
            }
          `
        : css`
            background: ${theme.colour(Colour.BLUE, 'B30')};
            color: ${theme.colour(Colour.BLUE, 'B50')};
          `}
  }

  & > div {
    display: flex;
    margin-top: ${theme.spacing('S8')};

    & > ${Box}:nth-of-type(n+2) {
      margin-left: ${theme.spacing('S8')};
    }
  }
`;

const PoorQualityIcon = styled(MetadataQualityPoorSVG)`
  & > path {
    fill: ${theme.colour(Colour.BLUE, 'B50')};
  }
`;

const SufficientQualityIcon = styled(MetadataQualitySufficientSVG)`
  & > path {
    fill: ${theme.colour(Colour.BLUE, 'B50')};
  }

  & > circle:first-of-type {
    fill: ${theme.colour(Colour.BLUE, 'B30')};
  }
`;

const GoodQualityIcon = styled(MetadataQualityGoodSVG)`
  & > path {
    fill: ${theme.colour(Colour.BLUE, 'B50', 85)};
  }
`;

const ExcellentQualityIcon = styled(MetadataQualityExcellentSVG)`
  & > path {
    fill: ${theme.colour(Colour.BLUE, 'B50')};
  }
`;

const FrequentlyAskedQuestions = styled.div`
  display: flex;
`;

const Question = styled.div`
  flex: 1 0 auto;
  width: calc(100% / 2 - ${theme.spacing('S8')});

  &:nth-of-type(n + 2) {
    margin-left: ${theme.spacing('S8')};
  }

  & > h3 {
    font-size: ${theme.fontSize('FS24')};
    font-weight: ${theme.fontWeight('FW700')};
  }

  & > p {
    margin-top: ${theme.spacing('S8')};
  }

  & > a {
    margin-top: ${theme.spacing('S8')};
  }
`;

export default {
  OrganizationPage,
  BetaRibbon,
  Title,
  Section,
  Box,
  OrganizationInformation,
  DatasetCataloguesStatistics,
  PoorQualityIcon,
  SufficientQualityIcon,
  GoodQualityIcon,
  ExcellentQualityIcon,
  FrequentlyAskedQuestions,
  Question
};
