import { createPortal } from 'react-dom';
import { styled } from 'styled-components';
import '../color.css';
import Input from '../shared/Input';
import { BlueButton, GrayButton } from '../shared/Buttons';

export const PORTAL_MODAL = 'portal-root';

const Modal = ({ name, isOpen, setIsOpen }) => {
  const closeHandler = () => {
    setIsOpen(false);
  };

  return isOpen
    ? createPortal(
        <Outer>
          <Inner>
            {name === 'logIn' ? '로그인이 필요해요 :)' : '회원가입을 해볼까요?'}
            <Input />
            <Input />
            {name === 'signUp' ? <Input /> : null}
            <StButtonSet>
              <BlueButton>{name === 'logIn' ? '로그인' : '회원가입'}</BlueButton>
              <GrayButton onClick={closeHandler}>닫기</GrayButton>
            </StButtonSet>
          </Inner>
        </Outer>,
        document.getElementById(PORTAL_MODAL)
      )
    : null;
};

export default Modal;

const Outer = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;

  padding: 100px;

  background-color: var(--color_white1);

  border-radius: 10px;
`;

const StButtonSet = styled.div`
  display: flex;
`;
