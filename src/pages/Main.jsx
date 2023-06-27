import React, { useState } from 'react';
import MostLikedPost from '../components/MostLikedPost';
import NewestPost from '../components/NewestPost';
import { styled } from 'styled-components';
import Modal from '../components/Modal';
import { BlueButton } from '../shared/Buttons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Main() {
  const [isLogInOpen, setIsLogInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const users = useSelector((state) => state.users);
  console.log('users 제발 나와줘 제발', users.id, users.name, users.password);

  const navigate = useNavigate();
  return (
    <>
      <StAside>
        <StButton onClick={() => setIsLogInOpen((prev) => !prev)}>로그인</StButton>
        {isLogInOpen && <Modal type="signIn" isOpen={isLogInOpen} setIsOpen={setIsLogInOpen} />}
        <StButton onClick={() => setIsSignUpOpen((prev) => !prev)}>회원가입</StButton>
        {isSignUpOpen && <Modal type="signUp" isOpen={isSignUpOpen} setIsOpen={setIsSignUpOpen} />}
      </StAside>
      <MostLikedPost />
      <NewestPost />
      <BlueButton
        onClick={() => {
          navigate('mypage');
        }}
      >
        마이페이지
      </BlueButton>
    </>
  );
}

export default Main;

const StAside = styled.aside`
  display: flex;
  align-items: center;
  justify-content: right;

  height: 40px;

  padding: 8px;
  padding-right: 15px;
  gap: 10px;

  background-color: var(--color_white1);
`;

const StButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 16px;
  font-weight: 500;
  color: var(--color_gray1);
  cursor: pointer;
`;
