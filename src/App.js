import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Register from './components/Register';
import myReducer from './reducer/UseReducer';
import { createContext, useReducer } from 'react';
export const UserContext = createContext()
function App() {
  const [user, dispatch] = useReducer(myReducer)
  return (
    <BrowserRouter>
      < UserContext.Provider value={[user, dispatch]} >
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/test' element={<test2 />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
