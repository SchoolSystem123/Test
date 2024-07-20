<template>
  <div :class="`small-nav-${this.$store.state.mood}`">
    <icon icon="bars" @click="this.$store.commit('changeSidBarStatus')" id="bars"/>

    <router-link to="/messages">
      <icon icon="bell" />
    </router-link>
  </div>
</template>

<script>
export default {
  name : "small-nav-component"
}
</script>
