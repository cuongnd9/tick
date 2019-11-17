import request from '../helpers/request';

function login({ username, password }: { username: string; password: string }) {
  return request('api/account/login', {
    method: 'POST',
    body: {
      username,
      password
    }
  });
}

export { login };
