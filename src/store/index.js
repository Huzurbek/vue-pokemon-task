import { createStore } from "vuex";
import axios from "axios";

import { Axios } from "@/utils/axios";
export default createStore({
  state: {
    isLoading: false,
    pokemonLists: {},
    activePokemon: {},
  },
  getters: {
    getPokemonLists: (state) => {
      return state.pokemonLists;
    },
    getActivePokemon: (state) => {
      return state.activePokemon;
    },
  },
  mutations: {
    setPokemonLists(state, payload) {
      state.pokemonLists = payload.data;
    },
    setActivePokemon(state, payload) {
      state.activePokemon = payload.data;
    },
    clearActivePokemon(state) {
      state.activePokemon = {};
    },
  },
  actions: {
    async getPokemons({ commit, state }, data) {
      try {
        state.isLoading = true;
        const response = await Axios.get(
          `/pokemon?limit=${data.countNumber}&offset=${data.pageNumber}`
        );
        commit("setPokemonLists", response);
        state.isLoading = false;
      } catch (err) {
        console.log(err);
      }
    },
    async getPokemanByURL({ commit, state }, payload) {
      try {
        state.isLoading = true;
        const response = await axios.get(`${payload.pokemonUrl}`);
        commit("setActivePokemon", response);
        state.isLoading = false;
      } catch (err) {
        console.log(err);
      }
    },
  },
  modules: {},
});
