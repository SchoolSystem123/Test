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

    <!-- info section  -->
    <div class="info">
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
    <!-- info section  -->

    <!-- buttons cont  -->
    <div class="buttons">
      <button class="update" @click="GoToUpdateClass">Update</button>
      <button class="delete" @click="DeleteClass(class_data._id)">
        Delete
      </button>
      <!-- buttons cont  -->
    </div>
  </div>
</template>

<script>
export default {
  name: "class-component-in-dash",
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

    // delete class method
    DeleteClass(id) {
      // open the delete class form
      this.$store.commit("OpenOrCloseDeleteClassForm");

      // set the class id to delete_class_form_status in store
      this.$store.state.class_id_for_delete = id;
    },

    // go to update class component
    GoToUpdateClass() {
      // set the class data to class_for_update in store
      this.$store.state.class_for_update = this.class_data;

      // update the active component to open the update class component
      this.$store.state.active_component_in_dash = "update-class";
    },
  },
};
</script>
