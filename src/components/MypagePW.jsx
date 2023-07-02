import React, { useState } from 'react';
import { styled } from 'styled-components';
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { Input } from '../shared/Input';
import { BlueButton } from '../shared/Buttons';

const MyPagePW = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'currentPassword') {
      setCurrentPassword(value);
    } else if (name === 'newPassword') {
      setNewPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    } else if (newPassword.length <= 5 || confirmPassword.length <= 5) {
      setErrorMessage('비밀번호는 6자리 이상 입력해주세요.');
      return;
    } else if (currentPassword === newPassword) {
      setErrorMessage('현재 비밀번호와 일치합니다. 새로운 비밀번호를 다시 입력해주세요.');
    } else {
      const result = window.confirm('비밀번호를 변경하시겠습니까?');

      if (result === true) {
        try {
          const auth = getAuth();
          const user = auth.currentUser;
          const credentials = EmailAuthProvider.credential(user.email, currentPassword);

          await reauthenticateWithCredential(user, credentials);
          await updatePassword(user, newPassword);

          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
          setErrorMessage('');
          alert('비밀번호를 변경했습니다');
          window.location.reload();
        } catch (error) {
          setErrorMessage('비밀번호 변경에 실패했습니다. 현재 비밀번호를 확인해주세요.');
          console.log('비밀번호 변경 실패', error);
        }
      } else if (result === false) {
        alert('비밀번호 변경을 취소합니다');
      }
    }
  };

  return (
    <>
      <Container>
        <form onSubmit={handleSubmit}>
          <InForm>
            <div>
              <label htmlFor="currentPassword">현재 비밀번호</label>
              <PasswordInput
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={currentPassword}
                onChange={handleChange}
                placeholder="현재 비밀번호를 입력해주세요"
                required
              />
            </div>
            <div>
              <label htmlFor="newPassword">새로운 비밀번호</label>
              <PasswordInput
                type="password"
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={handleChange}
                placeholder="6자 이상 입력해주세요"
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">비밀번호 확인</label>
              <PasswordInput
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                placeholder="새로운 비밀번호를 다시 입력해주세요"
                required
              />
            </div>
          </InForm>
          <BlueButton type="submit">비밀번호 변경</BlueButton>
        </form>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Container>
    </>
  );
};

export default MyPagePW;

const Container = styled.div`
  border-top: 1px solid var(--color_gray2);
  height: 500px;
  padding: 50px;
  text-align: center;
  justify-content: center;
`;

const InForm = styled.div`
  width: fit-content;
  margin: 0 auto;
  padding: 20px;
  text-align: right;
`;

const ErrorMessage = styled.div`
  color: var(--color_red);
  margin-top: 20px;
`;

const PasswordInput = styled(Input)`
  width: 250px;
`;
