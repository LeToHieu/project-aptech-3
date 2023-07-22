import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import {ToastContainer} from 'react-toastify';
import { Route, Routes} from 'react-router-dom';


// User
import LoginIndex from './components/login/index';
import ResetPassword from './components/login/ResetPassword';
import RequireAuth from './components/authorization/RequireAuth';
import {
  Cart
} from './components/userPage/index'

// User with retrics


// Admin
import Admin from './components/admin/admin'
import Index from './pages/Index';
import Home from './components/Home/Home';
import Video from './components/Video/Video';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { loginUserWithJwt } from './redux/actions/users';
import Music from './pages/Music';
import 'animate.css';


function App() {
  const jwt = localStorage.getItem('jwt') ?? null
  const dispatch = useDispatch()
  useEffect(() => {
    if (jwt) {
      loginUserWithJwt(jwt, dispatch)
    }
  }, [])
  return (
    <>
    <Routes>
      {/* public route */}
      <Route path='/' element={<Index/>}>
        <Route index path='' element={<Home />} />
        <Route path='video/:id' element={<Video />} />
        <Route path='music' element={<Music />} />
      </Route>
      {/* <Route path='/music' element={<Music />}></Route> */}
      <Route path='/login' element={<LoginIndex/>}/>
      <Route path='/resetpassword' element={<ResetPassword/>}/>

      {/* protected route user */}
      <Route element={<RequireAuth allowedRole={[0, 1]}/>}>
        <Route path='/cart' element={<Cart/>}/>
      </Route>

      {/* protected route admin */}
      <Route element={<RequireAuth allowedRole={[1]}/>}>
        <Route path='/admin' element={<Admin/>}/>
      </Route>

      {/* catch all */}
      <Route path='*' element={<div>Missing something</div>}/>
    </Routes>



    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
    </>
  );
}

export default App;
