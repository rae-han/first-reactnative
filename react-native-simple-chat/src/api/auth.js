import axios from 'axios';

export const login = async () => {
  try {
    let response = await axios({
      method: 'post',
      url: 'http://localhost:4000/api/auth/login',
      data: {
        username: 'asdf',
        password: 'asd'
      }
    })

    return response;
  } catch (error) {
    console.log(error)
    return error;
  }
}