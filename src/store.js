import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    groups: [],
    currentGroup: JSON.parse(localStorage.getItem('default-group'))
  },
  actions: {
    setCurrentGroup({ commit }, group) {
      localStorage.setItem('default-group', JSON.stringify(group));
      commit('setCurrentGroup', group);
    },
    setAvailableGroups({ commit }, groups) {
      commit('setAvailableGroups', groups);
    }
  },
  mutations: {
    setCurrentGroup(state, group) {
      state.currentGroup = group; // eslint-disable-line
    },
    setAvailableGroups(state, groups) {
      state.groups = groups; // eslint-disable-line
    }
  },
});
