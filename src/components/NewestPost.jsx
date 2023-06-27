import React from 'react';
import { styled } from 'styled-components';

function NewestPost() {
  return (
    <Grid>
      <Img src="https://i.pinimg.com/564x/68/4c/ed/684ced199400f4316b10a9083a37a0f0.jpg" alt="" />
      <Img src="https://i.pinimg.com/564x/68/4c/ed/684ced199400f4316b10a9083a37a0f0.jpg" alt="" />
      <Img src="https://i.pinimg.com/564x/68/4c/ed/684ced199400f4316b10a9083a37a0f0.jpg" alt="" />
      <Img src="https://i.pinimg.com/564x/68/4c/ed/684ced199400f4316b10a9083a37a0f0.jpg" alt="" />
      <Img src="https://i.pinimg.com/564x/68/4c/ed/684ced199400f4316b10a9083a37a0f0.jpg" alt="" />
    </Grid>
  );
}

export default NewestPost;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(250px, auto));
  grid-template-rows: repeat(auto-fill, minmax(20%, auto));
  justify-content: center;
  place-items: center;
  margin-top: 50px;
`;

const Img = styled.img`
  justify-content: center;
  align-items: center;
  width: 230px;
  height: 230px;
  margin: 20px;
`;
