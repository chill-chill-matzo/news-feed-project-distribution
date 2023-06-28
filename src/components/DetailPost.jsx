import React from 'react';
import { styled } from 'styled-components';
import { BlueButton } from '../shared/Buttons';
import BackButton from '../components/BackButton';

function DetailPost() {
  return (
    <>
      <DetailImage />
      <DetailContainer>
        <h1>제목</h1>
        <p>
          상세 내용.....상세 내용.....상세 내용.....상세 내용.....상세 내용..... 상세 내용..... 상세 내용.....상세
          내용.....상세 내용.....상세 내용.....상세 내용..... 상세 내용.....나는 뭉충이이 저만 알고 싶은 맛집입니다..
          알려드려요.. 고맙죠?
        </p>
        <ButtonSet>
          <BlueButton>수정</BlueButton>
            <BackButton />
          <BlueButton>삭제</BlueButton>
        </ButtonSet>
      </DetailContainer>
    </>
  );
}

export default DetailPost;

const DetailImage = styled.div`
  position: relative;
  width: 90%;
  height: 500px;
  margin: 30px auto;
  background-image: url('https://i.pinimg.com/564x/68/4c/ed/684ced199400f4316b10a9083a37a0f0.jpg');
  background-size: 100%;
  background-position: center;
`;

const DetailContainer = styled.div`
  width: 87%;
  margin: 20px auto 20px;

  h1 {
    font-size: 25px;
    font-weight: bold;
  }

  p {
    margin-top: 15px;
    font-size: 17px;
  }
`;

const ButtonSet = styled.div`
  display: flex;
  justify-content: right;
`;
