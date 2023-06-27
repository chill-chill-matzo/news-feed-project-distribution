import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
import Detail from '../pages/Detail';
import MyPage from '../pages/MyPage';
import Layout from './Layout';
import AddPost from '../pages/AddPost';

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="detail" element={<Detail />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="addpost" element={<AddPost />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
