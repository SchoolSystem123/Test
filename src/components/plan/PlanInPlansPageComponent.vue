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

<style lang="scss">
@import "../../Sass/varibels/variables";

// darck and light English list style
.plans-page-list-darck-English {
  width: 100%;
  height: auto;
  border-radius: 10px;
  background-color: $card-darck;
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  margin: 5px 0px;
  transition-duration: 0.5s;
  cursor: pointer;
  direction: ltr;

  // plan title style
  h2 {
    width: 100%;
    height: auto;
    color: $font-light;
  }

  // notes style
  p {
    width: auto;
    height: auto;
    padding: 3px;
    color: $font-light;
    font-size: $x-small;
    border-radius: 3px;
    margin: 3px;
    background-color: $note-darck;
  }
}

.plans-page-list-light-English {
  @extend .plans-page-list-darck-English;
  background-color: $card-light;

  // plan title
  h2 {
    color: $font-darck;
  }

  // notes style
  p {
    color: $font-darck;
    background-color: $note-light;
  }
}
// darck and light English list style

// darck and light Arabic list style
.plans-page-list-darck-Arabic {
  width: 100%;
  height: auto;
  border-radius: 10px;
  background-color: $card-darck;
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  margin: 5px 0px;
  transition-duration: 0.5s;
  cursor: pointer;
  direction: rtl;

  // plan title style
  h2 {
    width: 100%;
    height: auto;
    color: $font-light;
  }

  // notes style
  p {
    width: auto;
    height: auto;
    padding: 3px;
    color: $font-light;
    font-size: $x-small;
    border-radius: 3px;
    margin: 3px;
    background-color: $note-darck;
  }
}

.plans-page-list-light-Arabic {
  @extend .plans-page-list-darck-Arabic;
  background-color: $card-light;

  // plan title
  h2 {
    color: $font-darck;
  }

  // notes style
  p {
    color: $font-darck;
    background-color: $note-light;
  }
}
// darck and light Arabic list style

// darck and light English window-restore style
.plans-page-window-restore-darck-English {
  @extend .plans-page-list-darck-English;
  width: 45%;
  margin: 5px 2%;
}

.plans-page-window-restore-light-English {
  @extend .plans-page-window-restore-darck-English;
  background-color: $card-light;

  // plan title
  h2 {
    color: $font-darck;
  }

  // notes style
  p {
    color: $font-darck;
    background-color: $note-light;
  }
}
// darck and light English window-restore style

// darck and light Arabic window-restore style
.plans-page-window-restore-darck-Arabic {
  @extend .plans-page-window-restore-darck-English;
  direction: rtl;
}

.plans-page-window-restore-light-Arabic {
  @extend .plans-page-window-restore-light-English;
  direction: rtl;
}
// darck and light Arabic window-restore style
</style>
