import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    groups: [],
    currentGroup: null
  },
  mutations: {
    setCurrentGroup({ commit }, group) {
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
