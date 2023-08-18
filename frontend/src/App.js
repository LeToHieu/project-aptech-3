import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import { Route, Routes, redirect, useNavigate } from "react-router-dom";

// User
import LoginIndex from "./components/login/index";
import ResetPassword from "./components/login/ResetPassword";
import RequireAuth from "./components/authorization/RequireAuth";
import { Cart } from "./components/userPage/index";
import Bill from "./components/Bills/Bills";

// User with retrics

// Admin
import Index from "./pages/Index";
import Home from "./components/Home/Home";
import Video from "./components/Video/Video";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Music from "./pages/Music";
import Album from "./components/Album/Album";
import "animate.css";

import Dashboard from "./components/admin/Dashboard/Dashboard";
import AdminIndex from "./components/admin/AdminIndex";
import GetUsers from "./components/admin/User/GetUsers";
import GetCate from "./components/admin/Categories/GetCate";
import GetArtists from "./components/admin/Artists/GetArtists";
import GetAlbums from "./components/admin/Albums/GetAlbums";
import { GetMedias, AddMedia } from "./components/admin/Medias/IndexMedias";
import { usersError, usersStart, usersSuccess } from "./redux/reducer/users";
import axios from "./api/axios";
import Bills from "./components/admin/Bills/Bills";
import Feedback from "./components/admin/Feedback/Feedback";
import News from "./components/News/News";
import { Navigate } from "react-router-dom";
function App() {
  const jwt = localStorage.getItem("jwt") ?? null;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector(state => state.user)
  console.log(user)
  useEffect(() => {
    const loginUserWithJwt = async () => {
      dispatch(usersStart());
      const config = {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      };
      try {
        const { data } = await axios.post("user/loginWithJwt", "", config);
        console.log(data);
        dispatch(usersSuccess(data.user));
      } catch (e) {
        console.log(e.message);
        dispatch(usersError(e.message));
      }
    };
    if (jwt) {
      loginUserWithJwt();
    }
  }, [jwt]);
  const ProtectedRoute = (props) => {
    console.log(props)
    if (parseInt(props.role) === 0) {
      navigate('/')
    } else {
      return props.children;
    }
  }
  return (
    <>
      <Routes>
        {/* public route */}
        <Route path="/" element={<Index />}>
          <Route index path="" element={<Home />} />
          <Route path="video/:id" element={<Video />} />
          <Route path="music" element={<Music />} />
          <Route path="album" element={<Album />}></Route>
          <Route path="cart" element={<Cart />} />
          <Route path="bill" element={<Bill />} />
          <Route path="news" element={<News/>}></Route>
        </Route>
        {/* <Route path='/music' element={<Music />}></Route> */}
        <Route path="/login" element={<LoginIndex />} />
        <Route path="/resetpassword" element={<ResetPassword />} />

        {/* protected route user */}
        {/* <Route element={<RequireAuth allowedRole={[0, 1]} />}>
          
        </Route> */}

        {/* protected route admin */}
        <Route
          path="admin"
          element={
            <ProtectedRoute 
              role={user?.role}
            >
              <AdminIndex></AdminIndex>
            </ProtectedRoute>
          }
        >
          <Route path="" element={<Dashboard />} />
          <Route path="users" element={<GetUsers />} />
          <Route path="categories" element={<GetCate />} />
          <Route path="artists" element={<GetArtists />} />
          <Route path="albums" element={<GetAlbums />} />

          <Route path="medias">
            <Route path="" element={<GetMedias />} />
            <Route path="addMedia" element={<AddMedia />} />
          </Route>
          <Route path="bill" element={<Bills />}></Route>
          <Route path="report" element={<Feedback />}></Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<div>Missing something</div>} />
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
