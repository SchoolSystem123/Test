<template>
  <nav :class="`nav-${this.$store.state.mood}-${this.$store.state.theme}`">
    <div class="header">
      <img :src="this.$store.state.user ? this.$store.state.user.user.avatar : '' " alt="" @click="this.$store.commit('changeSidBarStatus')">
      <div class="message">
        <h3>{{ this.$store.state.user 
      ? this.$store.state.user.user.name 
      : null }}</h3>
        <p>Good Day 👋</p>
      </div>
      <router-link to="/messages">
        <icon icon="bell" />
      </router-link>
    </div>
    <SuperSearchComponentVue />
  </nav>
</template>

<script>
import SuperSearchComponentVue from './SuperSearchComponent.vue'

export default {
  name : "Nav-component",
  components : {
    SuperSearchComponentVue
  }
}
</script>
