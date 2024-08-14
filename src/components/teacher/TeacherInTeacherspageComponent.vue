<template>
  <div
    :class="`teachers-teacher-${this.$store.state.mood}-${this.$store.state.language}-${this.view_style}`"
  >
    <!-- admin avatar  -->
    <img
      :src="this.teacher_data.avatar"
      alt="avatar"
      @click="getToaAmin(this.teacher_data._id)"
    />
    <!-- admin avatar  -->

    <div class="info" @click="getToaAmin(this.teacher_data._id)">
      <!-- admin name  -->
      <h3>{{ this.teacher_data.name }}</h3>
      <!-- admin name  -->

      <!-- teacher's rate -->
      <p>⭐ : {{ this.teacher_data.rate }}</p>
      <!-- teacher's rate  -->

      <!-- teacher's classes length  -->
      <p>🏛️ : {{ this.teacher_data.classes.length }}</p>
      <!-- teacher's classes length  -->

      <!-- teacher's subject -->
      <p>📚📖📑 : {{ this.teacher_data.subject }}</p>
      <!-- teacher's subject  -->

      <!-- teacher's editor -->
      <p
        v-if="this.teacher_data.editor"
        :class="this.teacher_data.editor == true ? 'editor' : null"
      >
        editor
      </p>
      <!-- teacher's editor  -->

      <!-- teacher's class lavel -->
      <p>🏫🪜🎚️ : {{ this.teacher_data.class_level }}</p>
      <!-- teacher's class lavel  -->
    </div>

    <div
      class="buttons"
      v-if="
        (this.Dash && !this.$store.state.user.user_type == 'admin') ||
        this.$store.state.user.user_type == 'super'
      "
    >
      <!-- admins buttons -->
      <button @click="GoToUpdateTeacher">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.dash_teachers_component.update
            : this.$store.state.Arabic.dash_teachers_component.update
        }}
      </button>
      <button @click="DeleteTeacher">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.dash_teachers_component.delete
            : this.$store.state.Arabic.dash_teachers_component.delete
        }}
      </button>
      <!-- admins buttons -->
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
    Dash: Boolean,
  },
  components: {},
  methods: {
    getToaAmin(id) {
      window.location = `/teacher/${id}`;
    },

    // delete teacher
    DeleteTeacher() {
      // update teacher id for delete in store
      this.$store.state.teacher_id_for_delete = this.teacher_data._id;

      // open the delete admin form verify
      this.$store.commit("OpenOrCloseDeleteTeacherForm");
    },

    // Go update teacher
    GoToUpdateTeacher() {
      // update the teacher_id_for_update var in store
      this.$store.state.teacher_for_update = this.teacher_data;
      console.log(this.$store.state.teacher_for_update);
      // update the active component name
      this.$store.state.active_component_in_dash = "update-teacher";
    },
  },
};
</script>
