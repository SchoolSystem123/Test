<template>
  <div
    :class="`home-work-${this.$store.state.mood}-${this.view_style}-${this.$store.state.language}`"
    @click="GoHomeWork(this.home_work._id)"
  >
    <p class="home-work">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.home_works_in_dash.component_title
          : this.$store.state.Arabic.home_works_in_dash.component_title
      }}
    </p>
    <!-- home work cover conatiner -->
    <div class="cover-cont">
      <img
        class="cover"
        :src="this.home_work.images[0]"
        alt="cover"
        v-if="this.home_work.images && this.home_work.images.length > 0"
        @click="GoHomeWork(this.home_work._id)"
      />
      <!-- home work cover conatiner -->
    </div>

    <!-- home work cover -->

    <!-- info -->
    <div class="info">
      <h4>{{ this.home_work.title.slice(0, 15) }} ...</h4>

      <!-- images length  -->
      <p v-if="this.home_work.images">
        🖼️ : {{ this.home_work.images.length }}
      </p>
      <!-- images length  -->

      <!-- description  -->
      <p>📑 : {{ this.home_work.description.slice(0, 10) }} ...</p>
      <!-- description  -->
    </div>
    <!-- info -->

    <!-- created at ( date ) -->
    <p class="created_at">📆 : {{ this.home_work.created_at.split("T")[0] }}</p>

    <!-- home work level  -->
    <div :class="`level-${this.home_work.level}`"></div>
  </div>
</template>

