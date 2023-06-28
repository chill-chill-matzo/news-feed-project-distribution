import React from 'react';
import DetailPost from '../components/DetailPost';
import { styled } from 'styled-components';
import { TextButton } from '../shared/Buttons';
import { useNavigate } from 'react-router-dom';

function Detail() {
  const navigate = useNavigate();
  return (
    <>
      <StAside>
        <TextButton
          onClick={() => {
            navigate('mypage');
          }}
        >
          마이페이지
        </TextButton>

        <TextButton>로그아웃</TextButton>
      </StAside>
      <DetailPost />
    </>
  );
}

export default Detail;

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
