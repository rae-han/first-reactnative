import axios from 'axios';

export const login = async (params) => {
  let { username, password } = params;

  try {
    let response = await axios({
      method: 'post',
      url: 'http://localhost:4000/api/auth/login',
      data: {
        username,
        password,
      }
    })

    return response;
  } catch (error) {
    console.log('API auth login error')
    // console.log(error.response)
    return error;
  }
}

export const signup = async (params) => {
  let { username, password } = params;

  try {
    let response = await axios({
      method: 'post',
      url: 'http://localhost:4000/api/auth/register',
      data: {
        username,
        password,
      }
    })

    return response;
  } catch (error) {
    console.log(error.response)
    return error;
  }
}