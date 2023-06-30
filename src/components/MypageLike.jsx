import { collection, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import Post from './Post';

const MyPageLike = ({ user }) => {
  const [postStorage, setPostStorage] = useState([]);
  const [userLikeList, setUserLikeList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'UserLikeList'));
      const querySnapshot = await getDocs(q);

      const initialUserLikeList = [];

      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          ...doc.data()
        };
        initialUserLikeList.push(data);
      });

      const likedPost = await initialUserLikeList.filter((likedUser) => {
        return likedUser.userId === user.id;
      });

      setUserLikeList(likedPost);

      const p = query(collection(db, 'PostStorage'));
      const postSnapshot = await getDocs(p);

      const initialPostStorage = [];

      postSnapshot.forEach((doc) => {
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

  const userLikeListPostId = userLikeList.map((obj) => obj.postId);
  const likedPostList = postStorage.filter((post) => userLikeListPostId.includes(post.id));

  return (
    <>
      <Grid>
        {likedPostList.map((post) => {
          const postClickHandler = () => {
            navigate(`/detail/${post.id}`);
          };
          return <Post key={post.id} title={post.title} image={post.imageLink} onClick={postClickHandler} />;
        })}
      </Grid>
    </>
  );
};

export default MyPageLike;

const Grid = styled.div`
  border-top: 1px solid var(--color_gray2);
  display: grid;
  grid-template-columns: repeat(4, minmax(200px, auto));
  grid-template-rows: repeat(auto-fill);
  grid-gap: 15px;
  justify-content: center;
  place-items: center;
  margin-bottom: 50px;
  padding-top: 50px;

  @media screen and (max-width: 1100px) {
    grid-template-columns: repeat(3, minmax(200px, auto));
  }
`;
