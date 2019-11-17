import config from '../config';

interface Options {
  method?: string;
  headers?: any;
  body?: any;
}

async function checkStatus(response: any): Promise<any> {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error: Error = new Error((await response.json()).message);
    throw error;
  }
}

function parseJSON(response: any): any {
  return response.json();
}

export default function request(
  url: string = '',
  options: Options = {}
): Promise<Response> {
  const { method = 'GET', headers, body = {} } = options;
  return fetch(`${config.domain}/${url}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify(body)
  })
    .then(checkStatus)
    .then(parseJSON);
}
