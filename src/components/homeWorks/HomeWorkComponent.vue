<template>
  <div
    :class="`home-work-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <p class="home-work">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.home_works_in_dash.component_title
          : this.$store.state.Arabic.home_works_in_dash.component_title
      }}
    </p>
    <!-- home work cover conatiner -->
    <!-- home work's  cover  -->
    <div class="cover-cont">
      <img
        class="cover"
        :src="this.home_work.images[0]"
        alt="cover"
        v-if="this.home_work.images && this.home_work.images.length > 0"
        @click="GoHomeWork(this.home_work._id)"
      />
      <!-- home work's  cover  -->

      <!-- author avatar  -->
      <img
        class="avatar"
        v-if="this.home_work.created_by"
        :src="this.home_work.created_by.avatar"
        alt="avatar"
      />

      <h3 v-if="this.home_work.created_by">
        {{ this.home_work.created_by.name }}
      </h3>
      <!-- author avatar  -->
      <!-- home work cover conatiner -->
    </div>

    <!-- home work cover -->
    <h5 @click="GoHomeWork(this.home_work._id)">{{ this.home_work.title }}</h5>

    <!-- created at ( date ) -->
    <p class="created_at">📆 : {{ this.home_work.created_at.split("T")[0] }}</p>

    <!-- home work level  -->
    <div :class="`level-${this.home_work.level}`"></div>

    <div
      class="buttons"
      v-if="
        this.$store.state.user.user_type == 'super' ||
        this.$store.state.user.user_type == 'admin' ||
        (this.$store.state.user.user_type == 'teacher' &&
          this.$store.state.user.user._id == this.home_work.created_by._id)
      "
    >
      <button class="delete" @click="DeleteHW">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.home_works_in_dash.delete
            : this.$store.state.Arabic.home_works_in_dash.delete
        }}
      </button>

      <button class="update" @click="GoToUpdateHomeWork">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.home_works_in_dash.update
            : this.$store.state.Arabic.home_works_in_dash.update
        }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "home-work-component",
  props: {
    home_work: Object,
  },
  methods: {
    // go to the home work page
    GoHomeWork(id) {
      // add the home work id after new page link
      window.location = `/homeWork/${id}`;
    },

    // delete home work method
    DeleteHW() {
      // to open the delete home work verify form
      this.$store.commit("OpenOrCloseDeleteHomeWorkForm");

      // set the home work id to home_work_id_for_delete
      this.$store.state.home_work_id_for_delete = this.home_work._id;
    },

    // go to update home work page
    GoToUpdateHomeWork() {
      // set the home work data to home_work_for_update in store
      this.$store.state.home_work_for_update = this.home_work;

      // update the active_component_in_dash in store
      this.$store.state.active_component_in_dash = "update-home-work";
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";

// darck and light English style
.home-work-darck-English {
  width: 45%;
  max-height: auto;
  margin: 2% 2%;
  position: relative;
  padding: 10px 0px;
  border-radius: 10px;
  background-color: $card-darck;
  cursor: pointer;
  transition-duration: 0.5s;
  direction: ltr;

  // hard level style
  .level-hard {
    width: 5px;
    height: 70%;
    border-radius: 0px 3px 3px 0px;
    position: absolute;
    top: 15%;
    left: 0%;
    background-color: $hard;
    box-shadow: 0 0 10px $hard;
  }

  // normal level style
  .level-normal {
    @extend .level-hard;
    background-color: $normal;
    box-shadow: 0 0 10px $normal;
  }

  // easy level style
  .level-easy {
    @extend .level-hard;
    background-color: $easy;
    box-shadow: 0 0 10px $easy;
  }

  .cover-cont {
    width: 100%;
    height: 300px;
    position: relative;

    @media (max-width: $phone) {
      height: 130px;
    }

    // cover
    .cover {
      width: 90%;
      max-height: 250px;
      border-radius: 10px;
      margin: 2% 5%;
    }

    .avatar {
      position: absolute;
      bottom: 0%;
      left: 7%;
      width: 80px;
      height: 80px;
      border-radius: 5px;
      cursor: pointer;

      @media (max-width: $phone) {
        width: 50px;
        height: 50px;
        position: absolute;
        bottom: 0%;
        left: 7%;
      }
    }

    h3 {
      position: absolute;
      left: 24%;
      bottom: 0%;
      color: $font-light;

      @media (max-width: $phone) {
        left: 40%;
        font-size: $small;
      }
    }
  }

  h5 {
    width: 90%;
    margin: 2% 5%;
    color: $font-light;
  }

  p {
    width: 90%;
    margin: 2% 5%;
    color: $font-light;
    font-size: $xx-small;
  }

  .buttons {
    width: 90%;
    height: auto;
    margin: 5px 5%;

    .delete {
      width: 100%;
      height: 40px;
      border: none;
      outline: none;
      border-radius: 5px;
      margin: 2px 0px;
      background-color: $red;
      color: $font-light;
      cursor: pointer;

      @media (max-width: $phone) {
        height: 30px;
      }
    }

    .update {
      @extend .delete;
      background-color: $green;
    }
  }
}

.home-work-darck-English:hover {
  background-color: $message-darck;
  box-shadow: 0 0 5px $black;
}

.home-work-light-English {
  width: 45%;
  max-height: auto;
  margin: 2% 2%;
  position: relative;
  padding: 10px 0px;
  border-radius: 10px;
  background-color: $card-light;
  cursor: pointer;
  transition-duration: 0.5s;
  direction: ltr;

  // hard level style
  .level-hard {
    width: 5px;
    height: 70%;
    border-radius: 0px 3px 3px 0px;
    position: absolute;
    top: 15%;
    left: 0%;
    background-color: $hard;
    box-shadow: 0 0 10px $hard;
  }

  // normal level style
  .level-normal {
    @extend .level-hard;
    background-color: $normal;
    box-shadow: 0 0 10px $normal;
  }

  // easy level style
  .level-easy {
    @extend .level-hard;
    background-color: $easy;
    box-shadow: 0 0 10px $easy;
  }

  .cover-cont {
    width: 100%;
    height: 300px;
    position: relative;

    @media (max-width: $phone) {
      height: 130px;
    }

    // cover
    .cover {
      width: 90%;
      max-height: 250px;
      border-radius: 10px;
      margin: 2% 5%;
    }

    .avatar {
      position: absolute;
      bottom: 0%;
      left: 7%;
      width: 80px;
      height: 80px;
      border-radius: 5px;
      cursor: pointer;

      @media (max-width: $phone) {
        width: 50px;
        height: 50px;
        position: absolute;
        bottom: 0%;
        left: 7%;
      }
    }

    h3 {
      position: absolute;
      left: 24%;
      bottom: 0%;
      color: $font-darck;

      @media (max-width: $phone) {
        left: 40%;
        font-size: $small;
      }
    }
  }

  h5 {
    width: 90%;
    margin: 2% 5%;
    color: $font-darck;
  }

  p {
    width: 90%;
    margin: 2% 5%;
    color: $font-darck;
    font-size: $xx-small;
  }

  .buttons {
    width: 90%;
    height: auto;
    margin: 5px 5%;

    .delete {
      width: 100%;
      height: 40px;
      border: none;
      outline: none;
      border-radius: 5px;
      margin: 2px 0px;
      background-color: $red;
      color: $font-light;
      cursor: pointer;

      @media (max-width: $phone) {
        height: 30px;
      }
    }

    .update {
      @extend .delete;
      background-color: $green;
    }
  }
}

.home-work-light-English:hover {
  background-color: $message-darck;
  box-shadow: 0 0 5px $black;
}
// darck and light English style

// darck and light Arabic style
.home-work-darck-Arabic {
  width: 45%;
  max-height: auto;
  margin: 2% 2%;
  position: relative;
  padding: 10px 0px;
  border-radius: 10px;
  background-color: $card-darck;
  cursor: pointer;
  transition-duration: 0.5s;
  direction: rtl;

  // hard level style
  .level-hard {
    width: 5px;
    height: 70%;
    border-radius: 0px 3px 3px 0px;
    position: absolute;
    top: 15%;
    left: 0%;
    background-color: $hard;
    box-shadow: 0 0 10px $hard;
  }

  // normal level style
  .level-normal {
    @extend .level-hard;
    background-color: $normal;
    box-shadow: 0 0 10px $normal;
  }

  // easy level style
  .level-easy {
    @extend .level-hard;
    background-color: $easy;
    box-shadow: 0 0 10px $easy;
  }

  .cover-cont {
    width: 100%;
    height: 300px;
    position: relative;

    @media (max-width: $phone) {
      height: 130px;
    }

    // cover
    .cover {
      width: 90%;
      max-height: 250px;
      border-radius: 10px;
      margin: 2% 5%;
    }

    .avatar {
      position: absolute;
      bottom: 0%;
      right: 7%;
      width: 80px;
      height: 80px;
      border-radius: 5px;
      cursor: pointer;

      @media (max-width: $phone) {
        width: 50px;
        height: 50px;
        position: absolute;
        bottom: 0%;
        left: 7%;
      }
    }

    h3 {
      position: absolute;
      right: 24%;
      bottom: 0%;
      color: $font-light;

      @media (max-width: $phone) {
        right: 40%;
        font-size: $small;
      }
    }
  }

  h5 {
    width: 90%;
    margin: 2% 5%;
    color: $font-light;
  }

  p {
    width: 90%;
    margin: 2% 5%;
    color: $font-light;
    font-size: $xx-small;
  }

  .buttons {
    width: 90%;
    height: auto;
    margin: 5px 5%;

    .delete {
      width: 100%;
      height: 40px;
      border: none;
      outline: none;
      border-radius: 5px;
      margin: 2px 0px;
      background-color: $red;
      color: $font-light;
      cursor: pointer;

      @media (max-width: $phone) {
        height: 30px;
      }
    }

    .update {
      @extend .delete;
      background-color: $green;
    }
  }
}

.home-work-darck-Arabic:hover {
  background-color: $message-darck;
  box-shadow: 0 0 5px $black;
}

.home-work-light-Arabic {
  @extend .home-work-darck-Arabic;
  direction: rtl;
}

.home-work-light-Arabic:hover {
  background-color: $message-darck;
  box-shadow: 0 0 5px $black;
}
// darck and light Arabic style
</style>
