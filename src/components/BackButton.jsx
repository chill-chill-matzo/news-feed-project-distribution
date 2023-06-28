import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const BlueButton = styled.button`
  align-items: center;
  margin: 5px;
  padding: 10px 15px;
  background-color: var(--color_blue2);
  color: var(--color_white1);
  border: none;
  border-radius: 12px;
  font-weight: 700;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: var(--color_blue1);
  }
`;

const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/'); // -1을 전달하여 뒤로가기 기능 수행
  };

  return (
    <BlueButton onClick={handleGoBack}>
      <span>취소</span>
    </BlueButton>
  );
};

export default BackButton;
