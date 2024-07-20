<template>
  <div :class="`loading-cont-${this.$store.state.mood}-${this.$store.state.loading}`">
    <div :class="`cont-${this.$store.state.theme}`">
      <div class="center">
      </div>
    </div>
    <p>{{ this.$store.state.language == "English"
      ? this.$store.state.English.loading
      : this.$store.state.Arabic.loading
      }}</p>
  </div>
</template>

<script>
export default {
  name : "loading-component"
}
</script>
