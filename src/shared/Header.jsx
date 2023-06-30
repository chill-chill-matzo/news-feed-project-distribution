import React, { useState } from 'react';
import Modal from '../components/Modal';
import { TextButton } from '../shared/Buttons';
import { styled } from 'styled-components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

function Header() {
  const users = useSelector((state) => state.users);
  const [user] = users;

  const [isLogInOpen, setIsLogInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const navigate = useNavigate();

  const SignOut = async (event) => {
    event.preventDefault();
    await signOut(auth);
    window.location.href = '/';
  };

  if (user === undefined) {
    return (
      <>
        <StyledAside>
          <TextButton onClick={() => setIsLogInOpen((prev) => !prev)}>로그인</TextButton>
          {isLogInOpen && <Modal type="signIn" isOpen={isLogInOpen} setIsOpen={setIsLogInOpen} />}
          <TextButton onClick={() => setIsSignUpOpen((prev) => !prev)}>회원가입</TextButton>
          {isSignUpOpen && <Modal type="signUp" isOpen={isSignUpOpen} setIsOpen={setIsSignUpOpen} />}
        </StyledAside>
      </>
    );
  } else {
    return (
      <>
        <StyledAside>
          <TextButton onClick={() => navigate(`mypage/${user.id}`)}>마이페이지</TextButton>
          <TextButton onClick={SignOut}>로그아웃</TextButton>
        </StyledAside>
      </>
    );
  }
}

export default Header;

const StyledAside = styled.aside`
  display: flex;
  align-items: center;
  justify-content: right;

  height: 35px;

  padding: 5px;
  padding-right: 12px;
  gap: 7px;

  background-color: var(--color_white1);
`;
