import React, { useState } from 'react';
import MostLikedPost from '../components/MostLikedPost';
import NewestPost from '../components/NewestPost';
import { styled } from 'styled-components';
import Modal from '../components/Modal';
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
        <TextButton
          onClick={() => {
            navigate('mypage');
          }}
        >
          마이페이지(test)
        </TextButton>
        <TextButton onClick={() => setIsLogInOpen((prev) => !prev)}>로그인</TextButton>
        {isLogInOpen && <Modal type="signIn" isOpen={isLogInOpen} setIsOpen={setIsLogInOpen} />}
        <TextButton onClick={() => setIsSignUpOpen((prev) => !prev)}>회원가입</TextButton>
        {isSignUpOpen && <Modal type="signUp" isOpen={isSignUpOpen} setIsOpen={setIsSignUpOpen} />}
      </StAside>
      <MostLikedPost />
      <StButton
        onClick={() => {
          navigate('addpost');
        }}
      >
        새 글 작성
      </StButton>
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

  padding: 8px;
  padding-right: 15px;
  gap: 10px;

  background-color: var(--color_white1);
`;

const StButton = styled.button`
  margin: 30px 300px;
  padding: 10px 15px;

  background-color: var(--color_gray2);

  border: none;
  border-radius: 10px;

  color: var(--color_white1);
  font-weight: 700;
  text-align: center;

  cursor: pointer;

  &:hover {
    background-color: var(--color_gray1);
  }
`;
