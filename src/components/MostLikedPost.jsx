import React from 'react';
import { styled } from 'styled-components';

function MostLikedPost() {
  return <MostLikedImage src="https://i.pinimg.com/564x/68/4c/ed/684ced199400f4316b10a9083a37a0f0.jpg" alt="" />;
}

export default MostLikedPost;

const MostLikedImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 350px;
  position: relative;
  margin-bottom: 15px;
`;
