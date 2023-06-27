import React from 'react';
import { styled } from 'styled-components';

function MostLikedPost() {
  return <MostLikedImage />;
}

export default MostLikedPost;

const MostLikedImage = styled.div`
  background-image: url('https://i.pinimg.com/564x/68/4c/ed/684ced199400f4316b10a9083a37a0f0.jpg');
  background-size: 100%;
  background-position: center;
  width: 100%;
  height: 350px;
  position: relative;
`;
