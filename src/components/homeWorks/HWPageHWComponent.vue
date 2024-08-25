<template>
  <div
    :class="`home_works-hw-${this.$store.state.mood}-${this.$store.state.language}`"
    @click="GoToHomeWork(this.home_work_data._id)"
  >
    <!-- cover and teacher avatar cont  -->
    <div class="cover-cont">
      <img
        v-if="
          this.home_work_data.images && this.home_work_data.images.length > 0
        "
        :src="this.home_work_data.images[0]"
        alt="cover"
        class="cover"
      />

      <img
        v-if="this.home_work_data.created_by"
        :src="
          this.home_work_data.created_by != null &&
          this.home_work_data.created_by.avatar
        "
        alt="cover"
        class="avatar"
      />
    </div>
    <!-- cover and teacher avatar cont  -->

    <!-- home work title  -->
    <h2>{{ this.home_work_data.title }}</h2>
    <!-- home work title  -->

    <!-- home work subject -->
    <p>
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.home_works_component.subject
          : this.$store.state.Arabic.home_works_component.subject
      }}
      {{ this.home_work_data.subject }}
    </p>
    <!-- home work subject -->
    <!-- home work class level -->
    <p>
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.home_works_component.class_level
          : this.$store.state.Arabic.home_works_component.class_level
      }}{{ this.home_work_data.class_level }}
    </p>
    <!-- home work class level -->
    <!-- home work level -->
    <div :class="`level-${this.home_work_data.level}`"></div>
    <!-- home work level -->
    <!-- home work images length  -->
    <p>
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.home_works_component.images
          : this.$store.state.Arabic.home_works_component.images
      }}
      {{ this.home_work_data.images.length }}
    </p>
    <!-- home work images length  -->
    <!-- home work craeted at date  -->
    <p>
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.home_works_component.created_at
          : this.$store.state.Arabic.home_works_component.created_at
      }}
      {{ this.home_work_data.created_at.split("T")[0] }}
    </p>
    <!-- home work craeted at date  -->
  </div>
</template>

<script>
export default {
  name: "home_works-page-class-component",
  props: {
    home_work_data: Object,
  },
  data() {
    return {};
  },
  methods: {
    // go to home work method
    GoToHomeWork(id) {
      window.location = `/homeWork/${id}`;
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";

// darck English style
.home_works-hw-darck-English {
  width: 90%;
  height: auto;
  background: $card-darck;
  cursor: pointer;
  margin: 5%;
  border-radius: 10px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
  direction: ltr;
  transition-duration: 0.5s;

  // class's cover and avatar cont style
  .cover-cont {
    width: 96%;
    min-height: 80px;
    position: relative;
    margin: 2% 1% 2% 3%;

    .cover {
      width: 100%;
      max-height: 300px;
      border-radius: 10px;
    }

    .avatar {
      width: 70px;
      height: 70px;
      border-radius: 5px;
      position: absolute;
      left: 5px;
      bottom: 10px;
      z-index: 20;
    }
  }
  // cover and avatar cont style

  // class's title style
  h2 {
    width: 94%;
    height: auto;
    color: $font-light;
    margin: 20px 1% 0% 4%;
  }

  p {
    width: auto;
    height: auto;
    color: $font-light;
    font-size: $x-small;
    margin: 2% 5px 2% 10px;
    padding: 3px;
    border-radius: 3px;
    background-color: $note-darck;
  }

  // hard level
  .level-hard {
    width: 5px;
    height: 80%;
    border-radius: 0px 2px 2px 0px;
    box-shadow: 0 0 10px $hard;
    background-color: $hard;
    position: absolute;
    left: 0%;
    top: 10%;
  }

  // normal level
  .level-normal {
    @extend .level-hard;
    background-color: $normal;
    box-shadow: 0 0 10px $normal;
  }

  // easy level
  .level-easy {
    @extend .level-hard;
    background-color: $easy;
    box-shadow: 0 0 10px $easy;
  }
}

.home_works-hw-darck-English:hover {
  box-shadow: 0 0 10px $black;
}
// darck English style

// light English style
.home_works-hw-light-English {
  @extend .home_works-hw-darck-English;
  background: $card-light;

  // class's title style
  h2 {
    color: $font-darck;
  }

  p {
    color: $font-darck;
    background-color: $note_light;
  }
}
// darck English style

// darck Arabic style
.home_works-hw-darck-Arabic {
  @extend .home_works-hw-darck-English;
  direction: rtl;

  .cover-cont {
    width: 96%;
    min-height: 80px;
    position: relative;
    margin: 2% 1% 2% 3%;

    .avatar {
      right: 10px;
      bottom: 15px;
    }
  }

  p {
    width: auto;
    height: auto;
    color: $font-light;
    font-size: $x-small;
    margin: 1% 2%;
    background-color: $note_darck;
  }
}
// darck Arabic style

// light Arabic style
.home_works-hw-light-Arabic {
  @extend .home_works-hw-darck-Arabic;
  background: $message-light;

  // class's title style
  h2 {
    color: $font-darck;
  }

  p {
    color: $font-darck;
    background-color: $note_light;
  }
}
// darck Arabic style
</style>
