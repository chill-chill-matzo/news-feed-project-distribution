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

  const handleAddPostClick = () => {
    if (user === undefined) {
      setIsLogInOpen(true);
    } else {
      navigate('addpost');
    }
  };

  if (user === undefined) {
    return (
      <>
        <StyledAside>
          <div>
            <TextButton onClick={() => setIsLogInOpen((prev) => !prev)}>로그인</TextButton>
            {isLogInOpen && <Modal type="signIn" isOpen={isLogInOpen} setIsOpen={setIsLogInOpen} />}
            <TextButton onClick={() => setIsSignUpOpen((prev) => !prev)}>회원가입</TextButton>
            {isSignUpOpen && <Modal type="signUp" isOpen={isSignUpOpen} setIsOpen={setIsSignUpOpen} />}
          </div>
        </StyledAside>
      </>
    );
  } else {
    return (
      <>
        <StyledAside>
          <TextButton onClick={handleAddPostClick}>새 글 작성</TextButton>
          <div>
            <TextButton onClick={() => navigate(`mypage/${user.id}`)}>마이페이지</TextButton>
            <TextButton onClick={SignOut}>로그아웃</TextButton>
          </div>
        </StyledAside>
      </>
    );
  }
}

export default Header;

const StyledAside = styled.aside`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 35px;

  padding: 5px 12px;
  gap: 7px;

  background-color: var(--color_white1);
`;
