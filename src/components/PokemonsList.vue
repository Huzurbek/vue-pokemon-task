<template>
  <div class="content">
    <ul class="links">
      <li class="item" v-for="(item, index) in pokemonLists" :key="index">
        <div style="display: flex; align-items: center">
          <img
            class="logo-image"
            src="@/assets/pokemon-logo.png"
            alt="Pokemon Logo"
          />
          <div class="label">{{ item.name }}</div>
        </div>
        <div class="btn" @click="openModel(item.url)">Full Info</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    pokemonLists: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    openModel(val) {
      this.$emit("openModel", val);
    },
  },
};
</script>

<style scoped>
.content {
  max-width: 731px;
  width: 100%;
  margin: 0 auto;
  padding: 30px 40px;
  background: #ffffff;
  box-shadow: 3px 4px 12px rgba(54, 58, 69, 0.26);
  border-radius: 10px;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.logo-image {
  width: 90px;
  height: 50px;
  margin-right: 20px;
}
.item {
  padding: 10px 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-bottom: 3px;
  box-sizing: border-box;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  color: #818187;
}
.label:first-letter {
  text-transform: capitalize;
}
.item ::after {
  content: "";
  background: #efefef;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  height: 2px;
  width: 100%;
}
.item:last-child :after {
  display: none;
}

.btn {
  padding: 12px 16px;
  background: #ffffff;
  box-shadow: 1px 2px 16px 3px rgba(54, 58, 69, 0.08);
  border-radius: 10px;
  display: flex;
  align-items: center;
  color: #00c65e;
  cursor: pointer;
  transition: background-color 175ms ease-in, color 175ms ease-in;
}
.btn:hover {
  background: #00c65e;
  color: white;
}
</style>
