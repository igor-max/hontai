
import axios from 'axios';

const url = '/api/login';

function login(data) {
  return axios({
    url,
    method: 'post',
    data,
  });
}

function logout() { }

export {
  login,
  logout
};