import React from 'react'
import { styled } from 'styled-components'
import { BlueButton } from '../shared/Buttons';

function DetailPost() {
  return (
    <>
    <DetailImage/>
    <DetailContainer>
      <DetailTitle>제목</DetailTitle>
      <DetailBody>상세 내용.....상세 내용.....상세 내용.....상세 내용.....상세 내용.....
        상세 내용..... 상세 내용.....상세 내용.....상세 내용.....상세 내용.....상세 내용.....
        상세 내용.....나는 뭉충이이
        저만 알고 싶은 맛집입니다.. 알려드려요.. 고맙죠?
      </DetailBody>
      <ButtonSet>
        <BlueButton>수정</BlueButton>
        <BlueButton>삭제</BlueButton>
      </ButtonSet>
    </DetailContainer>
    </>
  )
}

export default DetailPost

const DetailImage = styled.div`
background-image: url('https://i.pinimg.com/564x/68/4c/ed/684ced199400f4316b10a9083a37a0f0.jpg');
background-size: 100%;
background-position: center;
width: 90%;
height: 500px;
position: relative;
`;

const DetailContainer = styled.div`
  width: 87%;
  margin: 30px auto 30px;
`

const DetailTitle = styled.h1`
  font-size: 25px;
  font-weight: bold;
  
`

const DetailBody = styled.div`
  padding: 10px;
  font-size: 17px;
`

const ButtonSet = styled.div`
  display: flex;
  justify-content: right;
`