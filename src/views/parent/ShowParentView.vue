<template>
  <div
    :class="`show-parent-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <SmallNavComponentVue />
    <SidBarComponentVue />
    <ErrorComponentVue />
    <LoadingComponentVue />

    <!-- container  -->
    <div :class="this.status ? 'cont-open' : 'cont-open'"></div>
    <!-- container  -->

    <!-- scroll to top method -->
    <ScrollTopComponentVue :scroll_page="this.scroll_page" />
    <!-- scroll to top method -->
  </div>
</template>

<script>
//? importing components
import SmallNavComponentVue from "@/components/global/nav/SmallNavComponent.vue";
import SidBarComponentVue from "@/components/global/SidBarComponent.vue";
import ErrorComponentVue from "@/components/global/ErrorComponent.vue";
import LoadingComponentVue from "@/components/global/LoadingComponent.vue";
import ScrollTopComponentVue from "@/components/global/ScrollTopComponent.vue";
import axios from "axios";

export default {
  name: "show-parent-page",
  data() {
    return {
      // open or close the compoenet
      status: false,
      // to open or close the scrollTp button
      scroll_page: 0,
    };
  },
  components: {
    SmallNavComponentVue,
    SidBarComponentVue,
    ErrorComponentVue,
    LoadingComponentVue,
    ScrollTopComponentVue,
  },
  mounted() {
    setTimeout(() => {
      // open the loading animation
      this.$store.state.loading = "open";
    }, 200);

    // call to handel scroll method on scroll
    window.addEventListener("sceoll", this.handelScroll);

    // call to get parent data method
    this.GetParent();
  },
  methods: {
    // get to parent data method
    async GetParent() {
      await axios
        .get(this.$store.state.APIs.parents.get_one, {
          params: {
            parent: this.$route.params.id,
          },
        })
        .then((response) => {
          // open the page conatiner
          this.status = true;

          // to stop the loading animation
          this.$store.state.loading = "close";

          // set the parent data from response to parent var in store
          this.$store.state.parent = response.data.parent_data;
        })
        .catch((error) => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // to set the reqeust's error message to error message var in store
          this.$store.state.error_message = error.response.data.message;

          // to open the error form
          this.$store.state.error_form_status = "open";
        });
    },

    // handel scroll method
    handelScroll() {
      this.scroll_page = window.scrollY;
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";

// Darck and light English style
.show-parent-darck-English {
  width: 100%;
  min-height: 100vh;
  background-color: $body-darck;
  direction: ltr;

  .cont-open {
    width: 50%;
    min-height: 100vh;
    margin: auto;
    padding: 10% 0px 10px 0px;
    opacity: 1;
    transition-duration: 0.5s;
    @media (max-width: $phone) {
      padding: 20% 0px 10px 0px;
      width: 100%;
    }

    // section-one container
    .section-one {
      width: 90%;
      height: auto;
      margin: 10px 5%;
      padding: 5px;
      border-radius: 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      align-items: center;
      background-color: $card-darck;
      position: relative;

      // update profile icon
      .update-icon {
        position: absolute;
        top: 5px;
        right: 5px;
        text-decoration: none;
        padding: 3px;
        border-radius: 3px;
        background-color: $note-darck;
      }

      // avatar container blue style
      .avatar-blue {
        width: 150px;
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        background: linear-gradient(to top, $first-blue, $second-blue);

        @media (max-width: $phone) {
          width: 100px;
          height: 100px;
        }

        // avatar
        .avatar-img {
          width: 90%;
          height: 90%;
          border-radius: 10px;
        }
      }

      // avatar container orange style
      .avatar-orange {
        @extend .avatar-blue;
        background: linear-gradient(to top, $first-orange, $second-orange);
      }

      // avatar container pink style
      .avatar-pink {
        @extend .avatar-blue;
        background: linear-gradient(to top, $first-pink, $second-pink);
      }

      // avatar container green style
      .avatar-green {
        @extend .avatar-blue;
        background: linear-gradient(to top, $first-green, $second-green);
      }

      // info container style
      .info {
        min-width: 60%;
        height: 100%;
        margin: 0px 10px;

        // name
        h2 {
          max-width: 100%;
          height: auto;
          color: $font-light;
        }

        // points
        h3 {
          max-width: 100%;
          height: auto;
          color: $font-light;
        }
      }

      // notes style
      .notes {
        width: 100%;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;
        margin: 5px 0px;

        p {
          width: auto;
          height: auto;
          background-color: $note-darck;
          border-radius: 3px;
          padding: 3px;
          color: $font-light;
          font-size: $x-small;
          margin: 3px;
        }

        .editor,
        .admin {
          width: auto;
          height: auto;
          background-color: $green;
          border-radius: 3px;
          padding: 3px;
          color: $font-light;
          font-size: $x-small;
          margin: 3px;
        }

        .supper_admin {
          @extend .editor;
          background-color: $red;
        }
      }

      // copy id component style in profile page
      p {
        padding: 3px;
        max-width: 90%;
        border-radius: 3px;
        background-color: $note-darck;
        margin: 3px;
      }

      // about me
      .content {
        width: 98%;
        height: auto;
        margin: 10px 1%;
        font-size: $small;
        background-color: $note-darck;
        color: $font-light;
        padding: 5px;
        border-radius: 3px;
      }

      // mesals section
      .medals {
        width: 98%;
        height: auto;
        margin: 10px 1%;
        color: $font-light;
        padding: 5px;
        border-radius: 3px;
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;

        span {
          width: 98%;
          height: auto;
          margin: 5px 1%;
          padding: 5px 0px;
          color: $font-light;
          border: 1px solid;
          border-color: transparent transparent $border-light transparent;
        }

        p {
          width: auto;
          height: auto;
          font-size: $x-small;
          padding: 3px;
          border-radius: 3px;
          background-color: $note-darck;
          color: $font-light;
        }
      }
    }

    // section-tow container style
    .section-tow {
      @extend .section-one;
      margin: 10px 5%;

      // section tow title
      .title {
        width: 98%;
        height: auto;
        margin: 10px 1%;
        color: $font-light;
        border: 1px solid;
        border-color: transparent transparent $border-light transparent;
      }

      // link to go my classes
      a {
        width: 100%;
        height: auto;
        padding: 10px 0px;
        color: $blue;
        cursor: pointer;
        text-align: center;
        text-decoration: none;
        font-size: $x-small;

        svg {
          margin: 0px 5px;
        }
      }

      .default_message {
        width: 100%;
        margin: 5px 5%;
        height: auto;
        text-align: center;
        font-size: $small;
        background-color: none;
        color: $font-light;
      }
    }
  }

  .cont-close {
    @extend .cont-open;
    padding: 30% 0px 0px 0px;
    opacity: 0;
    transition-duration: 0.5s;
  }
}

.show-parent-light-English {
  width: 100%;
  min-height: 100vh;
  background-color: $body-light;
  direction: ltr;

  .cont-open {
    width: 50%;
    min-height: 100vh;
    margin: auto;
    padding: 10% 0px 10px 0px;
    opacity: 1;
    transition-duration: 0.5s;
    @media (max-width: $phone) {
      padding: 20% 0px 10px 0px;
      width: 100%;
    }

    // section-one container
    .section-one {
      width: 90%;
      height: auto;
      margin: 10px 5%;
      padding: 5px;
      border-radius: 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      align-items: center;
      background-color: $card-light;
      position: relative;

      // update profile icon
      .update-icon {
        position: absolute;
        top: 5px;
        right: 5px;
        text-decoration: none;
        padding: 3px;
        border-radius: 3px;
        background-color: $note-light;
      }

      // avatar container blue style
      .avatar-blue {
        width: 150px;
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        background: linear-gradient(to top, $first-blue, $second-blue);

        @media (max-width: $phone) {
          width: 100px;
          height: 100px;
        }

        // avatar
        .avatar-img {
          width: 90%;
          height: 90%;
          border-radius: 10px;
        }
      }

      // avatar container orange style
      .avatar-orange {
        @extend .avatar-blue;
        background: linear-gradient(to top, $first-orange, $second-orange);
      }

      // avatar container pink style
      .avatar-pink {
        @extend .avatar-blue;
        background: linear-gradient(to top, $first-pink, $second-pink);
      }

      // avatar container green style
      .avatar-green {
        @extend .avatar-blue;
        background: linear-gradient(to top, $first-green, $second-green);
      }

      // info container style
      .info {
        min-width: 60%;
        height: 100%;
        margin: 0px 10px;

        // name
        h2 {
          max-width: 100%;
          height: auto;
          color: $font-darck;
        }

        // points
        h3 {
          max-width: 100%;
          height: auto;
          color: $font-darck;
        }
      }

      // notes style
      .notes {
        width: 100%;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;
        margin: 5px 0px;

        p {
          width: auto;
          height: auto;
          background-color: $note-light;
          border-radius: 3px;
          padding: 3px;
          color: $font-darck;
          font-size: $x-small;
          margin: 3px;
        }

        .editor,
        .admin {
          width: auto;
          height: auto;
          background-color: $green;
          border-radius: 3px;
          padding: 3px;
          color: $font-darck;
          font-size: $x-small;
          margin: 3px;
        }

        .supper_admin {
          @extend .editor;
          background-color: $red;
        }
      }

      // copy id component style in profile page
      p {
        padding: 3px;
        max-width: 90%;
        border-radius: 3px;
        background-color: $note-light;
        margin: 3px;
      }

      // about me
      .content {
        width: 98%;
        height: auto;
        margin: 10px 1%;
        font-size: $small;
        background-color: $note-light;
        color: $font-darck;
        padding: 5px;
        border-radius: 3px;
      }

      // mesals section
      .medals {
        width: 98%;
        height: auto;
        margin: 10px 1%;
        color: $font-darck;
        padding: 5px;
        border-radius: 3px;
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;

        span {
          width: 98%;
          height: auto;
          margin: 5px 1%;
          padding: 5px 0px;
          color: $font-darck;
          border: 1px solid;
          border-color: transparent transparent $border-darck transparent;
        }

        p {
          width: auto;
          height: auto;
          font-size: $x-small;
          padding: 3px;
          border-radius: 3px;
          background-color: $note-light;
          color: $font-darck;
        }
      }
    }

    // section-tow container style
    .section-tow {
      @extend .section-one;
      margin: 10px 5%;

      // section tow title
      .title {
        width: 98%;
        height: auto;
        margin: 10px 1%;
        color: $font-darck;
        border: 1px solid;
        border-color: transparent transparent $border-darck transparent;
      }

      // link to go my classes
      a {
        width: 100%;
        height: auto;
        padding: 10px 0px;
        color: $blue;
        cursor: pointer;
        text-align: center;
        text-decoration: none;
        font-size: $x-small;

        svg {
          margin: 0px 5px;
        }
      }

      .default_message {
        width: 100%;
        margin: 5px 5%;
        height: auto;
        text-align: center;
        font-size: $small;
        background-color: none;
        color: $font-darck;
      }
    }
  }

  .cont-close {
    @extend .cont-open;
    padding: 30% 0px 0px 0px;
    opacity: 0;
    transition-duration: 0.5s;
  }
}
// Darck and light English style

// Darck and light Arabic style
.show-parent-darck-Arabic {
  @extend .show-parent-darck-English;
  direction: rtl;
}

.show-parent-light-Arabic {
  @extend .show-parent-light-English;
  direction: rtl;
}
// Darck and light Arabic style
</style>
