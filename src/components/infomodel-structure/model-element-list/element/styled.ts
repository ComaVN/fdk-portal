import styled from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';
import Scroll from 'react-scroll';

import ExpansionPanelBase, { SC } from '../../../expansion-panel';

const ElementTitle = styled.span`
  display: flex;
  align-items: center;
  align-self: start;
`;

const ExpansionPanel = styled(ExpansionPanelBase)`
  border-radius: none;
  border-bottom: 1px solid ${theme.colour(Colour.VIOLET, 'V30')};
  background: transparent;

  ${SC.ExpansionPanel.Head} {
    padding: ${theme.spacing('S8')} 0;
  }

  ${SC.ExpansionPanel.HeadContent} {
    display: flex;
    flex: 0 0 80%;
    align-items: center;

    & > svg {
      align-self: start;
      width: 16px;
      margin-top: ${theme.spacing('S4')};
      margin-right: ${theme.spacing('S8')};
    }

    & > * {
      font-size: ${theme.fontSize('FS16')};
      font-weight: ${theme.fontWeight('FW400')};
      color: ${theme.colour(Colour.NEUTRAL, 'N60')};
    }

    & > ${ElementTitle} {
      flex-basis: 60%;
    }

    & > span:nth-of-type(2) {
      display: flex;
      flex-direction: column;
      flex-grow: 1;

      & > a:nth-of-type(n + 2) {
        margin-top: ${theme.spacing('S8')};
      }
    }
  }
`;

const ScrollLink = styled(Scroll.Link)`
  color: ${theme.colour(Colour.VIOLET, 'V50')} !important;
`;

const MultiplicityRange = styled.span`
  align-self: flex-start;
`;

const ElementTypesContainer = styled.span<{ length: number }>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  & > a:nth-of-type(n + 2) {
    margin-top: ${theme.spacing('S8')};
  }

  & > a:first-of-type {
    margin-top: ${({ length }) =>
      length > 1 ? theme.spacing('S24') : theme.spacing('S4')};
  }
`;

export default {
  ElementTitle,
  ExpansionPanel,
  ScrollLink,
  MultiplicityRange,
  ElementTypesContainer
};
