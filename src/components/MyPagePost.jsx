import React from 'react';
import { styled } from 'styled-components';

const MyPagePost = () => {
  return (
    <>
      <Container>내 글 목록</Container>
    </>
  );
};

export default MyPagePost;
const Container = styled.div`
  border-top: 1px solid var(--color_gray2);
  height: 500px;
  padding: 50px;
`;
