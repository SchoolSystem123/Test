<template>
  <div
    :class="`plans-page-${this.view_style}-${this.$store.state.mood}-${this.$store.state.language}`"
    @click="GetToPlan(this.Plan_data._id)"
  >
    <!-- plans title  -->
    <h2>{{ this.Plan_data.title }}</h2>
    <!-- plans title  -->
    <p>{{ this.Plan_data.class_level }}</p>
    <p v-if="this.Plan_data.students">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.plan_component.students
          : this.$store.state.Arabic.plan_component.students
      }}
      {{ this.Plan_data.students.length }}
    </p>
    <p v-if="this.Plan_data.teachers">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.plan_component.teachers
          : this.$store.state.Arabic.plan_component.teachers
      }}
      {{ this.Plan_data.teachers.length }}
    </p>
    <p v-if="this.Plan_data.created_at">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.plan_component.created_at
          : this.$store.state.Arabic.plan_component.created_at
      }}
      {{ this.Plan_data.created_at.split("T")[0] }}
    </p>
  </div>
</template>

<script>
export default {
  name: "plans-page-plan-component",
  props: {
    view_style: String,
    Plan_data: Object,
  },
  methods: {
    // get to plans on click method
    GetToPlan(id) {
      window.location = `/plan/${id}`;
    },
  },
};
</script>
