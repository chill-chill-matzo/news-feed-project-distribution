import { TitleInput, ContentInput } from '../shared/Input';
import { BlueButton, GrayButton } from '../shared/Buttons';
import { styled } from 'styled-components';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';
import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage, auth } from '../firebase';

import { useNavigate } from 'react-router-dom';

const AddPost = () => {
  const users = useSelector((state) => state.users);
  const [user] = users;

  const [postStorage, setPostStorage] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const like = 0;
  const time = new Date().toLocaleString();
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'PostStorage'));
      const querySnapshot = await getDocs(q);

      const initialPostStorage = [];

      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
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

  const onChange = (event) => {
    const {
      target: { name, value }
    } = event;
    if (name === 'title') {
      setTitle(value);
    }
    if (name === 'content') {
      setContent(value);
    }
  };

  const handleFileSelect = (event) => {
    setImageFile(event.target.files[0]);

    const imagePreview = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(imagePreview);
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
  };

  const handleUpload = async () => {
    const imageRef = ref(storage, `${auth.currentUser.uid}/${imageFile.name}`);
    await uploadBytes(imageRef, imageFile);

    const downloadURL = await getDownloadURL(imageRef);
    if (downloadURL !== null) {
      return downloadURL;
    }
  };

  const addNewPost = async (event) => {
    event.preventDefault();

    const imageLink = await handleUpload();

    const collectionRef = collection(db, 'PostStorage');
    const newPost = { title, content, like, imageLink, time, user };

    await addDoc(collectionRef, newPost);

    setPostStorage((prev) => {
      return [...postStorage, newPost];
    });
    setTitle('');
    setContent('');
    navigate('/');
  };

  const navigate = useNavigate();

  return (
    <Div>
      <p>여러분의 맛집을 추천해주세요!</p>
      <Container>
        <TitleInput name="title" value={title} onChange={onChange} />
        <ContentInput name="content" value={content} onChange={onChange} />
        <View src={imagePreview ? imagePreview : null} />
        <ButtonsContainer>
          <BlueLabel htmlFor="file">파일 업로드</BlueLabel>
          <Input type="file" onChange={handleFileSelect} id="file" accept="image/*" />
          <div>
            <GrayButton
              onClick={() => {
                navigate('/');
              }}
            >
              취소
            </GrayButton>
            <BlueButton onClick={addNewPost}>등록</BlueButton>
          </div>
        </ButtonsContainer>
      </Container>
    </Div>
  );
};

export default AddPost;

const Div = styled.div`
  justify-content: center;
  align-items: center;
  min-height: 800px;
  margin-bottom: 40px;
  text-align: center;
  font-weight: 700;

  p {
    margin: 10px;
    font-size: x-large;
  }
`;

const Container = styled.form`
  width: 85%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid var(--color_gray1);
  border-radius: 15px;
`;

const ButtonsContainer = styled.div`
  justify-content: space-between;
  display: flex;
  margin-top: 30px;
`;

const View = styled.img`
  height: 150px;
`;

const BlueLabel = styled.label`
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
