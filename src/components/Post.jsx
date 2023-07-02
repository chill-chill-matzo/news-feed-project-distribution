import React from 'react';
import { styled } from 'styled-components';

function Post({ ...props }) {
  return (
    <Div {...props}>
      <Img src={props.image} alt={props.title}></Img>
      <p>{props.title}</p>
    </Div>
  );
}

export default Post;

const Div = styled.div`
  display: block;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid var(--color_gray2);
  border-radius: 12px;
  &:hover {
    border-color: var(--color_gray1);
  }

  p {
    width: 200px;
    margin: 5px auto 5px;
    text-align: center;
    font-weight: 500;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const Img = styled.img`
  justify-content: center;
  align-items: center;
  width: 230px;
  height: 230px;
  object-fit: cover;
  &:hover {
    opacity: 0.8;
    transition: all 0.5s ease;
  }
`;
