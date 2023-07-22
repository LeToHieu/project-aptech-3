import axios from "../../api/axios"
import { usersError } from "../reducer/users";
const LOGIN_URL = 'user/loginWithJwt';
const loginUserWithJwt = async (jwt, dispatch) => {
  try {
    dispatch('usersStart')
    console.log(jwt);
    const config = {
      headers: {
        Authorization: 'Bearer ' + jwt
      }
    }
    console.log(config.headers);

    const {data} = await axios.post(LOGIN_URL, "", {
        headers: {
          Authorization: 'Bearer ' + jwt,
        }
      },
      )
    // const {data} = await axios.get('/artistAlbum', {
    //   headers: 
    //     {
    //       "Content-Type": "application/json",
    //     }
    // }) 
      
    console.log(data);
    let json = JSON.parse(data.json)
    console.log(json);
    // dispatch('usersSuccess')
  } catch (error) {
    console.log(error);
    dispatch(usersError(),)
  }
}

export {loginUserWithJwt}