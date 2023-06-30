import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
import Detail from '../pages/Detail';
import MyPage from '../pages/MyPage';
import Layout from './Layout';
import AddPost from '../pages/AddPost';
import UpdatePost from '../components/UpdatePost';

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="mypage/:id" element={<MyPage />} />
          <Route path="addpost" element={<AddPost />} />
          <Route path="updatepost/:id" element={<UpdatePost />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
