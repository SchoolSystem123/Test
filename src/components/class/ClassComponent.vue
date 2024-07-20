<template>
  <div
    :class="`class-profile-${this.$store.state.mood}-${this.$store.state.language}`"
    @click="GetToClass(this.class_data._id)"
  >
    <!-- class cover -->
    <img :src="this.class_data.cover" alt="cover" />
    <!-- <img :src="this.class_data.cover" alt="cover" /> -->
    <!-- class cover -->

    <div class="info">
      <!-- class title  -->
      <h2>{{ this.class_data.title }}</h2>

      <!-- students length  -->
      <p v-if="this.class_data.students">
        👨‍🎓 : {{ this.class_data.students.length }}
      </p>

      <!-- home works length  -->
      <p v-if="this.class_data.home_works">
        🏚️💯🔝 : {{ this.class_data.home_works.length }}
      </p>

      <!-- subject name  -->
      <p v-if="this.class_data.subject">
        📚📖📑 : {{ this.class_data.subject }}
      </p>

      <p v-if="this.class_data.class_level">
        🏫🪜🎚️ : {{ this.class_data.class_level }}
      </p>

      <p v-if="this.class_data.created_at">
        📆 : {{ this.class_data.created_at.split("T")[0] }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "class-component",
  props: {
    class_data: Object,
  },
  components: {},
  methods: {
    // get to class method
    GetToClass(id) {
      window.location = `/class/${id}`;
    },
  },
};
</script>
