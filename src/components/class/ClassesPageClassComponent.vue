<template>
  <div
    :class="`classes-class-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <!-- cover and teacher avatar cont  -->
    <div class="cover-cont">
      <img
        :src="this.class_data.cover"
        alt="cover"
        class="cover"
        @click="GoToClass(this.class_data._id)"
      />

      <img
        :src="this.class_data.teacher != null && this.class_data.teacher.avatar"
        alt="avatar"
        class="avatar"
        @click="GoTeacher(this.class_data.teacher._id)"
      />
    </div>
    <!-- cover and teacher avatar cont  -->

    <h2>{{ this.class_data.title }}</h2>

    <p>📚📖📑 : {{ this.class_data.subject }}</p>
    <p>🏫🪜🎚️ : {{ this.class_data.class_level }}</p>
    <p v-if="this.class_data.home_works">
      🏚️💯🔝 : {{ this.class_data.home_works.length }}
    </p>
    <p v-if="this.class_data.students">
      👨‍🎓 : {{ this.class_data.students.length }}
    </p>
    <p>📆 : {{ this.class_data.created_at.split("T")[0] }}</p>
  </div>
</template>

<script>
export default {
  name: "classes-page-class-component",
  props: {
    class_data: Object,
  },
  data() {
    return {};
  },
  methods: {
    // go to class method
    GoToClass(id) {
      window.location = `/class/${id}`;
    },

    // go to teacher method
    GoTeacher(id) {
      window.location = `/teacher/${id}`;
    },
  },
};
</script>
