import request from 'src/helpers/request';

function createTask(data) {
  return request('/api/task', {
    method: 'POST',
    body: data
  })
}

export {
  createTask
}
