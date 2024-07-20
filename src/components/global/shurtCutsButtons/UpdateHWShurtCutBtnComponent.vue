<template>
  <span
    v-if="
      this.$store.state.user.user_type == 'admin' ||
      this.$store.state.home_work &&
      this.$store.state.home_work.created_by._id ==
        this.$store.state.user.user._id
    "
    :class="
      this.$store.state.home_work ? `up-hw-${this.$store.state.theme}-${this.$store.state.language}` : 'close'
    "
    @click="GoToUpdateHWPage"
  >
    <icon icon="pen" />
  </span>
</template>

<script>
export default {
  name: "update-HW-shurtCut-btn",
  props: {
    home_work_id: String,
  },
  methods: {
    GoToUpdateHWPage() {
      window.location = `/update/homeWork/${this.home_work_id}`;
    },
  },
};
</script>
