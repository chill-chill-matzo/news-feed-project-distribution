import React, { useState } from 'react';
import MostLikedPost from '../components/MostLikedPost';
import NewestPost from '../components/NewestPost';
import { styled } from 'styled-components';
import Modal from '../components/Modal';
import { BlueButton } from '../shared/Buttons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TextButton } from '../shared/Buttons';

function Main() {
  const [isLogInOpen, setIsLogInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const users = useSelector((state) => state.users);
  console.log('users 제발 나와줘 제발', users.id, users.name, users.password);

  const navigate = useNavigate();
  return (
    <>
      <StAside>
        <TextButton onClick={() => setIsLogInOpen((prev) => !prev)}>로그인</TextButton>
        {isLogInOpen && <Modal type="signIn" isOpen={isLogInOpen} setIsOpen={setIsLogInOpen} />}
        <TextButton onClick={() => setIsSignUpOpen((prev) => !prev)}>회원가입</TextButton>
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
