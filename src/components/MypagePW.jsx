import React from 'react';
import { styled } from 'styled-components';

const MyPagePW = () => {
  return (
    <>
      <Container>비밀번호 변경</Container>
    </>
  );
};

export default MyPagePW;
const Container = styled.div`
  border-top: 1px solid var(--color_gray2);
  height: 500px;
  padding: 50px;
`;
