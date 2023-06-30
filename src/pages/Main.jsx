import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MostLikedPost from '../components/MostLikedPost';
import NewestPost from '../components/NewestPost';
import Modal from '../components/Modal';

function Main() {
  const [isLogInOpen, setIsLogInOpen] = useState(false);

  return (
    <>
      <MostLikedPost />
      {isLogInOpen && <Modal type="signIn" isOpen={isLogInOpen} setIsOpen={setIsLogInOpen} />}

      <NewestPost />
    </>
  );
}

export default Main;
