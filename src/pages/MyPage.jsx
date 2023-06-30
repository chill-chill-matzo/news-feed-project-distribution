import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MyPagePost from '../components/MyPagePost';
import MyPageLike from '../components/MypageLike';
import MyPagePW from '../components/MypagePW';
import { styled } from 'styled-components';
import { GrayButton } from '../shared/Buttons';


const MyPage = () => {
  const users = useSelector((state) => state.users);
  const [user] = users;
  
  const [clickedBtn, setClickedBtn] = useState("my-post-btn")
  
  const isActive = (id) => {
    return clickedBtn === id
  }

  const clickButton = (event) => {
    setClickedBtn(event.target.id)
  }

  
  return (
    <>
      <div>
        <Info>
          <Image></Image>
          {user && (
            <div>
              <Name>{user.name}님, 안녕하세요!</Name>
              <Email>{user.email}</Email>
            </div>
          )}
        </Info>

        <Options>
          <Button onClick={clickButton} active={isActive("like-btn")} id="like-btn">좋아요</Button>
          <Button onClick={clickButton} active={isActive("my-post-btn")} id="my-post-btn">내 글 목록</Button>
          <Button onClick={clickButton} active={isActive("change-pw-btn")} id="change-pw-btn">비밀번호 변경</Button>
        </Options>
      </div>
      {isActive("like-btn") ? <MyPageLike />  : null}
      {isActive("my-post-btn") ? <MyPagePost /> : null }
      {isActive("change-pw-btn")? <MyPagePW />  : null}
    </>
  );
};

export default MyPage;

const Info = styled.div`
  display: flex;
  gap: 40px;

  padding: 20px 70px;
`;

const Image = styled.div`
  width: 90px;
  height: 90px;
  background-color: var(--color_blue2);
  border-radius: 100px;
`;

const Name = styled.p`
  margin-top: 10px;
  font-size: 24px;
  font-weight: 700px;
`;

const Email = styled.p`
  font-size: 18px;
  font-weight: 700px;
  color: var(--color_gray1);
`;

const Options = styled.div`
  display: flex;
  justify-content: center;

  margin: 0px;
  padding-top: 15px;
  padding-bottom: 30px;

  gap: 50px;
`;

const Button = styled(GrayButton)`
  width: 150px;
  height: 35px;
  padding: 10px 15px;
  background-color: ${props => props.active ? 'var(--color_blue2)' : null};
  &:hover {background-color: ${props => props.active ? 'var(--color_blue1)' : null};}
`;
