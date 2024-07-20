<template>
  <div
    :class="`home_works-hw-${this.$store.state.mood}-${this.$store.state.language}`"
    @click="GoToHomeWork(this.home_work_data._id)"
  >
    <!-- cover and teacher avatar cont  -->
    <div class="cover-cont">
      <img
        v-if="
          this.home_work_data.images && this.home_work_data.images.length > 0
        "
        :src="this.home_work_data.images[0]"
        alt="cover"
        class="cover"
      />

      <img
        v-if="this.home_work_data.created_by"
        :src="
          this.home_work_data.created_by != null &&
          this.home_work_data.created_by.avatar
        "
        alt="cover"
        class="avatar"
      />
    </div>
    <!-- cover and teacher avatar cont  -->

    <!-- home work title  -->
    <h2>{{ this.home_work_data.title }}</h2>
    <!-- home work title  -->

    <!-- home work subject -->
    <p>
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.home_works_component.subject
          : this.$store.state.Arabic.home_works_component.subject
      }}
      {{ this.home_work_data.subject }}
    </p>
    <!-- home work subject -->
    <!-- home work class level -->
    <p>
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.home_works_component.class_level
          : this.$store.state.Arabic.home_works_component.class_level
      }}{{ this.home_work_data.class_level }}
    </p>
    <!-- home work class level -->
    <!-- home work level -->
    <div :class="`level-${this.home_work_data.level}`"></div>
    <!-- home work level -->
    <!-- home work images length  -->
    <p>
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.home_works_component.images
          : this.$store.state.Arabic.home_works_component.images
      }}
      {{ this.home_work_data.images.length }}
    </p>
    <!-- home work images length  -->
    <!-- home work craeted at date  -->
    <p>
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.home_works_component.created_at
          : this.$store.state.Arabic.home_works_component.created_at
      }}
      {{ this.home_work_data.created_at.split("T")[0] }}
    </p>
    <!-- home work craeted at date  -->
  </div>
</template>

<script>
export default {
  name: "home_works-page-class-component",
  props: {
    home_work_data: Object,
  },
  data() {
    return {};
  },
  methods: {
    // go to home work method
    GoToHomeWork(id) {
      window.location = `/homeWork/${id}`;
    },
  },
};
</script>
