import axios from "axios";
export const Axios = new axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});
// https://pokeapi.co/api/v2/pokemon?limit=20&offset=0
