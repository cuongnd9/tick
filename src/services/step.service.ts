import request from 'src/helpers/request';

function updateStepStatus({id, status}) {
  return request(`/api/step/${id}`, {
    method: 'PUT',
    body: {
      status
    }
  })
}

export { updateStepStatus }
