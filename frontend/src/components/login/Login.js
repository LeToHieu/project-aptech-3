import "./Login.css";
import { useState, useContext } from 'react';
import AuthContext from "../../context/AuthProvider";
import axios from '../../api/axios';
import {toast} from 'react-toastify'
import { useLocation, Navigate, Link, useNavigate } from "react-router-dom";

const LOGIN_URL = 'users/login';


const Login = (props) => {
  const navigate = useNavigate();
  const loaction = useLocation();
  const from = loaction.state?.from?.pathname ?? "/";

  const { setAuth } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const LoadingToast = toast.loading("Please wait...");
    try{

      const response = await axios.post(LOGIN_URL,
        JSON.stringify({ email, password }),
        {
            headers: { 'Content-Type': 'application/json' },
        }
      );
      const accessToken = response?.data?.data?.token;
      const role = response?.data?.data?.role;
      const name = response?.data?.data?.name;
      toast.update(LoadingToast, { render: `${response?.data.message}`, type: "success", isLoading: false, autoClose: 5000,  closeOnClick: true });
      setAuth({name, email, password, role, accessToken });
      setEmail('');
      setPassword('');
      
      navigate(from, {replace: true});
    }catch(error){
      if(!error?.response){
        toast.update(LoadingToast, { render: "No server response", type: "error", isLoading: false, autoClose: 5000, closeOnClick: true });
      }else if(error?.response.data.message){
        toast.update(LoadingToast, { render: `${error?.response.data.message}`, type: "error", isLoading: false, autoClose: 5000, closeOnClick: true  });
      }else {
        toast.update(LoadingToast, { render: "Login fail!", type: "error", isLoading: false, autoClose: 5000, closeOnClick: true  });
      }
    }
  }
  return (
    <>
      <form action="#" className="loginInsideForm" ref={props.loginForm} onSubmit={handleSubmit}>
        <div className="field">
          <input 
            type="email" 
            placeholder="Email Address" 
            required  
            value={email}
            onChange={(e)=>setEmail(e.target.value)}  
          />
        </div>
        <div className="field">
          <input type="password"
                 placeholder="Password"
                required 
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
          />
        </div>
        <div className="pass-link">
          <div>Forgot password?</div>
        </div>
        <div className="field btn">
          <div className="btn-layer"></div>
          <input type="submit" value="Login" />
        </div>
        <div className="signup-link">
          Not a member? <span>Signup now</span>
        </div>
        
    </form>
    </>
  );
};
export default Login;
