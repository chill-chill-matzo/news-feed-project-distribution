import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TextButton } from '../shared/Buttons';

const HomeButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <TextButton onClick={handleGoBack}>
      <span>HOME</span>
    </TextButton>
  );
};

export default HomeButton;
