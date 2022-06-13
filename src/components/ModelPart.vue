<template>
  <div class="model-container" @click="closeModel">
    <div class="pokemon-card">
      <div class="card-image">
        <img
          :src="getSvg"
          style="object-fit: contain; width: 200px; height: 200px"
        />
      </div>
      <div class="card-header">
        <div class="pokemon__name">{{ getActivePokemon?.name }}</div>
        <div class="base__experence">
          Base Experience {{ getActivePokemon?.base_experience }}
        </div>
      </div>
      <div class="card-body">
        <div class="pokemon-description">
          <div class="info__column">
            <div class="column-text">
              <div class="type__name">
                {{
                  getActivePokemon?.types
                    ?.map(
                      (type) =>
                        `${type.type.name[0].toUpperCase()}${type.type.name.slice(
                          1
                        )}`
                    )
                    .join(" | ")
                }}
              </div>
            </div>
            <div class="column-label">Type</div>
          </div>
          <div class="info__column">
            <div class="column-text">{{ getActivePokemon?.weight }} kg</div>
            <div class="column-label">Weight</div>
          </div>
          <div class="info__column">
            <div class="column-text">{{ getActivePokemon?.height }} m</div>
            <div class="column-label">Height</div>
          </div>
        </div>
        <div class="pokemon__footer">
          <div class="btn" @click="closeModel">Close Model</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters(["getActivePokemon"]),
    getSvg() {
      return this.getActivePokemon?.sprites?.other?.dream_world?.front_default;
    },
  },
  methods: {
    ...mapMutations(["clearActivePokemon"]),
    closeModel() {
      this.$emit("closeModel");
      this.clearActivePokemon();
    },
  },
};
</script>

<style scoped>
.model-container {
  z-index: 50;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pokemon-card {
  width: 350px;
  background: #ffffff;
  box-shadow: 3px 4px 12px rgba(54, 58, 69, 0.26);
  border-radius: 10px;
  box-sizing: border-box;
  padding: 90px 12px 12px 12px;
  display: flex;
  flex-direction: column;
  position: relative;
}
.card-image {
  position: absolute;
  top: -130px;
  margin-left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 200px;
}
/*Card Header Part:*/
.pokemon__name,
.base__experence {
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  margin-bottom: 30px;
  text-align: center;
  position: relative;
}
.base__experence {
  color: #d9d9d9;
}
.pokemon__name::first-letter {
  text-transform: capitalize;
}
.pokemon__name::after {
  content: "";
  background: #00c65e;
  position: absolute;
  bottom: -10px;
  right: 50%;
  transform: translate(50%, 50%);
  height: 5px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  width: 50%;
}
/*Card Body Part:*/
.card-body {
  padding: 20px;
}
.pokemon-description {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  position: relative;
}
.pokemon-description::after {
  content: "";
  background: #d9d9d9;
  position: absolute;
  bottom: -15px;
  right: 50%;
  transform: translate(50%, 50%);
  height: 2px;
  width: 100%;
}
.info__column {
  font-weight: 300;
  font-size: 13px;
  line-height: 16px;
  text-align: center;
  position: relative;
}
.info__column :after {
  content: "";
  background: #d9d9d9;
  position: absolute;
  bottom: 0;
  right: -10px;
  height: 90%;
  width: 1.5px;
}
.info__column:last-child :after {
  display: none;
}

/*Pokemon Footer Part*/
.pokemon__footer {
  display: flex;
  justify-content: end;
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
