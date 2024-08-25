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

<style lang="scss">
@import "../../Sass/varibels/variables";

// darck and light English plan in profile page style
.plan-profile-darck-English {
  width: 98%;
  height: auto;
  margin: 5px 1%;
  border-radius: 10px;
  background-color: $body-darck;
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
  padding: 5px;
  transition-duration: 0.5s;
  direction: ltr;

  // plan title
  h2 {
    width: 100%;
    margin: 5px 0%;
    height: auto;
    color: $font-light;
  }

  div {
    width: 100%;
    height: auto;
    margin: 3px 0px;
    font-size: $small;
    color: $font-light;
  }

  // plan description
  p {
    width: auto;
    height: auto;
    padding: 3px;
    border-radius: 3px;
    margin: 3px;
    background-color: $note-darck;
    color: $font-light;
    font-size: $x-small;
  }
}

.plan-profile-darck-English:hover {
  box-shadow: 0 0 5px $black;
}

.plan-profile-light-English {
  @extend .plan-profile-darck-English;
  background-color: $body-light;

  // plan title
  h2 {
    color: $font-darck;
  }

  div {
    color: $font-darck;
  }

  // plan description
  p {
    background-color: $note-light;
    color: $font-darck;
  }
}
// darck and light English plan in profile page style

// darck and light Arabic plan in profile page style
.plan-profile-darck-Arabic {
  width: 98%;
  height: auto;
  margin: 5px 1%;
  border-radius: 10px;
  background-color: $body-darck;
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
  padding: 5px;
  transition-duration: 0.5s;
  direction: rtl;

  // plan title
  h2 {
    width: 100%;
    margin: 5px 0%;
    height: auto;
    color: $font-light;
  }

  div {
    width: 100%;
    height: auto;
    margin: 3px 0px;
    font-size: $small;
    color: $font-light;
  }

  // plan description
  p {
    width: auto;
    height: auto;
    padding: 3px;
    border-radius: 3px;
    margin: 3px;
    background-color: $note-darck;
    color: $font-light;
    font-size: $x-small;
  }
}

.plan-profile-darck-Arabic:hover {
  box-shadow: 0 0 5px $black;
}

.plan-profile-light-Arabic {
  @extend .plan-profile-darck-Arabic;
  background-color: $body-light;

  // plan title
  h2 {
    color: $font-darck;
  }

  div {
    color: $font-darck;
  }

  // plan description
  p {
    background-color: $note-light;
    color: $font-darck;
  }
}
// darck and light Arabic plan in profile page style
</style>
