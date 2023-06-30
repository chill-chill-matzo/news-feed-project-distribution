import React, { useEffect, useState } from 'react';
import { ContentInput, TitleInput } from '../shared/Input';
import { BlueButton, GrayButton } from '../shared/Buttons';
import { styled } from 'styled-components';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../firebase';
import { collection, doc, getDocs, query, updateDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { modifyPost } from '../redux/modules/post';

function UpdatePost() {
  const post = useSelector((state) => state.post);
  const postItem = post[post.length - 1];

  const [postStorage, setPostStorage] = useState([]);
  const [updateTitle, setUpdateTitle] = useState(postItem.title);
  const [updateContent, setUpdateContent] = useState(postItem.content);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const params = useParams();

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

  const onChange = (event) => {
    const {
      target: { name, value }
    } = event;
    if (name === 'updateTitle') {
      setUpdateTitle(value);
    }
    if (name === 'updateContent') {
      setUpdateContent(value);
    }
  };

  const handleFileSelect = (event) => {
    setImageFile(event.target.files[0]);

    if (imageFile === 0) {
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
    const imageRef = ref(storage, `${auth.currentUser.uid}/${imageFile.name}`);
    await uploadBytes(imageRef, imageFile);

    const downloadURL = await getDownloadURL(imageRef);
    if (downloadURL !== null) {
      return downloadURL;
    }
  };

  const dispatch = useDispatch();

  const updatePost = async (event) => {
    event.preventDefault();
    let updateImageLink = selectedPost.imageLink;

    if (imageFile !== null) {
      updateImageLink = await handleUpload();

      const postRef = doc(db, 'PostStorage', selectedPost.id);
      await updateDoc(postRef, {
        ...selectedPost,
        title: updateTitle,
        content: updateContent,
        imageLink: updateImageLink
      });
    } else {
      const postRef = doc(db, 'PostStorage', selectedPost.id);
      if(updateTitle === "" && updateContent == ""){
        alert("제목과 내용을 입력해주세요! ")
        return;
     } else if(updateTitle === ""){
        alert("제목을 입력해주세요!")
        return;
    } else if(updateContent === ""){
      alert("내용을 입력해주세요!")
      return;
    } else {
      await updateDoc(postRef, {
        ...selectedPost,
        title: updateTitle,
        content: updateContent
      });
    }
    }

    dispatch(
      modifyPost({
        title: updateTitle,
        content: updateContent
      })
    );

    navigate(`/detail/${selectedPost.id}`);
  };

  const navigate = useNavigate();

  return (
    <>
      {selectedPost && (
        <Div>
          <p>수정하세요</p>
          <Container>
            <TitleInput name="updateTitle" value={updateTitle} onChange={onChange} />
            <ContentInput name="updateContent" value={updateContent} onChange={onChange} />
            <div>
              <View src={imagePreview ? imagePreview : selectedPost.imageLink} alt="" />
            </div>
            <ButtonsContainer>
              <BlueLabel htmlFor="file">파일 업로드</BlueLabel>
              <Input type="file" onChange={handleFileSelect} id="file" accept="image/*" />
              <div>
                <GrayButton
                  onClick={() => {
                    navigate(`/detail/${selectedPost.id}`);
                  }}
                >
                  취소
                </GrayButton>
                <BlueButton onClick={updatePost}>수정</BlueButton>
              </div>
            </ButtonsContainer>
          </Container>
        </Div>
      )}
    </>
  );
}

export default UpdatePost;

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
  height: 300px;
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
