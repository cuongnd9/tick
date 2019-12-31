import { AsyncStorage } from 'react-native';
import Navigation from 'src/helpers/Navigation';
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
    const responseData = await response.json();
    const { message, statusCode, error } = responseData;
    if (statusCode === 401 &&  error === 'Unauthorized') {
      Navigation.navigate('Login');
    }
    const err: Error = new Error(message);
    throw err;
  }
}

function parseJSON(response: any): any {
  return response.json();
}

export default async function request(
  url: string = '',
  options: Options = {},
): Promise<any> {
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
