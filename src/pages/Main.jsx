import React from 'react';
import MostLikedPost from '../components/MostLikedPost';
import NewestPost from '../components/NewestPost';
import { BlueButton } from '../shared/Buttons';
import { useNavigate } from 'react-router-dom';

function Main() {
  const navigate = useNavigate();
  return (
    <>
      <MostLikedPost />
      <NewestPost />
      <BlueButton
        onClick={() => {
          navigate('addpost');
        }}
      >
        새 글 작성
      </BlueButton>
    </>
  );
}

export default Main;
