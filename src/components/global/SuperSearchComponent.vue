<template>
  <div :class="`super-search-${this.$store.state.theme}`">

    <h2>{{ this.$store.state.language == "English" 
      ? this.$store.state.English.nav.messages.message_one 
      :  this.$store.state.Arabic.nav.messages.message_one }}</h2>

      <h5>{{ this.$store.state.language == "English" 
      ? this.$store.state.English.nav.messages.message_tow 
      :  this.$store.state.Arabic.nav.messages.message_tow }}</h5>

    <div class="input-cont">
      <input type="text" :placeholder="`${this.$store.state.language == 'English'
      ? this.$store.state.English.nav.placeholder
      : this.$store.state.Arabic.nav.placeholder}`">

      <button>{{ this.$store.state.language == "English" 
      ? this.$store.state.English.nav.button 
      :  this.$store.state.Arabic.nav.button }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name : "super-search"
}
</script>
