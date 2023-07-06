import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import {toast} from 'react-toastify'
import axios from '../../api/axios';

const REGISTER_URL = 'users/register';


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PHONE_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
// const REGISTER_URL = '/register';

const SignUp = (props) => {


  const [name, setName] = useState('');
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [validPhoneNumber, setValidPhoneNumber] = useState(false);

  const [address, setAddress] = useState('');
  const [homeAddressFocus, setAddressFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  // const [success, setSuccess] = useState(false);

  useEffect(() => {
      setValidName(USER_REGEX.test(name));
  }, [name])

    useEffect(() => {
      setValidEmail(EMAIL_REGEX.test(email));
  }, [email])

  useEffect(() => {
    setValidPhoneNumber(PHONE_REGEX.test(phoneNumber));
  }, [phoneNumber])

  useEffect(() => {
      setValidPassword(PWD_REGEX.test(password));
      setValidMatch(password === matchPwd);
  }, [password, matchPwd])


  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = USER_REGEX.test(name);
    const v2 = PWD_REGEX.test(password);
    const v3 = EMAIL_REGEX.test(email);
    const v4 = PHONE_REGEX.test(phoneNumber);
    console.log(v1, v2, v3, v4);
    if (!v1 || !v2 || !v3 || !v4) {
      toast.warn('Invalid Entry')
        return;
    }
    const LoadingToast = toast.loading("Please wait...");

    setName(''); setAddress(''); setPassword(''); setPhoneNumber(''); setEmail(''); setMatchPwd('');

    try {
      const response = await axios.post(REGISTER_URL,
         JSON.stringify({name, phoneNumber,  email, password, address}),
        {
            headers: { 'Content-Type': 'application/json' },
            
        }
      );
      console.log(response?.data);
      toast.update(LoadingToast, { render: "Registration successfully", type: "success", isLoading: false, autoClose: 5000,  closeOnClick: true });
      props.loginBtn();
    } catch (error) {
      if(!error?.response){
        toast.update(LoadingToast, { render: "No server response", type: "error", isLoading: false, autoClose: 5000, closeOnClick: true });
      }else if(error?.response.data.message){
        toast.update(LoadingToast, { render: `${error?.response.data.message}`, type: "error", isLoading: false, autoClose: 5000, closeOnClick: true  });
      }else {
        toast.update(LoadingToast, { render: "Registration fail!", type: "error", isLoading: false, autoClose: 5000, closeOnClick: true  });
      }
    }
  }


  return (
    <form style={{width: "66.66666666667%", display: "flex"}} onSubmit={handleSubmit}>
      <div className="loginInsideForm" style={{width: "100%"}}>
      <div className="field">
        <input type="text"
              placeholder="User Name" 
              required 
              aria-describedby='uidnote'
              onChange={(e) => setName(e.target.value)}
              aria-invalid={validName ? "false" : "true"}
              value={name}
              onFocus={() => setNameFocus(true)}
              onBlur={() => setNameFocus(false)}
        />
        <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "offscreen"} />
        <FontAwesomeIcon icon={faTimes} className={validName || !name ? "offscreen" : "invalid"} />
      </div>
      <p id='uidnote' className={nameFocus && name && !validName ? "instructions" : "offscreen"}>
        <FontAwesomeIcon icon={faInfoCircle}/> 4 to 24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed.
      </p>
      <div className="field">
        <input type="email"
              placeholder="Email Address"
              required
              value={email}
              aria-describedby='uidemail'
              onChange={(e)=> setEmail(e.target.value)}
        />
        <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "offscreen"} />
        <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "offscreen" : "invalid"} />
      </div>
      <div className="field">
        <input type="text"
               placeholder="Phone Number" 
               required 
               value={phoneNumber}
               aria-describedby='uidephone'
               onChange={(e)=> setPhoneNumber(e.target.value)}
        />
        <FontAwesomeIcon icon={faCheck} className={validPhoneNumber ? "valid" : "offscreen"} />
        <FontAwesomeIcon icon={faTimes} className={validPhoneNumber || !phoneNumber ? "offscreen" : "invalid"} />
      </div>
      
      <div className="field btn">
        <div className="btn-layer"></div>
        <input type="button" value="Next" onClick={props.signupNextBtn}/>
      </div>
    
    </div>

    <div className="loginInsideForm" style={{width: "100%"}}>
      <p style={{color: "#a445b2",cursor: "pointer"}}  onClick={props.signupBackBtn}>Back</p>

      <div className="field" style={{marginTop: "0.1rem"}} >
        <input  type="text"
                placeholder="Home Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onFocus={() => setAddressFocus(true)}
                onBlur={() => setAddressFocus(false)}
        />
        <FontAwesomeIcon icon={faCheck} className={ address ? "valid" : "offscreen"} />
        <FontAwesomeIcon icon={faTimes} className={ !!address || homeAddressFocus !== true  ? "offscreen" : "invalid"} />
      </div>

      <div className="field">
        <input  
          type="password"
          placeholder="Password"
          required
          aria-describedby="pwdnote"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          aria-invalid={validPassword ? "false" : "true"}
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
        />
        <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "offscreen"} />
        <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "offscreen" : "invalid"} />
      </div>

      <div id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
      <FontAwesomeIcon icon={faInfoCircle} /> 8 to 24 characters. Must include uppercase and lowercase letters, a number and a special character. Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
      </div>


      <div className="field">
        <input 
            type="password" 
            placeholder="Confirm Password" 
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            required 
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
        />
        <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "offscreen"} />
        <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "offscreen" : "invalid"} />
      </div>
      <div id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
        <FontAwesomeIcon icon={faInfoCircle}/> Must match the first password input field.
      </div>
      <div className="field btn">
        <div className="btn-layer"></div>
        <input type="submit" value="Signup" />
      </div>
    
    </div>
    </form>
    
  );
};
export default SignUp;
