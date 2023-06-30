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
    }

    const confirmed = window.confirm('비밀번호를 변경하시겠습니까?');

    if (!confirmed) {
      return;
    }

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
      console.log('비밀번호 변경 성공');
    } catch (error) {
      setErrorMessage('비밀번호 변경에 실패했습니다. 현재 비밀번호를 확인해주세요.');
      console.log('비밀번호 변경 실패', error);
    }
  };

  return (
    <>
      <Container>
        <h2>비밀번호 변경</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="currentPassword">현재 비밀번호</label>
            <Input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={currentPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="newPassword">새로운 비밀번호</label>
            <Input
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
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

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;
