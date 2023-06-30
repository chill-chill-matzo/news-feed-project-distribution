import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { TextButton } from '../shared/Buttons';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { IconCherry, IconCherryFalse } from '../shared/IconCherry';

function PressLike({ postStorage, params }) {
  const [selectedPost, setSelectedPost] = useState(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (postStorage.length > 0) {
      const post = postStorage.find((postItem) => postItem.id === params.id);
      setSelectedPost(post);

      // 실시간으로 좋아요 수 업데이트를 위해 스냅샷 리스너 등록
      const postRef = doc(db, 'PostStorage', post.id);
      const unsubscribe = onSnapshot(postRef, (doc) => {
        setSelectedPost({
          id: doc.id,
          ...doc.data()
        });
      });
      return () => {
        unsubscribe(); // 컴포넌트 언마운트 시에 스냅샷 리스너 해제
      };
    }
  }, [postStorage, params.id]);

  // 좋아요 수 업데이트 함수
  const updateLikeCount = async (postId, newCount) => {
    const postRef = doc(db, 'PostStorage', postId);

    try {
      await updateDoc(postRef, { like: newCount });
      console.log('좋아요 수가 업데이트되었습니다.');
    } catch (error) {
      console.error('좋아요 수 업데이트에 실패했습니다:', error);
    }
  };
  // 좋아요 버튼 토글 처리
  const toggleLike = () => {
    if (selectedPost) {
      if (liked) {
        const updatedCount = Math.max(selectedPost.like - 1, 0);
        updateLikeCount(selectedPost.id, updatedCount);
        setLiked(false);
      } else {
        const updatedCount = selectedPost.like + 1;
        updateLikeCount(selectedPost.id, updatedCount);
        setLiked(true);
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
