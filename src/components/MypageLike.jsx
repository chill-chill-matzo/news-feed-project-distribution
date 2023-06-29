import React from 'react';
import { styled } from 'styled-components';

const MyPageLike = () => {
  return (
    <>
      <Container>좋아요</Container>
    </>
  );
};

export default MyPageLike;
const Container = styled.div`
  border-top: 1px solid var(--color_gray2);
  height: 500px;
  padding: 50px;
`;
