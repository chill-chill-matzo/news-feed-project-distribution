import React from 'react';
import { styled } from 'styled-components';

function Post({ ...props }) {
  return (
    <Div {...props}>
      <Img src={props.image} alt={props.title}></Img>
      <p>&nbsp;{props.title}&nbsp;</p>
    </Div>
  );
}

export default Post;

const Div = styled.div`
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
