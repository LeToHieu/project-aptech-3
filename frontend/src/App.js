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
import Admin from './components/admin/admin';
import AdminIndex from './components/admin/AdminIndex';
import GetUsers from './components/admin/User/GetUsers';
import GetCate from './components/admin/Categories/GetCate';
import GetArtists from './components/admin/Artists/GetArtists';
import GetAlbums from './components/admin/Albums/GetAlbums';
import {GetMedias, AddMedia} from './components/admin/Medias/IndexMedias';

//Video
import Index from './pages/Index';
import Home from './components/Home/Home';
import Video from './components/Video/Video';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { loginUserWithJwt } from './redux/actions/users';

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
      </Route>
      <Route path='/login' element={<LoginIndex/>}/>
      <Route path='/resetpassword' element={<ResetPassword/>}/>

      {/* protected route user */}
      <Route element={<RequireAuth allowedRole={[0, 1]}/>}>
        <Route path='/cart' element={<Cart/>}/>
      </Route>

      {/* protected route admin */}
      <Route path='admin' element={<>{/*<RequireAuth allowedRole={[1]}/>*/} <AdminIndex/></>}>
        <Route path='' element={<Admin/>}/>
        <Route path='users' element={<GetUsers/>}/>
        <Route path='categories' element={<GetCate/>}/>
        <Route path='artists' element={<GetArtists/>}/>
        <Route path='albums' element={<GetAlbums/>}/>

        <Route path='medias'>
          <Route path='' element={<GetMedias/>}/>
          <Route path='addMedia' element={<AddMedia/>}/>
        </Route>
        
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
