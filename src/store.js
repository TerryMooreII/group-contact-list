import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    groups: [],
    currentGroup: localStorage.getItem('default-group')
  },
  mutations: {
    setCurrentGroup({ commit }, group) {
      localStorage.setItem('default-group', group);
      commit('setCurrentGroup', group);
    },
    setAvailableGroups({ commit }, groups) {
      commit('setAvailableGroups', groups);
    }
  },
  actions: {
    setCurrentGroup(state, group) {
      state.currentGroup = group; // eslint-disable-line
    },
    setAvailableGroups(state, groups) {
      state.groups = groups; // eslint-disable-line
    }
  },
});
