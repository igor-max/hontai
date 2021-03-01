import axios from 'axios';

const url = '/api/user';

function getUserInfo(token) {
  return axios({
    method: 'get',
    url,
    params: {
      token
    }
  });
}

export {
  getUserInfo
};