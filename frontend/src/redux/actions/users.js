import axios from "../../api/axios"
const LOGIN_URL = 'user/loginWithJwt';
const loginUserWithJwt = async (jwt, dispatch) => {
  try {
    // dispatch('usersStart')
    console.log(jwt);
    const config = {
      headers: {
        Authorization: 'Bearer ' + jwt
      }
    }
    const {data} = await axios.post(LOGIN_URL, config)
    console.log(data);
    // dispatch('usersSuccess')
  } catch (error) {
    console.log(error);
    // dispatch('usersError', error.response.message.data)
  }
}

export {loginUserWithJwt}