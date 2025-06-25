import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PostsPage from './pages/PostsPage';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import CreatePost from './layouts/CreatePost/CreatePost';
import PostDetail from './layouts/PostDetail/PostDetail';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import UserPage from './pages/UserPage';
import PostEdit from './pages/PostEdit';
function App() {
  return (
    <>
      <Header />
      <div className="backgroundPage"></div>
      <main>
        <Routes>
          <Route path="/userpage" element={<UserPage />}></Route>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/:postId" element={<PostDetail />} />
          <Route path="/posts/:postId/edit" element={<PostEdit />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
