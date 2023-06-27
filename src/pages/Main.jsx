import React, { useState } from 'react';
import MostLikedPost from '../components/MostLikedPost';
import NewestPost from '../components/NewestPost';
import { styled } from 'styled-components';
import Modal from '../components/Modal';
// import ModalSignUp from '../components/ModalSignUp';

function Main() {
  const [isLogInOpen, setIsLogInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  return (
    <>
      <StAside>
        <StButton onClick={() => setIsLogInOpen((prev) => !prev)}>로그인</StButton>
        {isLogInOpen && <Modal name="logIn" isOpen={isLogInOpen} setIsOpen={setIsLogInOpen} />}
        <StButton onClick={() => setIsSignUpOpen((prev) => !prev)}>회원가입</StButton>
        {isSignUpOpen && <Modal name="signUp" isOpen={isSignUpOpen} setIsOpen={setIsSignUpOpen} />}
      </StAside>
      <MostLikedPost />
      <NewestPost />
    </>
  );
}

export default Main;

const StAside = styled.aside`
  display: flex;
  align-items: center;
  justify-content: right;

  height: 40px;

  padding: 10px;
  padding-right: 30px;
  gap: 10px;

  background-color: var(--color_white1);

  color: var(--color_gray1);
  font-weight: 700;
`;

const StButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 16px;
  font-weight: 700;
  color: var(--color_gray1);
  cursor: pointer;
`;
