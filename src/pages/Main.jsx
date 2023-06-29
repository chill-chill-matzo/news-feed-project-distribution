import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MostLikedPost from '../components/MostLikedPost';
import NewestPost from '../components/NewestPost';
import { GrayButton } from '../shared/Buttons';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import Modal from '../components/Modal';

function Main() {
  const [isLogInOpen, setIsLogInOpen] = useState(false);

  const users = useSelector((state) => state.users);
  const [user] = users;

  const navigate = useNavigate();

  const handleAddPostClick = () => {
    if (user === undefined) {
      setIsLogInOpen(true);
    } else {
      navigate('addpost');
    }
  };

  return (
    <>
      <MostLikedPost />
      <Button onClick={handleAddPostClick}>새 글 작성</Button>
      {isLogInOpen && <Modal type="signIn" isOpen={isLogInOpen} setIsOpen={setIsLogInOpen} />}

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
