import request from 'src/helpers/request';

function getCategoryList() {
  return request('/api/category');
}

export { getCategoryList };
