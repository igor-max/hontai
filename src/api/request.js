
import axios from 'axios';
import qs from 'qs';


const urlConfig = {
  USER: '/api/user',
  FORM: '/api/form',
  MESSAGE: '/api/message',
  LOGIN: '/api/login'
}

// table user request
function user(type, data) {
  switch (type) {
    case 'GET':
      return axios(urlConfig.USER);
    case 'POST':
      return axios.post(urlConfig.USER, data);
    case 'PUT':
      return axios.put(urlConfig.USER + '/' + data.id, data);
    case 'DELETE':
      return axios.delete(urlConfig.USER, {
        data: {
          idArr: data.idArr
        }
      });
    default:
      break;
  }
};

// tab message request
function message(type, data) {
  switch (type) {
    case 'GET':
      return axios.get(urlConfig.MESSAGE);
    case 'DELETE':
      return axios.delete(urlConfig.MESSAGE, { data });
    default:
      break;
  }
}

// form submit request
function formSubmit(data) {
  return axios.post(urlConfig.FORM, qs.stringify(data));
}

function login(type, data) {
  switch (type) {
    case 'GET':
      return axios.get(urlConfig.LOGIN + '?token=' + data);
    case 'POST':
      return axios.post(urlConfig.LOGIN, data);
    default:
      break;
  }
};

function logout() {
  sessionStorage.removeItem('token');
}

export {
  user,
  message,
  formSubmit,
  login,
  logout
};