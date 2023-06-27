import React from 'react';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';
// import { useParams } from 'react-router-dom';

const MyPagePost = () => {
  const users = useSelector((state) => state.users);
  console.log(users);

  // const params = useParams();

  // const foundUser = users.find((user) => {
  //   return user.id === params.id;
  // });
  // console.log(foundUser);

  console.log('users제발제발', users);

  return (
    <>
      <StContainer>
        <StInfo>
          <StImage></StImage>
          <div>
            <StGreeting>{users.name}님, 안녕하세요!</StGreeting>
            <StEmail>email</StEmail>
          </div>
        </StInfo>

        <StOptions>
          <StButton>좋아요</StButton>
          <StButton>내 글 목록</StButton>
          <StButton>비밀번호 변경</StButton>
        </StOptions>
      </StContainer>
      <StContainer className="body">내 글 목록</StContainer>
    </>
  );
};

export default MyPagePost;

const StContainer = styled.div`
  border-top: 1px solid var(--color_gray2);
  &.body {
    height: 200px;
    padding: 50px;
  }
`;

const StInfo = styled.div`
  display: flex;
  gap: 40px;

  padding: 45px 70px;
`;

const StImage = styled.div`
  width: 90px;
  height: 90px;
  background-color: var(--color_blue2);
  border-radius: 100px;
`;

const StGreeting = styled.p`
  margin-top: 10px;
  font-size: 24px;
  font-weight: 700px;
`;

const StEmail = styled.p`
  font-size: 18px;
  font-weight: 700px;
  color: var(--color_gray1);
`;

const StOptions = styled.div`
  display: flex;
  justify-content: center;

  margin: 0px;
  padding-bottom: 50px;

  gap: 80px;
`;

const StButton = styled.button`
  width: 200px;
  height: 50px;

  margin: 5px;
  padding: 10px 15px;

  background-color: var(--color_gray2);

  border: none;
  border-radius: 12px;

  color: var(--color_white1);
  font-weight: 700;
  text-align: center;

  cursor: pointer;

  &:hover {
    background-color: var(--color_gray1);
  }
`;
