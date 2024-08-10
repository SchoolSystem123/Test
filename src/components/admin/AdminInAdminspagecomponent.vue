<template>
  <div
    :class="`admins-admin-${this.$store.state.mood}-${this.$store.state.language}-${this.view_style}`"
  >
    <!-- admin avatar  -->
    <img
      :src="this.admin_data.avatar"
      alt="cover"
      @click="getToaAmin(this.admin_data._id)"
    />
    <!-- admin avatar  -->

    <div class="info" @click="getToaAmin(this.admin_data._id)">
      <!-- admin name  -->
      <h3>{{ this.admin_data.name }}</h3>
      <!-- admin name  -->
      <!-- admin level  -->
      <p
        v-if="this.admin_data.is_admin"
        :class="this.admin_data.is_admin == true ? 'admin' : null"
      >
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.admin_component.admin
            : this.$store.state.Arabic.admin_component.admin
        }}
      </p>
      <!-- admin level  -->
      <!-- admin level  -->
      <p
        v-if="this.admin_data.is_supper_admin"
        :class="this.admin_data.is_supper_admin == true ? 'super-admin' : null"
      >
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.admin_component.supper_admin
            : this.$store.state.Arabic.admin_component.supper_admin
        }}
      </p>
      <!-- admin level  -->
      <!-- admin gender  -->
      <p>
        ⚧️ : {{ this.admin_data.gender }}
        {{ this.admin_data.gender == "male" ? "🚹" : "🚺" }}
      </p>
      <!-- admin gender  -->
      <!-- admin joind at  -->
      <p>📆 : {{ this.admin_data.joind_at.split("T")[0] }}</p>
      <!-- admin joind at  -->
    </div>

    <div class="buttons" v-if="this.Dash && !this.admin_data.is_supper_admin">
      <!-- admins buttons -->
      <button @click="GoToUpdateAdmi">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.dash_admins_component.update
            : this.$store.state.Arabic.dash_admins_component.update
        }}
      </button>
      <button @click="DeleteAdmin">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.dash_admins_component.delete
            : this.$store.state.Arabic.dash_admins_component.delete
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
    admin_data: Object,
    view_style: String,
    Dash: Boolean,
  },
  components: {},
  methods: {
    getToaAmin(id) {
      window.location = `/admin/${id}`;
    },

    // delete admin
    DeleteAdmin() {
      // update admin id for delete in store
      this.$store.state.admin_id_for_delete = this.admin_data._id;

      // open the delete admin form verify
      this.$store.commit("OpenOrCloseDeleteAdminForm");
    },

    // open and update the activ component in dash
    GoToUpdateAdmi() {
      // update the admin_id_for_update var in store
      this.$store.state.admin_for_update = this.admin_data;

      // update the active component name
      this.$store.state.active_component_in_dash = "update-admin";
    },
  },
};
</script>
