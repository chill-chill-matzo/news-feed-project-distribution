import React from 'react';
import { styled } from 'styled-components';

function NewestPost() {
  return (
    <>
      <Grid>
        <Img src="https://i.pinimg.com/564x/68/4c/ed/684ced199400f4316b10a9083a37a0f0.jpg" alt="" />
        <Img src="https://i.pinimg.com/564x/68/4c/ed/684ced199400f4316b10a9083a37a0f0.jpg" alt="" />
        <Img src="https://i.pinimg.com/564x/68/4c/ed/684ced199400f4316b10a9083a37a0f0.jpg" alt="" />
        <Img src="https://i.pinimg.com/564x/68/4c/ed/684ced199400f4316b10a9083a37a0f0.jpg" alt="" />
        <Img src="https://i.pinimg.com/564x/68/4c/ed/684ced199400f4316b10a9083a37a0f0.jpg" alt="" />
        <Img src="https://i.pinimg.com/564x/68/4c/ed/684ced199400f4316b10a9083a37a0f0.jpg" alt="" />
        <Img src="https://i.pinimg.com/564x/68/4c/ed/684ced199400f4316b10a9083a37a0f0.jpg" alt="" />
      </Grid>
    </>
  );
}

export default NewestPost;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(200px, auto));
  grid-template-rows: repeat(auto-fill, minmax(20%, auto));
  grid-gap: 15px;
  justify-content: center;
  place-items: center;
  margin-top: 15px;
  margin-bottom: 50px;

  @media screen and (max-width: 1100px) {
    grid-template-columns: repeat(3, minmax(200px, auto));
  }
`;

const Img = styled.img`
  justify-content: center;
  align-items: center;
  width: 230px;
  height: 230px;
`;
