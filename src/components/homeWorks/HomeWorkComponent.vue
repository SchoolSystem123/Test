<template>
  <div
    :class="`home-work-${this.$store.state.mood}-${this.view_style}-${this.$store.state.language}`"
    @click="GoHomeWork(this.home_work._id)"
  >
    <p class="home-work">Home Work 🏚️💯🔝</p>
    <!-- home work cover -->
    <img
      :src="this.home_work.images[0]"
      alt="cover"
      v-if="this.home_work.images && this.home_work.images.length > 0"
    />

    <!-- home work cover -->
    <h5>{{ this.home_work.title }}</h5>

    <!-- created at ( date ) -->
    <p class="created_at">📆 : {{ this.home_work.created_at.split("T")[0] }}</p>

    <!-- home work level  -->
    <div :class="`level-${this.home_work.level}`"></div>
  </div>
</template>

<script>
export default {
  name: "home-work-component",
  props: {
    home_work: Object,
    view_style: String,
  },
  methods: {
    // go to the home work page
    GoHomeWork(id) {
      // add the home work id after new page link
      window.location = `/homeWork/${id}`;
    },
  },
};
</script>
