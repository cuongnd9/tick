import request from 'src/helpers/request';

function uploadImage(formData: FormData) {
  return request(
    '/api/image',
    {
      method: 'POST',
      body: formData,
      isFormData: true
    },
  );
}
export { uploadImage };
