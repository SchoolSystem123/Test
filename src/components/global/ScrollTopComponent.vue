<template>
  <icon
    icon="arrow-up"
    :id="`scroll-to-${this.scroll_page > 200 ? this.$store.state.theme : null}`"
    @click="scrollToTop"
  />
</template>

<script>
export default {
  name: "scroll-top-component",
  data() {
    return {
      scrollThreshold: 50,
    };
  },
  props: {
    scroll_page: Number,
  },
  methods: {
    // move to the top
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";

#scroll-to-blue {
  width: 10px;
  height: 10px;
  padding: 10px;
  border-radius: 5px;
  color: $font-light;
  cursor: pointer;
  transition-duration: 0.5s;
  position: fixed;
  bottom: 2%;
  right: 5%;
  opacity: 1;
  @media (min-width: $phone) {
    right: 25%;
  }
  background: linear-gradient(to top, $first-blue, $second-blue);
}

#scroll-to-orange {
  @extend #scroll-to-blue;
  background: linear-gradient(to top, $first-orange, $second-orange);
}

#scroll-to-pink {
  @extend #scroll-to-blue;
  background: linear-gradient(to top, $first-pink, $second-pink);
}

#scroll-to-green {
  @extend #scroll-to-blue;
  background: linear-gradient(to top, $first-green, $second-green);
}

#scroll-to-null {
  @extend #scroll-to-blue;
  background: none;
  bottom: -10%;
  opacity: 0;
  // display: none;
}
</style>
