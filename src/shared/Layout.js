import React from 'react';
import '../reset.css';
import { IconCherry } from './IconCherry';
import { styled } from 'styled-components';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

function Layout({ children }) {
  const navigate = useNavigate();
  return (
    <StyledLayout>
      <IconCherry
        onClick={() => {
          navigate('/');
        }}
      />

      <Container>
        <Header />
        <Body>{children}</Body>
      </Container>

      <Footer>copyright @77matzo</Footer>
    </StyledLayout>
  );
}

export default Layout;

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: 1200px;

  margin: 0 auto;

  background-color: var(--color_yellow);
`;

const Container = styled.div`
  width: 90%;
  height: fit-content;

  background-color: var(--color_white1);
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Footer = styled.footer`
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 12px;
`;
