import { createPortal } from 'react-dom';
import { styled } from 'styled-components';
import '../color.css';

export const PORTAL_MODAL = 'portal-root';

const Modal = ({ name, isOpen, setIsOpen }) => {
  const closeHandler = () => {
    setIsOpen(false);
  };

  return isOpen
    ? createPortal(
        <Outer>
          <Inner>
            {name === 'logIn' ? '로그인' : '회원가입'}
            <input />
            <input />
            <StButtonSet>
              <button>{name === 'logIn' ? '로그인' : '회원가입'}</button>
              <button onClick={closeHandler}>닫기</button>
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

  width: 700px;
  height: 500px;

  padding: 30px;

  background-color: var(--color_white1);

  border-radius: 10px;
`;

const StButtonSet = styled.div`
  display: flex;
`;
