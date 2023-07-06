import './Login.css'
import {useRef} from 'react';
import Login from './Login';
import SignUp from './SignUp';


const Index = () =>{
    const loginForm = useRef();
    const loginText = useRef();

    const signupBtn = ()=>{
        loginForm.current.style.marginLeft = "-33.333333333333%";
        loginText.current.style.marginLeft = "-50%";
    }

    const signupNextBtn = ()=>{
        loginForm.current.style.marginLeft = "-66.6666666666666%";
        loginText.current.style.marginLeft = "-50%";
    }

    const signupBackBtn = ()=>{
        loginForm.current.style.marginLeft = "-33.333333333333%";
        loginText.current.style.marginLeft = "-50%";
    }
    
    const loginBtn = ()=>{
        loginForm.current.style.marginLeft = "0%";
        loginText.current.style.marginLeft = "0%";
    }

    return(
        <div id="LoginStyle">
            <div className="wrapper">
                <div className="title-text">
                    <div className="title login" ref={loginText}>
                    Login Form
                    </div>
                    <div className="title signup">
                    Signup Form
                    </div>
                </div>
                <div className="form-container">
                    <div className="slide-controls">
                    <input type="radio" name="slide" id="login" onClick={()=>loginBtn()} />
                    <input type="radio" name="slide" id="signup" onClick={()=>signupBtn()}/>
                    <label htmlFor="login" className="slide login">Login</label>
                    <label htmlFor="signup" className="slide signup">Signup</label>
                    <div className="slider-tab"></div>
                    </div>
                    <div className="form-inner">
                    <Login loginForm={loginForm}/>
                    <SignUp signupNextBtn={signupNextBtn} signupBackBtn={signupBackBtn} loginBtn={loginBtn}/>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Index