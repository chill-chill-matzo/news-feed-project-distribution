import React from 'react';
import DetailPost from '../components/DetailPost';
import { TextButton } from '../shared/Buttons';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

function Detail({ props }) {
  const navigate = useNavigate();

  return (
    <>
      <BackButton
        onClick={() => {
          navigate(-1);
        }}
      >
        〈 BACK
      </BackButton>
      <DetailPost />
    </>
  );
}

export default Detail;

const BackButton = styled(TextButton)`
  text-align: left;
  margin: 0;
  margin-left: 12px;
  padding: 0;
`;
