import React from 'react';
import { styled } from 'styled-components';
import MyPagePost from '../components/MyPagePost';
import { TextButton } from '../shared/Buttons';
import HomeButton from '../components/HomeButton';
function MyPage() {
  return (
    <>
      <StAside>
        <TextButton>로그아웃</TextButton>
        <HomeButton />
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
