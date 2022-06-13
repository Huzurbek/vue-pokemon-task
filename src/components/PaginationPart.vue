<template>
  <div class="pagination">
    <div class="preview-btn btn" @click="decrement">
      <svg
        width="7"
        height="11"
        viewBox="0 0 7 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.36 11C5.22529 10.9995 5.09208 10.9718 4.96836 10.9185C4.84463 10.8652 4.73294 10.7875 4.64 10.69L0.779998 6.69C0.596771 6.50307 0.494141 6.25175 0.494141 5.99C0.494141 5.72825 0.596771 5.47693 0.779998 5.29L4.78 1.29C4.87324 1.19676 4.98393 1.1228 5.10575 1.07234C5.22757 1.02188 5.35814 0.995909 5.49 0.995909C5.62186 0.995909 5.75243 1.02188 5.87425 1.07234C5.99607 1.1228 6.10676 1.19676 6.2 1.29C6.29324 1.38324 6.3672 1.49393 6.41766 1.61575C6.46812 1.73757 6.49409 1.86814 6.49409 2C6.49409 2.13186 6.46812 2.26243 6.41766 2.38425C6.3672 2.50607 6.29324 2.61676 6.2 2.71L2.9 6L6.08 9.3C6.26625 9.48736 6.37079 9.74081 6.37079 10.005C6.37079 10.2692 6.26625 10.5226 6.08 10.71C5.98537 10.8039 5.87293 10.8779 5.74928 10.9277C5.62564 10.9775 5.49328 11.0021 5.36 11Z"
          fill="white"
        />
      </svg>
    </div>
    <div v-for="number in pages" :key="number">
      <div v-if="!number" class="btn" style="box-shadow: none; cursor: auto">
        ...
      </div>
      <div v-else-if="Array.isArray(number)" style="display: flex">
        <div v-for="j in number" :key="j">
          <div
            class="number-btn btn"
            :class="activePage === j ? 'next-btn' : ''"
            @click="choosePage(j - 1)"
          >
            {{ j }}
          </div>
        </div>
      </div>
      <div
        v-else
        class="number-btn btn"
        :class="activePage === number ? 'next-btn' : ''"
        @click="choosePage(number - 1)"
      >
        {{ number }}
      </div>
    </div>
    <div class="next-btn btn" @click="increment">
      <svg
        width="7"
        height="11"
        viewBox="0 0 7 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.64 0C1.77471 0.00051403 1.90792 0.0282383 2.03164 0.0815086C2.15537 0.134779 2.26706 0.212498 2.36 0.309999L6.22 4.31C6.40323 4.49693 6.50586 4.74825 6.50586 5.01C6.50586 5.27175 6.40323 5.52307 6.22 5.71L2.22 9.71C2.12676 9.80324 2.01607 9.8772 1.89425 9.92766C1.77243 9.97812 1.64186 10.0041 1.51 10.0041C1.37814 10.0041 1.24757 9.97812 1.12575 9.92766C1.00393 9.8772 0.89324 9.80324 0.800002 9.71C0.706764 9.61676 0.632802 9.50607 0.582342 9.38425C0.531882 9.26243 0.50591 9.13186 0.50591 9C0.50591 8.86814 0.531882 8.73757 0.582342 8.61575C0.632802 8.49393 0.706764 8.38324 0.800002 8.29L4.1 5L0.920002 1.7C0.733751 1.51264 0.62921 1.25919 0.62921 0.995001C0.62921 0.730815 0.733751 0.477364 0.920002 0.290001C1.01463 0.196115 1.12707 0.122094 1.25072 0.0722923C1.37436 0.0224905 1.50672 -0.0020895 1.64 0Z"
          fill="white"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: () => 1,
    },
    totalPokemonsAmount: {
      type: Number,
      default: () => 20,
    },
  },
  data() {
    return {
      activePage: this.currentPage,
    };
  },
  mounted() {
    this.activePage = this.currentPage;
  },
  computed: {
    pages() {
      let total = this.totalPokemonsAmount;
      let limit = 3;
      let current_page = this.activePage;
      let for_display = [];
      const genArr = (from, to) =>
        [...Array(to - from + 1)].map((_, index) => index + from);
      if (total > limit + 1) {
        if (current_page >= limit && current_page <= total - limit) {
          for_display = [
            1,
            false,
            genArr(current_page - 1, current_page + 1),
            false,
            total,
          ];
        } else if (current_page > total - limit)
          for_display = [1, false, genArr(total - limit + 1, total)];
        else for_display = [genArr(1, 3), false, total];
      }
      return for_display;
    },
  },
  methods: {
    decrement() {
      if (this.activePage === 1) return;
      this.activePage -= 1;
      this.onSelect(this.activePage - 1);
    },
    increment() {
      if (this.activePage === this.totalPokemonsAmount) return;
      this.activePage += 1;
      this.onSelect(this.activePage - 1);
    },
    choosePage(val) {
      if (val + 1 === this.activePage) return;
      this.onSelect(val);
    },
    onSelect(val) {
      this.$emit("selectPage", val);
    },
  },
  watch: {
    currentPage: function (val) {
      this.activePage = val;
    },
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}
.btn {
  width: 60px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 1px 2px 16px 3px rgba(54, 58, 69, 0.08);
  color: #00c65e;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  cursor: pointer;
  margin-right: 10px;
}
.preview-btn,
.next-btn {
  background: #00c65e;
  color: white;
}
.number-btn {
  transition: background 175ms ease-in, color 175ms ease-in;
}
.number-btn:hover:not(.next-btn) {
  outline: 2px solid #00c65e;
  background: white;
  color: #00c65e;
}
</style>
