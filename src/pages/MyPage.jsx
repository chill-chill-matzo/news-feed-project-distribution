import React from 'react';
import { styled } from 'styled-components';
import MyPagePost from '../components/MyPagePost';

function MyPage() {
  return (
    <>
      <StAside>
        <StButton>로그아웃</StButton>
        <StButton>HOME</StButton>
      </StAside>
      <MyPagePost />
    </>
  );
}

export default MyPage;

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
