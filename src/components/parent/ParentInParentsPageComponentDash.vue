<template>
  <div
    :class="`parents-parent-${this.$store.state.mood}-${this.$store.state.language}-${this.view_style}`"
  >
    <!-- student avatar  -->
    <img
      :src="this.parents_data.avatar"
      alt="avatar"
      @click="GetToParent(this.parents_data._id)"
    />
    <!-- student avatar  -->

    <div class="info" @click="GetToParent(this.parents_data._id)">
      <!-- parents name  -->
      <h3>{{ this.parents_data.name }}</h3>
      <!-- parents name  -->

      <!-- parents gender length  -->
      <p>
        ⚧️ : {{ this.parents_data.gender }}
        {{ this.parents_data.gender == "male" ? "🚹" : "🚺" }}
      </p>
      <!-- parents gender length  -->

      <!-- parents children length  -->
      <p>👨‍🎓 : {{ this.parents_data.children.length }}</p>
      <!-- parents children length  -->

      <!-- parents joind at  -->
      <p v-if="this.parents_data.created_at">
        📆 : {{ this.parents_data.created_at.split("T")[0] }}
      </p>
      <!-- parents joind at  -->
    </div>

    <div
      class="buttons"
      v-if="
        (this.Dash && !this.$store.state.user.user_type == 'admin') ||
        this.$store.state.user.user_type == 'super'
      "
    >
      <!-- admins buttons -->
      <button @click="GoToUpdateParent">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.dash_teachers_component.update
            : this.$store.state.Arabic.dash_teachers_component.update
        }}
      </button>
      <button @click="DeleteParent">
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
  name: "student-in-students-apge-component",
  data() {
    return {};
  },
  props: {
    parents_data: Object,
    view_style: String,
    Dash: Boolean,
  },
  components: {},
  methods: {
    GetToParent(id) {
      window.location = `/parent/${id}`;
    },

    // delete parent
    DeleteParent() {
      // update student id for delete in store
      this.$store.state.parent_id_for_delete = this.parents_data._id;

      // open the delete admin form verify
      this.$store.commit("OpenOrCloseDeleteParentForm");
    },

    // Go update parent
    GoToUpdateParent() {
      // update the parent_id_for_update var in store
      this.$store.state.parent_for_update = this.parents_data;

      // set the parent children to choosed_children array in store
      this.$store.state.choosed_children = this.parents_data.children;

      // update the active component name
      this.$store.state.active_component_in_dash = "update-parent";
    },
  },
};
</script>
