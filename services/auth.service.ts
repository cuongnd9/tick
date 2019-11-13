function login({ username, password }: { username: string; password: string }) {
  return fetch('https://petisland.herokuapp.com/api/account/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  });
}

export { login };
