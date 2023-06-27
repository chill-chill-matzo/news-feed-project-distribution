import React from 'react';
import '../reset.css';
import '../color.css';
import { IconCherry } from './IconCherry';

import { styled } from 'styled-components';

function Layout({ children }) {
  return (
    <StLayout>
      <IconCherry />

      <StContainer>
        <StAside>
          <StNav>로그인</StNav>
          <br />
          <nav>회원가입</nav>
        </StAside>
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
  height: 1200px;

  margin: 0 auto;

  background-color: var(--color_yellow);
`;

const StContainer = styled.div`
  width: 90%;
  height: 90%;
  background-color: var(--color_white1);
`;

const StAside = styled.aside`
  display: flex;
  align-items: center;
  justify-content: right;

  height: 50px;

  padding: 10px;
  padding-right: 30px;

  background-color: var(--color_white1);

  color: var(--color_gray1);
  font-weight: 700;
`;

const StNav = styled.nav`
  margin-right: 20px;
`;

const StBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const StFooter = styled.div`
  margin-top: 20px;
  font-size: 12px;
`;
