<template>
<icon icon="arrow-up" :id="`scroll-to-${this.scroll_page > 200 ? this.$store.state.theme : null}`" @click="scrollToTop" />
</template>

<script>
export default {
  name: "scroll-top-component",
  data() {
    return {
      scrollThreshold: 50,
    };
  },
  props : {
    scroll_page : Number
  },
  methods: {
    // move to the top 
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  }
};
</script>
