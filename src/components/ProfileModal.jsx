import { createPortal } from 'react-dom';
import { styled } from 'styled-components';
import '../color.css';
import { GrayButton } from '../shared/Buttons';
import { useState } from 'react';
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';

export const PORTAL_MODAL = 'portal-root';

const ProfileModal = ({ isModalOpen, setIsModalOpen, user }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const time = new Date().toString();

  const handleFileSelect = (event) => {
    setProfileImage(event.target.files[0]);

    if (profileImage === 0) {
      return;
    } else {
      const imagePreview = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(imagePreview);
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
    }
  };

  const handleUpload = async () => {
    try {
      const imageRef = ref(storage, `${user.id}-profile/${profileImage.name}`);
      await uploadBytes(imageRef, profileImage);
      const downloadURL = await getDownloadURL(imageRef);
      if (downloadURL !== null) {
        return downloadURL;
      }
    } catch (error) {
      alert('프로필 사진을 추가해주세요!');
    }
  };

  const updateProfileImage = async (event) => {
    event.preventDefault();

    const photoURL = await handleUpload();
    const collectionRef = collection(db, 'ProfileStorage');
    const newProfile = { user, photoURL, time };
    try {
      await addDoc(collectionRef, newProfile);
      window.location.reload();
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('프로필 사진 등록 에러', errorCode, errorMessage);
    }
    setIsModalOpen(false);
  };

  const closeHandler = () => {
    setIsModalOpen(false);
  };

  return isModalOpen
    ? createPortal(
        <Outer>
          <Inner>
            <p>업데이트 할 프로필 사진을 선택해주세요!</p>
            <Label htmlFor="file">파일 업로드</Label>
            <Input type="file" onChange={handleFileSelect} id="file" accept="image/*" />
            <View src={imagePreview || undefined} alt="" />
            <StButtonSet>
              <GrayButton onClick={updateProfileImage}>등록</GrayButton>
              <GrayButton onClick={closeHandler}>닫기</GrayButton>
            </StButtonSet>
          </Inner>
        </Outer>,
        document.getElementById(PORTAL_MODAL)
      )
    : null;
};

export default ProfileModal;

const Outer = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;

  padding: 100px;

  background-color: var(--color_white1);

  border-radius: 10px;

  p {
    font-size: larger;
  }
`;

const StButtonSet = styled.div`
  display: flex;
`;

const View = styled.img`
  height: 150px;
`;

const Label = styled.label`
  align-items: center;
  margin: 5px;
  padding: 10px 15px;
  background-color: var(--color_blue2);
  color: var(--color_white1);
  border: none;
  border-radius: 12px;
  font-size: small;
  font-weight: 700;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: var(--color_blue1);
  }
`;

const Input = styled.input`
  display: none;
`;
