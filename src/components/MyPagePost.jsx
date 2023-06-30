import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Post from './Post';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

const MyPagePost = () => {
  const [myPostList, setMyPostList] = useState([]);
  const param = useParams();

  const navigate = useNavigate();

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

      const myPost = await initialPostStorage.filter((post) => {
        return post.user.id === param.id;
      });
      setMyPostList(myPost);
    };
    fetchData();
  }, [param]);

  return (
    <>
      <Grid>
        {myPostList.map((post) => {
          const postClickHandler = () => {
            navigate(`/detail/${post.id}`);
          };
          return <Post key={post.id} title={post.title} image={post.imageLink} onClick={postClickHandler} />;
        })}
      </Grid>
    </>
  );
};

export default MyPagePost;

const Grid = styled.div`
  border-top: 1px solid var(--color_gray2);
  display: grid;
  grid-template-columns: repeat(4, minmax(200px, auto));
  grid-template-rows: repeat(auto-fill);
  grid-gap: 15px;
  justify-content: center;
  place-items: center;
  align-items: start;
  margin-bottom: 50px;
  padding-top: 50px;
  min-height: 500px;

  @media screen and (max-width: 1100px) {
    grid-template-columns: repeat(3, minmax(200px, auto));
  }
`;
