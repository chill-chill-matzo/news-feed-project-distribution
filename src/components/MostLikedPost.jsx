import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { useSelector } from 'react-redux';

function MostLikedPost() {
  const [postStorage, setPostStorage] = useState([]);
  const [isLogInOpen, setIsLogInOpen] = useState(false);
  const users = useSelector((state) => state.users);
  const user = users[0];

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'PostStorage'), orderBy('like', 'desc'), limit(1));
      const querySnapshot = await getDocs(q);
      const initialPostStorage = [];
      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          ...doc.data()
        };
        initialPostStorage.push(data);
      });
      setPostStorage(initialPostStorage);
      console.log('가져온 데이터들', initialPostStorage);
    };
    fetchData();
  }, []);

  const post = postStorage[0];

  const navigate = useNavigate();

  const postClickHandler = () => {
    if (user === undefined) {
      setIsLogInOpen(true);
    } else {
      navigate(`detail/${post.id}`);
    }
  };

  return (
    <div>
      {post && (
        <MostLikedImage image={post.imageLink} onClick={postClickHandler}>
          <h1>👑 명 예 의 전 당 👑</h1>
          <p>최고 인기글에 도전해보세요!</p>
        </MostLikedImage>
      )}
      {isLogInOpen && <Modal type="signIn" isOpen={isLogInOpen} setIsOpen={setIsLogInOpen} />}
    </div>
  );
}

export default MostLikedPost;

const MostLikedImage = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 420px;
  border-radius: 10px;
  background-image: url(${(props) => props.image});
  background-size: 100%, cover;
  background-position: center;

  &:hover {
    box-shadow: 0px 0px 30px var(--color_gray1);
    transform: scale(1.03);
    transition: all 1s;
    cursor: pointer;
  }

  h1 {
    position: absolute;
    width: 100%;
    padding: 1px;
    text-align: center;
    background-color: var(--color_gray1);
    opacity: 0.85;
    color: var(--color_white1);
    font-size: large;
    font-weight: 600;
  }

  p {
    position: absolute;
    bottom: 0px;
    width: 100%;
    padding: 3px;
    background-color: var(--color_gray1);
    opacity: 0.85;
    color: var(--color_white1);
    text-align: center;
  }
`;
