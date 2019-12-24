import request from 'src/helpers/request';

function login({ username, password }: { username: string; password: string }) {
  return request('/api/account/login', {
    method: 'POST',
    body: {
      username,
      password
    }
  });
}

function requireCode(email: string) {
  return request(`/api/account/require-code?email=${email}`);
}

function checkCode({ email, code }: { email: string; code: string }) {
  return request(`/api/account/check-code?email=${email}&code=${code}`);
}

function register({
  email,
  code,
  username,
  password
}: {
  email: string;
  code: string;
  username: string;
  password: string;
}) {
  return request(`/api/account/register?email=${email}&code=${code}`, {
    method: 'POST',
    body: {
      username,
      password
    }
  });
}

export { login, requireCode, checkCode, register };
