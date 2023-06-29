import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { BlueButton } from '../shared/Buttons';
import { useDispatch, useSelector } from 'react-redux';
import { collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { modifyPost } from '../redux/modules/post';

function DetailPost() {
  const users = useSelector((state) => state.users);
  const [user] = users;

  const params = useParams();

  const [postStorage, setPostStorage] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const deletePost = async (event) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const postRef = doc(db, 'PostStorage', selectedPost.id);
      await deleteDoc(postRef);
      alert('삭제되었습니다.');
      navigate('/');
    }
    return;
  };

  const updateButtonClickHandler = () => {
    dispatch(
      modifyPost({
        title: selectedPost.title,
        content: selectedPost.content
      })
    );

    navigate(`/updatepost/${selectedPost.id}`);
  };

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
                <BlueButton onClick={updateButtonClickHandler}>수정</BlueButton>
                <BlueButton onClick={deletePost}>삭제</BlueButton>
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
