import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { BlueButton } from '../shared/Buttons';
import { useSelector } from 'react-redux';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';
import { useParams } from 'react-router-dom';

function DetailPost() {
  const users = useSelector((state) => state.users);
  const [user] = users;

  const params = useParams();

  const [postStorage, setPostStorage] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'PostStorage'));
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

  const selectedPost = postStorage.find((postItem) => {
    return postItem.id === params.id;
  });

  return (
    <>
      {selectedPost && (
        <>
          <DetailImage src={selectedPost.imageLink} alt="" />
          <DetailContainer>
            <h1>{selectedPost.title}</h1>
            <p>{selectedPost.content}</p>
            <RightDiv>작성자: {selectedPost.user.name}</RightDiv>
            <br />
            {user.id === selectedPost.user.id && (
              <ButtonSet>
                <BlueButton>수정</BlueButton>
                <BlueButton>삭제</BlueButton>
              </ButtonSet>
            )}
          </DetailContainer>
        </>
      )}
    </>
  );
}

export default DetailPost;

const DetailImage = styled.img`
  position: relative;
  width: 90%;
  margin: 30px auto;
`;

const DetailContainer = styled.div`
  width: 87%;
  min-height: 200px;
  margin: 20px auto 20px;

  h1 {
    font-size: 25px;
    font-weight: bold;
  }

  p {
    margin-top: 15px;
    font-size: 17px;
  }
`;

const ButtonSet = styled.div`
  display: flex;
  justify-content: right;
`;

const RightDiv = styled.div`
  display: flex;
  justify-content: right;
  margin: 5px;
`;
