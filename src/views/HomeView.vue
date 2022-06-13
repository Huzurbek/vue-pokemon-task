<template>
  <div class="container">
    <!--    Search Wrapper-->
    <div class="search-wrapper">
      <input type="text" v-model="search" placeholder="Search title.." />
      <label>Search title:</label>
    </div>
    <!--    Pokemons List Component-->
    <PokemonsList :pokemonLists="filteredList" @openModel="openModelcha" />
    <!--    Pagination Component-->
    <Pagination
      @selectPage="selectPage"
      :currentPage="page + 1"
      :totalPokemonsAmount="totalPokemonsAmount"
    />
    <!--    Pokemon Model Component-->
    <ModelPart v-if="modelCard" @closeModel="closeModel" />
    <!--    Loading Component-->
    <loading
      v-model:active="isLoading"
      :can-cancel="false"
      :is-full-page="fullPage"
    />
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import PokemonsList from "@/components/PokemonsList";
import Pagination from "@/components/PaginationPart";
import ModelPart from "@/components/ModelPart";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "HomeView",
  components: { Loading, PokemonsList, Pagination, ModelPart },
  data() {
    return {
      fullPage: true,
      page: 0,
      count: 20,
      modelCard: false,
      search: "",
    };
  },
  created() {
    this.getAllUsers();
  },
  computed: {
    ...mapGetters(["getPokemonLists"]),
    totalPokemonsAmount() {
      return Math.floor(this.getPokemonLists?.count / this.count);
    },
    filteredList() {
      return this.getPokemonLists?.results?.filter((el) =>
        el.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
  methods: {
    ...mapActions(["getPokemons", "getPokemanByURL"]),
    getAllUsers() {
      const data = {
        pageNumber: this.page * this.count,
        countNumber: this.count,
      };
      this.getPokemons(data);
    },
    selectPage(val) {
      console.log("home da on slel", val);
      this.page = val;
      this.getAllUsers();
    },
    onSelectUser(id) {
      this.$emit("onSelectUser", id);
    },
    closeModel() {
      this.modelCard = false;
    },
    openModelcha(val) {
      this.getPokemanByURL({ pokemonUrl: val });
      this.modelCard = true;
    },
  },
};
</script>
<style scoped>
.container {
  background: white;
  padding-bottom: 50px;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
/*Search Wrapper Style*/
.search-wrapper {
  position: relative;
  margin: 0 auto 20px auto;
}
.search-wrapper label {
  position: absolute;
  font-size: 17px;
  color: rgba(0, 0, 0, 0.5);
  top: 8px;
  left: 12px;
  z-index: -1;
  transition: 0.15s all ease-in-out;
}
.search-wrapper input {
  padding: 9px 17px;
  color: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  transition: 0.15s all ease-in-out;
  background: white;
}
.search-wrapper input:focus {
  outline: none;
  transform: scale(1.05);
}
.search-wrapper input:focus + label {
  font-size: 12px;
  transform: translateY(-24px) translateX(-12px);
}
.search-wrapper input::-webkit-input-placeholder {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
  font-weight: 100;
}
</style>
