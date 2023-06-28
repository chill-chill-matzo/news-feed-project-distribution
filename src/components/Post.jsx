import React from 'react';
import { styled } from 'styled-components';

function Post({ title, image }) {
  return (
    <StDiv>
      <Img src={image} alt={title}></Img>
      <p>&nbsp;{title}&nbsp;</p>
    </StDiv>
  );
}

export default Post;

const StDiv = styled.div`
  display: flex;
  flex-direction: column;

  p {
    margin-top: 10px;
    text-align: center;
    font-weight: 500;
  }
`;

const Img = styled.img`
  justify-content: center;
  align-items: center;
  width: 230px;
  height: 230px;
`;
