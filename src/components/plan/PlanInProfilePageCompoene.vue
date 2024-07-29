<template>
  <div
    :class="`plan-profile-${this.$store.state.mood}-${this.$store.state.language}`"
    @click="GetPlan(this.plan_data._id)"
  >
    <!-- plan title  -->
    <h2>
      {{ this.plan_data.title }}
    </h2>
    <!-- plan title  -->
    <!-- plan description  -->
    <div>{{ this.plan_data.description }}</div>
    <!-- plan description  -->
    <!-- plan students  -->
    <p v-if="this.plan_data.students">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.plan_component.students
          : this.$store.state.Arabic.plan_component.students
      }}
      {{ this.plan_data.students.length }}
    </p>
    <!-- plan students  -->
    <!-- plan teachers  -->
    <p v-if="this.plan_data.teachers">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.plan_component.teachers
          : this.$store.state.Arabic.plan_component.teachers
      }}
      {{ this.plan_data.teachers.length }}
    </p>
    <!-- plan teachers  -->
  </div>
</template>

<script>
export default {
  name: "plan-compoenent",
  props: {
    plan_data: Object,
  },
  methods: {
    // get plan on click method
    GetPlan(id) {
      window.location = `/plan/${id}`;
    },
  },
};
</script>
