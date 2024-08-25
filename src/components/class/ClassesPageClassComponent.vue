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
</template>

<script>
export default {
  name: "classes-page-class-component",
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
  },
};
</script>

<style lang="scss">
@import "../../sass/varibels/variables";

// darck and light English style
.classes-class-darck-English {
  width: 100%;
  height: auto;
  margin: 5px 0%;
  cursor: pointer;
  display: flex;
  justify-content: start;
  position: relative;
  border-radius: 10px;
  background-color: $card-darck;
  transition-duration: 0.5s;
  direction: ltr;

  @media (min-width: $phone) {
    width: 47%;
    height: auto;
  }

  // cover
  .cover-cont {
    width: 100%;
    height: auto;
    position: relative;

    // class's cover
    .cover {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }

    // teacher avatar
    .avatar {
      width: 60px;
      height: 60px;
      border: 5px;
      position: absolute;
      bottom: -10%;
      left: 1%;

      @media (min-width: $phone) {
        bottom: -5%;
        width: 90px;
        height: 90px;
      }
    }
  }

  // info style
  .info {
    max-width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;

    h2 {
      width: 100%;
      color: $font-light;
    }

    p {
      width: auto;
      color: $font-light;
      font-size: $x-small;
      margin: 2px;
      padding: 3px;
      border-radius: 3px;
      background-color: $note-darck;
      @media (max-width: $phone) {
        font-size: $xx-small;
        padding: 2px;
      }
    }
  }

  // buttons container style
  .buttons {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    margin: 5px 0px;

    .update {
      width: 100%;
      height: 40px;
      margin: 5px 0px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      color: $font-light;
      background-color: $green;
    }

    .delete {
      width: 100%;
      height: 40px;
      border: none;
      margin: 5px 0px;
      border-radius: 5px;
      cursor: pointer;
      color: $font-light;
      background-color: $red;
    }
  }
}

.classes-class-darck-English:hover {
  box-shadow: 0 0 10px $black;
}

.classes-class-light-English {
  width: 100%;
  height: auto;
  margin: 5px 0%;
  cursor: pointer;
  display: flex;
  justify-content: start;
  position: relative;
  border-radius: 10px;
  background-color: $card-light;
  transition-duration: 0.5s;
  direction: ltr;

  @media (min-width: $phone) {
    width: 47%;
    height: auto;
  }

  // cover
  .cover-cont {
    width: 100%;
    height: auto;
    position: relative;

    // class's cover
    .cover {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }

    // teacher avatar
    .avatar {
      width: 60px;
      height: 60px;
      border: 5px;
      position: absolute;
      bottom: -10%;
      left: 1%;

      @media (min-width: $phone) {
        bottom: -5%;
        width: 90px;
        height: 90px;
      }
    }
  }

  // info style
  .info {
    max-width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;

    h2 {
      width: 100%;
      color: $font-darck;
    }

    p {
      width: auto;
      color: $font-darck;
      font-size: $x-small;
      margin: 2px;
      padding: 3px;
      border-radius: 3px;
      background-color: $note-light;

      @media (max-width: $phone) {
        font-size: $xx-small;
        padding: 2px;
      }
    }
  }

  // buttons container style
  .buttons {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    margin: 5px 0px;

    .update {
      width: 100%;
      height: 40px;
      margin: 5px 0px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      color: $font-light;
      background-color: $green;
    }

    .delete {
      width: 100%;
      height: 40px;
      border: none;
      margin: 5px 0px;
      border-radius: 5px;
      cursor: pointer;
      color: $font-light;
      background-color: $red;
    }
  }
}

.classes-class-light-English:hover {
  box-shadow: 0 0 10px $black;
}
// darck and light English style

// darck and light Arabic style
.classes-class-darck-Arabic {
  @extend .classes-class-darck-English;
  direction: rtl;
}

.classes-class-darck-Arabic:hover {
  box-shadow: 0 0 10px $black;
}

.classes-class-light-Arabic {
  @extend .classes-class-light-English;
  direction: rtl;
}

.classes-class-light-Arabic:hover {
  box-shadow: 0 0 10px $black;
}
// darck and light Arabic style
</style>
