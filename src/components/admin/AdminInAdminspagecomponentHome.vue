<template>
  <div
    :class="`admins-admin-home-${this.$store.state.mood}-${this.$store.state.language}-${this.view_style}`"
    @click="getToaAmin(this.admin_data._id)"
  >
    <!-- admin avatar  -->
    <img :src="this.admin_data.avatar" alt="cover" />
    <!-- admin avatar  -->

    <div class="info">
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

<style lang="scss">
@import "../../Sass/varibels/variables";

// darck style
.admins-admin-home-darck-English-list {
  width: 90%;
  height: 90px;
  margin: 5px 5%;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  background-color: $card-darck;
  transition-duration: 0.5s;
  cursor: pointer;

  // admin avatar
  img {
    width: 80px;
    height: 80px;
    margin: 5px;
    border-radius: 5px;
  }

  .info {
    width: 80%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 0px 5px;

    // admin name
    h3 {
      width: 100%;
      color: $font-light;
    }

    p {
      color: $font-light;
      max-width: 90%;
      height: auto;
      margin: 2px 1%;
      font-size: $x-small;
      padding: 2px;
      border-radius: 3px;
      background-color: $note-darck;
    }

    // admin color
    .admin {
      background-color: green;
      color: $font-light;
    }

    // supper admin color
    .super-admin {
      background-color: red;
      color: $font-light;
    }
  }
}

.admins-admin-home-darck-English-list:hover {
  box-shadow: 0 0 5px $black;
}

.admins-admin-home-darck-English-window-restore {
  @extend .admins-admin-home-darck-English-list;
  width: 45%;
  margin: 10px 2%;
  height: auto;
  flex-wrap: wrap;

  // admin avatar
  img {
    width: 96%;
    height: 160px;
    margin: 2%;
    border-radius: 10px;
  }

  .info {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 0px 5px 5px 5px;

    // admin name
    h3 {
      width: 100%;
      color: $font-light;
    }

    p {
      color: $font-light;
      max-width: 90%;
      height: auto;
      margin: 1px 2%;
      font-size: $x-small;
      padding: 2px;
      border-radius: 3px;
      background-color: $note-darck;
    }
  }
}

.admins-admin-home-darck-English-window-restore:hover {
  box-shadow: 0 0 5px $black;
}
// darck style

// light style
.admins-admin-home-light-English-list {
  @extend .admins-admin-home-darck-English-list;
  background-color: $card-light;

  .info {
    // admin name
    h3 {
      color: $font-darck;
    }

    p {
      color: $font-darck;
      background-color: $note-light;
    }
  }
}

.admins-admin-home-light-English-list:hover {
  box-shadow: 0 0 5px $black;
}

.admins-admin-home-light-English-window-restore {
  @extend .admins-admin-home-darck-English-window-restore;
  width: 45%;
  margin: 10px 2%;
  height: auto;
  flex-wrap: wrap;
  background-color: $card-light;

  .info {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 0px 5px 5px 5px;

    // admin name
    h3 {
      width: 100%;
      color: $font-darck;
    }

    p {
      color: $font-darck;
      background-color: $note-light;
    }
  }
}

.admins-admin-home-light-English-window-restore:hover {
  box-shadow: 0 0 5px $black;
}
// darck style

// darck style
.admins-admin-home-darck-Arabic-list {
  @extend .admins-admin-home-darck-English-list;
}

.admins-admin-home-darck-Arabic-list:hover {
  box-shadow: 0 0 5px $black;
}

.admins-admin-home-darck-Arabic-window-restore {
  @extend .admins-admin-home-darck-English-window-restore;
}

.admins-admin-home-darck-Arabic-window-restore:hover {
  box-shadow: 0 0 5px $black;
}
// darck style

// light style
.admins-admin-home-light-Arabic-list {
  @extend .admins-admin-home-light-English-list;
  background-color: $card-light;

  .info {
    // admin name
    h3 {
      color: $font-darck;
    }

    p {
      color: $font-darck;
      background-color: $note-light;
    }
  }
}

.admins-admin-home-light-Arabic-list:hover {
  box-shadow: 0 0 5px $black;
}

.admins-admin-home-light-Arabic-window-restore {
  @extend .admins-admin-home-darck-English-window-restore;
  background-color: $card-light;
  width: 45%;
  margin: 10px 2%;
  height: auto;
  flex-wrap: wrap;

  .info {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 0px 5px 5px 5px;

    // admin name
    h3 {
      width: 100%;
      color: $font-darck;
    }

    p {
      color: $font-darck;
      background-color: $note-light;
    }
  }
}

.admins-admin-home-light-Arabic-window-restore:hover {
  box-shadow: 0 0 5px $black;
}
// darck style
</style>
