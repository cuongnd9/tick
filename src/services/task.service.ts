import request from 'src/helpers/request';

function getTaskList() {
  return request('/api/task');
}

function createTask(data) {
  return request('/api/task', {
    method: 'POST',
    body: data
  });
}

export { getTaskList, createTask };