<script>
export default {
  name: "classes-home-work-component",
  props: {
    home_work: Object,
    view_style: String,
  },
  methods: {
    // go to the home work page
    GoHomeWork(id) {
      // add the home work id after new page link
      window.location = `/homeWork/${id}`;
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";

// darck

// card darck and light English style
.home-work-darck-window-restore-English {
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

  // cover
  img {
    width: 90%;
    max-height: 150px;
    border-radius: 10px;
    margin: 2% 5%;
  }

  .info {
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    margin: 0px 5%;

    h4 {
      color: $font-light;
      margin: 1%;
      max-height: 40px;
      border: none;
    }

    p {
      width: auto;
      padding: 3px;
      font-size: $xx-small;
      background-color: $note-darck;
      color: $font-light;
      border-radius: 3px;
      margin: 3px;
    }
  }

  p {
    width: 90%;
    margin: 2% 5%;
    color: $font-light;
    font-size: $xx-small;
  }
}

.home-work-darck-window-restore-English:hover {
  background-color: $message-darck;
  box-shadow: 0 0 5px $black;
}

.home-work-light-window-restore-English {
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

  // cover
  img {
    width: 90%;
    max-height: 150px;
    border-radius: 10px;
    margin: 2% 5%;
  }

  .info {
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    margin: 0px 5%;

    h4 {
      color: $font-darck;
      margin: 1%;
      max-height: 40px;
      border: none;
    }

    p {
      width: auto;
      padding: 3px;
      font-size: $xx-small;
      background-color: $note-light;
      color: $font-darck;
      border-radius: 3px;
      margin: 3px;
    }
  }

  p {
    width: 90%;
    margin: 2% 5%;
    color: $font-darck;
    font-size: $xx-small;
  }
}

.home-work-light-window-restore-English:hover {
  background-color: $message-light;
  box-shadow: 0 0 5px $black;
}
// card darck and light English style

// card darck and light Arabic style
.home-work-darck-window-restore-Arabic {
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
    border-radius: 3px 0px 0px 3px;
    position: absolute;
    top: 15%;
    right: 0%;
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

  // cover
  img {
    width: 90%;
    max-height: 150px;
    border-radius: 10px;
    margin: 2% 5%;
  }

  .info {
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    margin: 0px 5%;

    h4 {
      color: $font-light;
      margin: 1%;
      max-height: 40px;
      border: none;
    }

    p {
      width: auto;
      padding: 3px;
      font-size: $xx-small;
      background-color: $note-darck;
      color: $font-light;
      border-radius: 3px;
      margin: 3px;
    }
  }

  p {
    width: 90%;
    margin: 2% 5%;
    color: $font-light;
    font-size: $xx-small;
  }
}

.home-work-darck-window-restore-Arabic:hover {
  background-color: $message-darck;
  box-shadow: 0 0 5px $black;
}

.home-work-light-window-restore-Arabic {
  width: 45%;
  max-height: auto;
  margin: 2% 2%;
  position: relative;
  padding: 10px 0px;
  border-radius: 10px;
  background-color: $card-light;
  cursor: pointer;
  transition-duration: 0.5s;
  direction: rtl;

  // hard level style
  .level-hard {
    width: 5px;
    height: 70%;
    border-radius: 3px 0px 0px 3px;
    position: absolute;
    top: 15%;
    right: 0%;
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

  // cover
  img {
    width: 90%;
    max-height: 150px;
    border-radius: 10px;
    margin: 2% 5%;
  }

  .info {
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    margin: 0px 5%;

    h4 {
      color: $font-darck;
      margin: 1%;
      max-height: 40px;
      border: none;
    }

    p {
      width: auto;
      padding: 3px;
      font-size: $xx-small;
      background-color: $note-light;
      color: $font-darck;
      border-radius: 3px;
      margin: 3px;
    }
  }

  p {
    width: 90%;
    margin: 2% 5%;
    color: $font-darck;
    font-size: $xx-small;
  }
}

.home-work-light-window-restore-Arabic:hover {
  background-color: $message-light;
  box-shadow: 0 0 5px $black;
}
// card darck and light Arabic style

// list darck and ligh English style
.home-work-darck-list-English {
  width: 100%;
  height: 120px;
  margin: 1% 0%;
  position: relative;
  padding: 3% 5% 7% 5%;
  border-radius: 10px;
  background-color: $card-darck;
  cursor: pointer;
  transition-duration: 0.5s;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
  overflow: hidden;
  direction: ltr;
  // background-color: red;

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

  img {
    width: 80px;
    height: 80px;
    border-radius: 5px;
  }

  .home-work {
    width: 90%;
    height: auto;
    margin: -1% 0% 1% 2%;
    color: $font-light;
    font-size: $xx-small;
  }

  .info {
    width: 50%;
    display: flex;
    flex-wrap: wrap;

    h4 {
      color: $font-light;
      width: 60%;
      margin: 1%;
      max-height: 40px;
      border: none;
    }

    p {
      padding: 3px;
      font-size: $xx-small;
      background-color: $message-darck;
      color: $font-light;
      border-radius: 3px;
      margin: 3px;
    }
  }

  .created_at {
    width: 50%;
    height: auto;
    margin: 1%;
    color: $font-light;
    font-size: $xx-small;
    text-align: end;
    // background-color: orange;
    position: absolute;
    right: 5%;
    bottom: 10%;
    // margin-bottom: 5%;
  }
}

.home-work-darck-list-English:hover {
  background-color: $message-darck;
  box-shadow: 0 0 5px $black;
}

.home-work-light-list-English {
  width: 100%;
  height: 120px;
  margin: 1% 0%;
  position: relative;
  padding: 3% 5% 7% 5%;
  border-radius: 10px;
  background-color: $card-light;
  cursor: pointer;
  transition-duration: 0.5s;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
  overflow: hidden;
  direction: ltr;
  // background-color: red;

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

  img {
    width: 80px;
    height: 80px;
    border-radius: 5px;
  }

  .home-work {
    width: 90%;
    height: auto;
    margin: -1% 0% 1% 2%;
    color: $font-darck;
    font-size: $xx-small;
  }

  .info {
    width: 50%;
    display: flex;
    flex-wrap: wrap;

    h4 {
      color: $font-darck;
      width: 60%;
      margin: 1%;
      max-height: 40px;
      border: none;
    }

    p {
      padding: 3px;
      font-size: $xx-small;
      background-color: $message-light;
      color: $font-darck;
      border-radius: 3px;
      margin: 3px;
    }
  }

  .created_at {
    width: 50%;
    height: auto;
    margin: 1%;
    color: $font-darck;
    font-size: $xx-small;
    text-align: end;
    position: absolute;
    right: 5%;
    bottom: 10%;
  }
}

.home-work-light-list-English:hover {
  background-color: $message-light;
  box-shadow: 0 0 5px $black;
}
// list darck and ligh English style

// list darck and light Arabic style
.home-work-darck-list-Arabic {
  width: 100%;
  height: 120px;
  margin: 1% 0%;
  position: relative;
  padding: 3% 5% 7% 5%;
  border-radius: 10px;
  background-color: $card-darck;
  cursor: pointer;
  transition-duration: 0.5s;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
  overflow: hidden;
  direction: rtl;
  // background-color: red;

  // hard level style
  .level-hard {
    width: 5px;
    height: 70%;
    border-radius: 3px 0px 0px 3px;
    position: absolute;
    top: 15%;
    right: 0%;
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

  img {
    width: 80px;
    height: 80px;
    border-radius: 5px;
  }

  .home-work {
    width: 90%;
    height: auto;
    margin: -1% 0% 1% 2%;
    color: $font-light;
    font-size: $xx-small;
  }

  .info {
    width: 50%;
    display: flex;
    flex-wrap: wrap;

    h4 {
      color: $font-light;
      width: 60%;
      margin: 1%;
      max-height: 40px;
      border: none;
    }

    p {
      padding: 3px;
      font-size: $xx-small;
      background-color: $message-darck;
      color: $font-light;
      border-radius: 3px;
      margin: 3px;
    }
  }

  .created_at {
    width: 50%;
    height: auto;
    margin: 1%;
    color: $font-light;
    font-size: $xx-small;
    text-align: end;
    position: absolute;
    left: 5%;
    bottom: 10%;
  }
}

.home-work-darck-list-Arabic:hover {
  background-color: $message-darck;
  box-shadow: 0 0 5px $black;
}

.home-work-light-list-Arabic {
  width: 100%;
  height: 120px;
  margin: 1% 0%;
  position: relative;
  padding: 3% 5% 7% 5%;
  border-radius: 10px;
  background-color: $card-light;
  cursor: pointer;
  transition-duration: 0.5s;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
  overflow: hidden;
  direction: rtl;
  // background-color: red;

  // hard level style
  .level-hard {
    width: 5px;
    height: 70%;
    border-radius: 3px 0px 0px 3px;
    position: absolute;
    top: 15%;
    right: 0%;
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

  img {
    width: 80px;
    height: 80px;
    border-radius: 5px;
  }

  .home-work {
    width: 90%;
    height: auto;
    margin: -1% 0% 1% 2%;
    color: $font-darck;
    font-size: $xx-small;
  }

  .info {
    width: 50%;
    display: flex;
    flex-wrap: wrap;

    h4 {
      color: $font-darck;
      width: 60%;
      margin: 1%;
      max-height: 40px;
      border: none;
    }

    p {
      padding: 3px;
      font-size: $xx-small;
      background-color: $message-light;
      color: $font-darck;
      border-radius: 3px;
      margin: 3px;
    }
  }

  .created_at {
    width: 50%;
    height: auto;
    margin: 1%;
    color: $font-darck;
    font-size: $xx-small;
    text-align: end;
    position: absolute;
    left: 5%;
    bottom: 10%;
  }
}

.home-work-light-list-Arabic:hover {
  background-color: $message-light;
  box-shadow: 0 0 5px $black;
}
// list darck and light Arabic style
</style>
