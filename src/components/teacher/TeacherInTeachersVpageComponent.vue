<template>
  <div
    :class="`teachers-teacher-${this.$store.state.mood}-${this.$store.state.language}-${this.view_style}`"
    @click="getToaAmin(this.teacher_data._id)"
  >
    <!-- admin avatar  -->
    <img :src="this.teacher_data.avatar" alt="avatar" />
    <!-- admin avatar  -->

    <div class="info">
      <!-- admin name  -->
      <h3>{{ this.teacher_data.name }}</h3>
      <!-- admin name  -->

      <!-- teacher's rate -->
      <p>
        ⭐ : {{ this.teacher_data.rate }}
      </p>
      <!-- teacher's rate  -->

      <!-- teacher's classes length  -->
      <p>
        🏛️ : {{ this.teacher_data.classes.length }}
      </p>
      <!-- teacher's classes length  -->

      <!-- teacher's subject -->
      <p>
        📚📖📑 : {{ this.teacher_data.subject }}
      </p>
      <!-- teacher's subject  -->

      <!-- teacher's editor -->
      <p v-if="this.teacher_data.editor" :class="this.teacher_data.editor == true ? 'editor' : null">
        editor
      </p>
      <!-- teacher's editor  -->

      <!-- teacher's class lavel -->
      <p>
        🏫🪜🎚️ : {{ this.teacher_data.class_level }}
      </p>
      <!-- teacher's class lavel  -->
    </div>
  </div>
</template>

<script>
export default {
  name: "admin-in-admins-apge-component",
  data() {
    return {};
  },
  props: {
    teacher_data: Object,
    view_style: String,
  },
  components: {},
  methods: {
    getToaAmin(id) {
      window.location = `/teacher/${id}`;
    },
  },
};
</script>
