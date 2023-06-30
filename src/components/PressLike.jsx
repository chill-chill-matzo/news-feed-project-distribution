import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { TextButton } from '../shared/Buttons';
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { IconCherry, IconCherryFalse } from '../shared/IconCherry';

function PressLike({ postStorage, user, params }) {
  const [userLikeList, setUserLikeList] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (postStorage.length > 0) {
      const post = postStorage.find((postItem) => postItem.id === params.id);
      setSelectedPost(post);

      const postRef = doc(db, 'PostStorage', post.id);
      const unsubscribe = onSnapshot(postRef, (doc) => {
        setSelectedPost({
          id: doc.id,
          ...doc.data()
        });
      });
      return () => {
        unsubscribe();
      };
    }
  }, [postStorage, params.id]);

  const updateLikeCount = async (postId, newCount) => {
    const postRef = doc(db, 'PostStorage', postId);

    try {
      await updateDoc(postRef, { like: newCount });
    } catch (error) {
      console.error('좋아요 수 업데이트에 실패했습니다:', error);
    }
  };

  const toggleLike = async (event) => {
    event.preventDefault();

    if (!userLikeList) {
      return; // userLikeList가 초기화되지 않은 경우 종료
    }

    if (selectedPost) {
      if (liked) {
        const updatedCount = Math.max(selectedPost.like - 1, 0);
        updateLikeCount(selectedPost.id, updatedCount);
        setLiked(false);

        const likeIndex = userLikeList.findIndex((likeItem) => likeItem.postId === params.id);

        if (likeIndex !== -1) {
          const deletedLikeItem = userLikeList[likeIndex];
          const likeRef = doc(db, 'UserLikeList', deletedLikeItem.id);
          await deleteDoc(likeRef);

          const updatedUserLikeList = [...userLikeList];
          updatedUserLikeList.splice(likeIndex, 1);
          setUserLikeList(updatedUserLikeList);
        }
      } else {
        const updatedCount = selectedPost.like + 1;
        updateLikeCount(selectedPost.id, updatedCount);
        setLiked(true);

        const userId = user.id;
        const postId = selectedPost.id;

        const collectionRef = collection(db, 'UserLikeList');
        const newPost = { userId, postId };

        const docRef = await addDoc(collectionRef, newPost);

        setUserLikeList((prev) => {
          return [...prev, { id: docRef.id, ...newPost }];
        });
      }
    }
  };

  return (
    <>
      {selectedPost && (
        <LikeDiv>
          <LikeButton onClick={toggleLike}>{liked ? <IconCherry /> : <IconCherryFalse />}</LikeButton>
          <LikeCount>{selectedPost.like}</LikeCount>
        </LikeDiv>
      )}
    </>
  );
}

export default PressLike;

const LikeDiv = styled.div`
  display: flex;
  align-items: center;
`;

const LikeCount = styled.p`
  font-weight: 500;
`;

const LikeButton = styled(TextButton)`
  :hover {
    opacity: 0.8;
    transition: all 0.5s ease;
  }
`;
