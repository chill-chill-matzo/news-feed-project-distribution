import { TitleInput, ContentInput } from '../shared/Input';
import { BlueButton } from '../shared/Buttons';
import { styled } from 'styled-components';

function AddPost() {
  return (
    <Div>
      <p>여러분의 맛집을 추천해주세요!</p>
      <Container>
        <TitleInput />
        <ContentInput />
        <View></View>
        <ButtonsContainer>
          <BlueButton>사진 선택</BlueButton>
          <div>
            <BlueButton>취소</BlueButton>
            <BlueButton>등록</BlueButton>
          </div>
        </ButtonsContainer>
      </Container>
    </Div>
  );
}

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
