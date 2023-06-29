import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { styled } from 'styled-components';
import Post from './Post';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { useSelector } from 'react-redux';

function NewestPost() {
  const [postStorage, setPostStorage] = useState([]);
  const [isLogInOpen, setIsLogInOpen] = useState(false);
  const users = useSelector((state) => state.users);
  const [user] = users;

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'PostStorage'), orderBy('time', 'desc'));
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
      <Grid>
        {postStorage.map((post) => {
          const postClickHandler = () => {
            if (user === undefined) {
              setIsLogInOpen(true);
            } else {
              navigate(`detail/${post.id}`);
            }
          };

          return <Post key={post.id} title={post.title} image={post.imageLink} onClick={postClickHandler} />;
        })}
      </Grid>
      {isLogInOpen && <Modal type="signIn" isOpen={isLogInOpen} setIsOpen={setIsLogInOpen} />}
    </>
  );
}

export default NewestPost;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(200px, auto));
  grid-template-rows: repeat(auto-fill);
  grid-gap: 15px;
  justify-content: center;
  place-items: center;
  margin-top: 15px;
  margin-bottom: 50px;

  @media screen and (max-width: 1100px) {
    grid-template-columns: repeat(3, minmax(200px, auto));
  }
`;
