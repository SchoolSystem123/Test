<template>
  <span
    :class="`create-class-su-${this.$store.state.theme}-${this.$store.state.language}`"
    @click="GetCreateCLassPage"
  >
    <icon icon="plus" />
  </span>
</template>

<script>
export default {
  name: "create_class-shurt-cut-btn-component",
  methods: {
    GetCreateCLassPage() {
      window.location = `/create/class`;
    },
  },
};
</script>
