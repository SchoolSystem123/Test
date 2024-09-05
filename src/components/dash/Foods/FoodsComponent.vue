<template>
  <div
    :class="`foods-dash-${this.$store.state.mood}-${this.$store.state.language}-${this.status}`"
  >
    sa
  </div>
</template>
<script>
export default {
  name: "food-component",
  data() {
    return {
      status: "close",
    };
  },
  mounted() {
    setTimeout(() => {
      this.status = "open";
    }, 500);
  },
  components: {},
  methods: {},
};
</script>
