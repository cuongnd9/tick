import request from 'src/helpers/request';

function getCategoryList() {
  return request('/api/category');
}

function createCategory(data) {
  return request('/api/category', {
    method: 'POST',
    body: data
  });
}

function updateCategory(data) {
  const { id, ...otherData } = data;
  return request(`/api/category/${id}`, {
    method: 'PUT',
    body: otherData
  });
}

function deleteCategory(id) {
  return request(`/api/category/${id}`, {
    method: 'DELETE'
  });
}

export { getCategoryList, createCategory, updateCategory, deleteCategory };
