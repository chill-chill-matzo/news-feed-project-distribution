import React from 'react';
import '../reset.css';
import { IconCherry } from './IconCherry';
import { styled } from 'styled-components';

function Layout({ children }) {
  return (
    <StLayout>
      <IconCherry />

      <StContainer>
        <StBody>{children}</StBody>
      </StContainer>

      <StFooter>copyright @77matzo</StFooter>
    </StLayout>
  );
}

export default Layout;

const StLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: 1200px;
  min-width: 800px;

  margin: 0 auto;

  background-color: var(--color_yellow);
`;

const StContainer = styled.div`
  width: 90%;
  height: 90%;
  background-color: var(--color_white1);
`;

const StBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StFooter = styled.footer`
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 12px;
`;
