import { AsyncStorage } from 'react-native';
import config from 'src/config';

interface Options {
  method?: string;
  headers?: any;
  body?: any;
  isFormData?: boolean;
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

export default async function request(
  url: string = '',
  options: Options = {},
): Promise<Response> {
  const { method = 'GET', headers, body, isFormData = false } = options;
  const token = await AsyncStorage.getItem('x-access-token');
  const internalHeaders = isFormData
    ? {
        ...headers,
        Accept: 'application/json',
        'x-access-token': token
      }
    : {
        ...headers,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token
      };
  return fetch(`${config.domain}${url}`, {
    method,
    headers: {
      ...internalHeaders
    },
    body: isFormData ? body : JSON.stringify(body)
  })
    .then(checkStatus)
    .then(parseJSON);
}
