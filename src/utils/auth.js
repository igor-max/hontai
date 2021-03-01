
const tokenKey = 'di_yue_token';

function getToken() {
  return sessionStorage.getItem(tokenKey);
}

function setToken(value) {
  sessionStorage.setItem(tokenKey, value);
}

function removeToken(value) {
  sessionStorage.removeItem(tokenKey);
}

export {
  getToken,
  setToken,
  removeToken
};