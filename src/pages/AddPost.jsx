import React, { useState } from 'react';
import { TitleInput, ContentInput } from '../shared/Input';
import { BlueButton } from '../shared/Buttons';
import { styled } from 'styled-components';
import Modal from '../components/Modal';
// import ModalSignUp from '../components/ModalSignUp';

function AddPost() {
  const [isLogInOpen, setIsLogInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  return (
    <Div>
      <StAside>
        <StButton onClick={() => setIsLogInOpen((prev) => !prev)}>로그인</StButton>
        {isLogInOpen && <Modal name="logIn" isOpen={isLogInOpen} setIsOpen={setIsLogInOpen} />}
        <StButton onClick={() => setIsSignUpOpen((prev) => !prev)}>회원가입</StButton>
        {isSignUpOpen && <Modal name="signUp" isOpen={isSignUpOpen} setIsOpen={setIsSignUpOpen} />}
      </StAside>

      <Title>여러분의 맛집을 추천해주세요!</Title>
      <Container>
        <TitleInput />
        <ContentInput />
        <View></View>
        <ButtonsContainer>
          <BlueButton>사진 선택</BlueButton>
          <div>
            <BlueButton>취소</BlueButton>
            <BlueButton>등록</BlueButton>
          </div>
        </ButtonsContainer>
      </Container>
    </Div>
  );
}

export default AddPost;

const Div = styled.div`
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  text-align: center;
  font-weight: 700;
`;

const Title = styled.p`
  margin: 10px;
  font-size: x-large;
`;

const Container = styled.form`
  width: 85%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid var(--color_gray1);
  border-radius: 15px;
`;

const ButtonsContainer = styled.div`
  justify-content: space-between;
  display: flex;
  margin-top: 30px;
`;

const View = styled.div`
  height: 150px;
`;

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
