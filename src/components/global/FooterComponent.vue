<template>
  <div :class="`footer-${this.$store.state.mood}-${this.$store.state.language}`" id="footer">
    <h5 v-if="this.$store.state.user">{{ this.$store.state.language == "English"
      ? this.$store.state.English.footer.message
      : this.$store.state.Arabic.footer.message }} {{ this.$store.state.user.user.name }}</h5>
    <!-- english footer  -->
    <ul v-if="this.$store.state.language == 'English'">
      <li v-for="(line , index) in this.$store.state.English.footer.links" :key="index">
        <a :href="line.link">
          {{ line.title }} 
          <icon icon="arrow-right" />
        </a>
      </li>
    </ul>

    <ul v-if="this.$store.state.language == 'Arabic'">
      <li v-for="(line , index) in this.$store.state.Arabic.footer.links" :key="index">
        <a :href="line.link">
          {{ line.title }} 
          <icon icon="arrow-right" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name : "footer-component"
}
</script>
