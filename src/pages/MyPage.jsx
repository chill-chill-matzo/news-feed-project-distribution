import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MyPagePost from '../components/MyPagePost';
import MyPageLike from '../components/MypageLike';
import MyPagePW from '../components/MypagePW';
import { styled } from 'styled-components';
import { GrayButton } from '../shared/Buttons';
import ProfileModal from '../components/ProfileModal';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import { IconCherry } from '../shared/IconCherry';

const MyPage = () => {
  const users = useSelector((state) => state.users);
  const [user] = users;

  const [clickedBtn, setClickedBtn] = useState('my-post-btn');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profile, setProfile] = useState([]);

  const isActive = (id) => {
    return clickedBtn === id;
  };

  const clickButton = (event) => {
    setClickedBtn(event.target.id);
  };

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'ProfileStorage'), orderBy('time', 'desc'));
      const querySnapshot = await getDocs(q);
      const initialProfileStorage = [];
      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          ...doc.data()
        };

        initialProfileStorage.push(data);
      });
      setProfile(initialProfileStorage);
    };
    fetchData();
  }, []);

  const myProfileList = profile.filter((profileItem) => {
    return profileItem.user.id === user.id;
  });

  const recentProfile = myProfileList[0];

  return (
    <>
      <div>
        <Info>
          {myProfileList && recentProfile && (
            <Profile onClick={() => setIsModalOpen((prev) => !prev)}>
              <Image src={recentProfile.photoURL || undefined} alt="" />
            </Profile>
          )}
          {myProfileList.length === 0 && (
            <Profile onClick={() => setIsModalOpen((prev) => !prev)}>
              <ImageDiv>
                <IconCherry />
              </ImageDiv>
            </Profile>
          )}
          {isModalOpen && <ProfileModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} user={user} />}

          {user && (
            <div>
              <Name>{user.name}님, 안녕하세요!</Name>
              <Email>{user.email}</Email>
            </div>
          )}
        </Info>

        <Options>
          <Button onClick={clickButton} active={isActive('my-post-btn') ? 'true' : undefined} id="my-post-btn">
            내 글 목록
          </Button>
          <Button onClick={clickButton} active={isActive('like-btn') ? 'true' : undefined} id="like-btn">
            좋아요
          </Button>
          <Button onClick={clickButton} active={isActive('change-pw-btn') ? 'true' : undefined} id="change-pw-btn">
            비밀번호 변경
          </Button>
        </Options>
      </div>
      {isActive('my-post-btn') ? <MyPagePost /> : null}
      {isActive('like-btn') ? <MyPageLike user={user} /> : null}
      {isActive('change-pw-btn') ? <MyPagePW /> : null}
    </>
  );
};

export default MyPage;

const Info = styled.div`
  display: flex;
  gap: 40px;

  padding: 20px 70px;
`;

const Profile = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  overflow: hidden;
  border: 4px solid var(--color_gray2);
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageDiv = styled.div`
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin-top: 20px;
  padding-right: 10px;
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
  background-color: ${(props) => (props.active ? 'var(--color_blue2)' : null)};
  &:hover {
    background-color: ${(props) => (props.active ? 'var(--color_blue1)' : null)};
  }
`;
