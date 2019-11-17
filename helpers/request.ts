import config from '../config';

interface Options {
  method?: string;
  headers?: any;
  body?: any;
}

function checkStatus(response: any): any {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error: any = new Error(response.statusText);
    error.response = response;
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
