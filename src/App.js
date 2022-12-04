import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Register from './components/Register';
import myReducer from './reducer/UseReducer';
import { createContext, useReducer } from 'react';
import Detail from './components/Detail';
import Post from './components/Post';
import MyPost from './components/MyPost';
import Update from './components/Update';
import Categories from './components/Categories';
import Admin from './components/admin';
export const UserContext = createContext()
function App() {
  const [user, dispatch] = useReducer(myReducer)
  return (
    <BrowserRouter>
      < UserContext.Provider value={[user, dispatch]} >
        <Routes>
          <Route path='/homepage' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/posts/detail/:postId' element={<Detail />} />
          <Route path='/post' element={<Post />} />
          <Route path='/my-post' element={<MyPost />} />
          <Route path='/posts/update/:postId' element={<Update />} />
          <Route path='/categories/:categoryId/posts' element={<Categories />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
