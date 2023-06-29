import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { styled } from 'styled-components';
import '../color.css';
import { Input } from '../shared/Input';
import { BlueButton, GrayButton } from '../shared/Buttons';
import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { getUsers } from '../redux/modules/users';

export const PORTAL_MODAL = 'portal-root';

const Modal = ({ type, isOpen, setIsOpen }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('사용자 정보 user', user);
    });
  }, []);

  const onChange = (event) => {
    const {
      target: { name, value }
    } = event;
    if (name === 'name') {
      setName(value);
    }
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };

  const SignUp = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('회원가입한 유저', userCredential);
      await updateProfile(auth.currentUser, { displayName: name });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('회원가입 에러', errorCode, errorMessage);
    }
    setIsOpen(false);
  };

  const SignIn = async (event) => {
    event.preventDefault();

    try {
      setPersistence(auth, browserSessionPersistence);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      dispatch(
        getUsers({
          id: userCredential.user.uid,
          name: userCredential.user.displayName,
          email: userCredential.user.email
        })
      );

      setIsOpen(false);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('로그인 에러', errorCode, errorMessage);
    }
  };

  const closeHandler = () => {
    setIsOpen(false);
  };

  return isOpen
    ? createPortal(
        <Outer>
          <Inner>
            <p>{type === 'signIn' ? '로그인이 필요해요 :)' : '회원가입을 해볼까요?'}</p>
            {type === 'signUp' ? <Input name="name" value={name} onChange={onChange} placeholder="이름" /> : null}
            <Input type="email" name="email" value={email} onChange={onChange} placeholder="이메일" />
            <Input type="password" name="password" value={password} onChange={onChange} placeholder="비밀번호" />
            <StButtonSet>
              {type === 'signIn' ? (
                <BlueButton onClick={SignIn}>로그인</BlueButton>
              ) : (
                <BlueButton onClick={SignUp}>회원가입</BlueButton>
              )}
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

  p {
    font-size: larger;
  }
`;

const StButtonSet = styled.div`
  display: flex;
`;
