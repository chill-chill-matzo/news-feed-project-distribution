import { TitleInput, ContentInput } from '../shared/Input';
import { BlueButton } from '../shared/Buttons';
import { styled } from 'styled-components';
import { addDoc, collection, getDocs, query, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';

const AddPost = () => {
  const [postStorage, setPostStorage] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [like, setLike] = useState(0);
  const [image, setImage] = useState('');
  const [user, setUser] = useState('');
  const [time, setTime] = useState('');

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
        console.log(data);
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

  const addNewPost = async (event) => {
    event.preventDefault();

    // setTime
    // setUser

    const collectionRef = collection(db, 'PostStorage');
    const newPost = { title, content, like, image, time, user };

    await addDoc(collectionRef, newPost);

    setPostStorage((prev) => {
      return [...postStorage, newPost];
    });
    setTitle('');
    setContent('');
  };

  return (
    <Div>
      <p>여러분의 맛집을 추천해주세요!</p>
      <Container>
        <TitleInput name="title" value={title} onChange={onChange} />
        <ContentInput name="content" value={content} onChange={onChange} />
        <View></View>
        <ButtonsContainer>
          <BlueButton>사진 선택</BlueButton>
          <div>
            <BackButton />
            <BlueButton>취소</BlueButton>
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

const View = styled.div`
  height: 150px;
`;
