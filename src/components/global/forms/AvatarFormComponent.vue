<template>
  <div
    :class="`avatar-form-${this.$store.state.mood}-${this.$store.state.language}-${this.$store.state.avatar_form_status}`"
  >
    <div class="header">
      <h2>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.update_profile.avatar_form_header
            : this.$store.state.Arabic.update_profile.avatar_form_header
        }}
      </h2>
      <icon
        icon="xmark"
        @click="this.$store.commit('Change_avatar_form_status')"
      />
    </div>

    <ul>
      <!-- file input to select the new avatar -->
      <input type="file" id="avatar" ref="avatar" />
      <!-- file input to select the new avatar -->
      <label for="avatar">
        <li @click="this.$store.commit('Change_avatar_form_status')">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.update_profile.new
              : this.$store.state.Arabic.update_profile.new
          }}
        </li>
      </label>

      <li @click="DeleteAvatar">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.update_profile.delete
            : this.$store.state.Arabic.update_profile.delete
        }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "avatar-form",
  data() {
    return {
      selectedFiles: "",
    };
  },
  props: {
    input: String,
  },
  mounted() {
    //  call to the handleFileChange method on select any image
    this.$refs.avatar.addEventListener("change", this.handleFileChange);
  },
  methods: {
    handleFileChange(event) {
      this.$store.state.selectd_images = event.target.files;
      console.log(event.target.files);
    },

    DeleteAvatar() {
      // update delete avatar var in store
      this.$store.state.delete_avatar = "true";

      // close the avatar confirm form
      this.$store.commit("Change_avatar_form_status");
    },
  },
};
</script>

<style lang="scss">
@import "../../../Sass/varibels/variables";

// darck and light English style
.avatar-form-darck-English-open {
  width: 40%;
  height: 25%;
  border-radius: 10px;
  backdrop-filter: blur(100px);
  box-shadow: 0 0 5px $black;
  position: fixed;
  top: 10%;
  left: 30%;
  transition-duration: 0.5s;
  direction: ltr;
  padding: 5px;

  @media (max-width: $phone) {
    width: 80%;
    left: 10%;
    height: 17%;
  }

  // avatar confirm form
  .header {
    width: 100%;
    height: 30%;
    position: relative;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;

    h2 {
      width: 100%;
      height: 100%;
      color: $font-light;
    }

    svg {
      position: absolute;
      right: 5px;
      top: 10px;
      color: $font-light;
      cursor: pointer;
    }
  }

  ul {
    width: 100%;
    height: 70%;
    list-style-type: none;

    input {
      display: none;
    }

    li {
      width: 98%;
      height: 40px;
      margin: 5px 1%;
      color: $font-light;
      cursor: pointer;
      transition-duration: 0.5s;
      display: flex;
      justify-content: start;
      align-items: center;
      border-radius: 5px;
      padding: 0px 5px;
    }

    li:hover {
      background-color: $note-darck;
    }
  }
}

.avatar-form-darck-English-close {
  @extend .avatar-form-darck-English-open;
  top: -100%;
}

.avatar-form-light-English-open {
  @extend .avatar-form-darck-English-open;

  .header {
    border-color: transparent transparent $border-darck transparent;

    h2 {
      color: $font-darck;
    }

    svg {
      color: $font-darck;
    }
  }

  ul {
    li {
      color: $font-darck;
    }

    li:hover {
      background-color: $note-light;
    }
  }
}

.avatar-form-light-English-close {
  @extend .avatar-form-light-English-open;
  top: -100%;
}

// darck and light English style

// darck and light Arabic style
.avatar-form-darck-Arabic-open {
  @extend .avatar-form-darck-English-open;
  direction: rtl;

  // avatar confirm form
  .header {
    position: relative;

    svg {
      position: absolute;
      right: 92%;
      top: 10px;
    }
  }
}

.avatar-form-darck-Arabic-close {
  @extend .avatar-form-darck-Arabic-open;
  top: -100%;
}

.avatar-form-light-Arabic-open {
  @extend .avatar-form-light-English-open;
  direction: rtl;

  // avatar confirm form
  .header {
    position: relative;

    svg {
      position: absolute;
      right: 90%;
      top: 10px;
    }
  }
}

.avatar-form-light-Arabic-close {
  @extend .avatar-form-light-Arabic-open;
  top: -100%;
}
// darck and light Arabic style
</style>
