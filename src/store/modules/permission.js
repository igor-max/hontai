
import { constantRoutes, asyncRoutes } from '@/router';

const hasRoles = (roles, routes) => {
  // route没有则meta表示不需要权限，有则判断权限是否满足
  // 有一个children的route应该写在parent上
  if (routes.meta && routes.meta.roles && routes.meta.roles.length) {
    return routes.meta.roles.some(role => roles.includes(role));
  }
  return true;
};

const getRolesRoutes = (roles, asyncRoutes) => {
  const routes = [];
  asyncRoutes.forEach(route => {
    if (hasRoles(roles, route)) {
      const childRoutes = route.children;
      if (childRoutes && childRoutes.length) {
        route.children = getRolesRoutes(roles, childRoutes)
      }
      routes.push(route);
    }
  });
  return routes;
};

const state = {
  addRoutes: null,  // async roles routes
  routes: null  // all roles routes
};

const mutations = {
  GENERATE_ROUTES(state, routes) {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  }
};

const actions = {
  generateRoutes({ commit }, roles) {
    let routes = roles.includes('admin')
      ? asyncRoutes
      : getRolesRoutes(roles, asyncRoutes);
    commit('GENERATE_ROUTES', routes);
    return routes;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};