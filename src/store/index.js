import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user';
import settings from './modules/settings';
import app from './modules/app';

import permission from './modules/permission';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    permission,
    settings,
    app
  }
})
