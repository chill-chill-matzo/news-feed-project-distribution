import React from 'react';
import MostLikedPost from '../components/MostLikedPost';
import NewestPost from '../components/NewestPost';
import { GrayButton } from '../shared/Buttons';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

function Main() {
  const navigate = useNavigate();
  return (
    <>
      <MostLikedPost />
      <Button
        onClick={() => {
          navigate('addpost');
        }}
      >
        새 글 작성
      </Button>
      <NewestPost />
    </>
  );
}

export default Main;

const Button = styled(GrayButton)`
  margin: 10px auto;
  padding: 10px 25px;
  width: fit-content;
`;
