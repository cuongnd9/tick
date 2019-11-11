import axios, { ResponseType } from 'axios';

function login ({
  username,
  password
}: {
  username: string;
  password: string;
}) {
  return axios.post('https://petisland.herokuapp.com/api/account/login', {
    username,
    password
  })
}

export {
  login
}