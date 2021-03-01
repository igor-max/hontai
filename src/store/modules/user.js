import { login } from '@/api/login';
import { getUserInfo } from '@/api/user';
import { setToken, removeToken } from '@/utils/auth.js'

const state = {
  token: '',
  userInfo: '',
  roles: null
};

const mutations = {
  SET_TOKEN(state, { token }) {
    state.token = token;
  },
  SET_USER_INFO(state, payload) {
    state.userInfo = payload;
  },
  SET_ROLES(state, value) {
    state.roles = value;
  }
};

const actions = {
  // 获取 token 到 vuex 和 session 中
  async login({ commit }, payload) {
    const res = await login(payload),
      token = res.data.data.token;
    commit('SET_TOKEN', { token });
    setToken(token);
  },
  // 获取用户信息
  async getInfo({ commit }, { token }) {
    const res = await getUserInfo(token),
      userInfo = res.data.data;
    commit('SET_USER_INFO', userInfo);
    commit('SET_ROLES', userInfo.roles);
    return userInfo.roles;
  },
  resetToken({ commit }) {
    commit('SET_TOKEN', { token: '' });
    commit('SET_ROLES', null);
    removeToken();
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}