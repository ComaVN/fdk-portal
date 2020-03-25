import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const TabLink = styled(Link)`
  align-items: center;
  background: none;
  border: 0;
  box-sizing: border-box;
  display: flex;
  flex-grow: 1;
  padding: 1em 1.5em;
  text-decoration: none;

  @media (min-width: 768px) {
    padding: 0.5em 1em;
  }
`;

const Tab = styled.li<{ active?: boolean }>`
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-color: none;
    
    justify-content: center;
    list-style-type: none;
    
    ${({ active }) =>
      active &&
      css`
        background-color: ${({ theme }) => theme.colors.neutralLightest};
      `}
    }
    
    ${TabLink} {
        color: #FFF;
        
        ${({ active }) =>
          active &&
          css`
            color: ${({ theme }) => theme.colors.neutralDarker};
          `}
    }
`;

export default {
  Tab,
  TabLink
};
