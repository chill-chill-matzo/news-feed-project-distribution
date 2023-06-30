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
    };
    fetchData();
  }, []);

  const navigate = useNavigate();

  return (
    <>
      {postStorage.map((post) => {
        const postClickHandler = () => {
          if (user === undefined) {
            setIsLogInOpen(true);
          } else {
            navigate(`detail/${post.id}`);
          }
        };

        return (
          <>
            <MostLikedImage key={post.id} onClick={postClickHandler}>
              <img key={post.id} src={post.imageLink} alt="" />
            </MostLikedImage>
            {isLogInOpen && <Modal type="signIn" isOpen={isLogInOpen} setIsOpen={setIsLogInOpen} />}
          </>
        );
      })}
    </>
  );
}

export default MostLikedPost;

const MostLikedImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  // object-fit: cover;
  width: 100%;
  height: 350px;
  position: relative;
  overflow: hidden;
`;
