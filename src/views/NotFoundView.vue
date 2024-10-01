<template>
  <div
    :class="`not-found-page-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <SmallNavComponent />
    <SidBarComponent />
    <div :class="this.status ? 'cont-open' : 'cont-close'">
      <div class="section">
        <img src="../assets/logo.png" alt="" />
        <h4>
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.not_found.default_message
              : this.$store.state.Arabic.not_found.default_message
          }}
        </h4>
        <router-link to="/">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.not_found.page
              : this.$store.state.Arabic.not_found.page
          }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
//? importing the components
import SidBarComponent from "@/components/global/SidBarComponent.vue";
import SmallNavComponent from "@/components/global/nav/SmallNavComponent.vue";
export default {
  data() {
    return {
      // page status
      status: false,
    };
  },
  components: {
    SmallNavComponent,
    SidBarComponent,
  },
  mounted() {
    setTimeout(() => {
      this.status = true;
    }, 200);
  },
};
</script>

<style lang="scss">
@import "../Sass/varibels/variables";

// Darck and light English
.not-found-page-darck-English {
  width: 100%;
  min-height: 100vh;
  background-color: $body-darck;
  direction: ltr;

  .cont-open {
    width: 50%;
    min-height: 100vh;
    margin: auto;
    padding: 10% 0% 5% 0%;
    transition-duration: 0.5s;
    opacity: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: $phone) {
      width: 100%;
      min-height: 100vh;
      padding: 20% 0% 0% 0%;
    }

    .section {
      width: 100%;
      height: auto;

      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;

      @media (max-width: $phone) {
        margin-top: -80%;
      }

      img {
        width: 100px;
        height: 100px;
        margin: 10px 0px;
      }

      // page title
      h4 {
        width: 90%;
        height: auto;
        margin: 5px 5%;
        padding: 5px 10px;
        text-align: center;
        color: $font-light;
        background-color: $note-darck;
        border-radius: 5px;
      }

      a {
        width: 90%;
        height: 30px;
        margin: 5px 5%;
        color: $font-light;
        // padding: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: $blue;
        cursor: pointer;
        border-radius: 5px;
        text-align: center;
        text-decoration: none;
      }
    }
  }

  // closed cont style
  .cont-close {
    @extend .cont-open;
    padding: 20% 0px 10px 0px;
    transition-duration: 0.5s;
    opacity: 0;
    @media (max-width: $phone) {
      padding: 40% 0% 0% 0%;
    }
  }
}

.not-found-page-light-English {
  width: 100%;
  min-height: 100vh;
  background-color: $body-light;
  direction: ltr;

  .cont-open {
    width: 50%;
    min-height: 100vh;
    margin: auto;
    padding: 10% 0% 5% 0%;
    transition-duration: 0.5s;
    opacity: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: $phone) {
      width: 100%;
      min-height: 100vh;
      padding: 20% 0% 0% 0%;
    }

    .section {
      width: 100%;
      height: auto;

      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;

      @media (max-width: $phone) {
        margin-top: -80%;
      }

      img {
        width: 100px;
        height: 100px;
        margin: 10px 0px;
      }

      // page title
      h4 {
        width: 90%;
        height: auto;
        margin: 5px 5%;
        padding: 5px 10px;
        text-align: center;
        color: $font-darck;
        background-color: $note-light;
        border-radius: 5px;
      }

      a {
        width: 90%;
        height: 30px;
        margin: 5px 5%;
        color: $font-light;
        // padding: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: $blue;
        cursor: pointer;
        border-radius: 5px;
        text-align: center;
        text-decoration: none;
      }
    }
  }

  // closed cont style
  .cont-close {
    @extend .cont-open;
    padding: 20% 0px 10px 0px;
    transition-duration: 0.5s;
    opacity: 0;
    @media (max-width: $phone) {
      padding: 40% 0% 0% 0%;
    }
  }
}
// Darck and light English

// Darck and light Arabic
.not-found-page-darck-Arabic {
  width: 100%;
  min-height: 100vh;
  background-color: $body-darck;
  direction: rtl;

  .cont-open {
    width: 50%;
    min-height: 100vh;
    margin: auto;
    padding: 10% 0% 5% 0%;
    transition-duration: 0.5s;
    opacity: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: $phone) {
      width: 100%;
      min-height: 100vh;
      padding: 20% 0% 0% 0%;
    }

    .section {
      width: 100%;
      height: auto;

      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;

      @media (max-width: $phone) {
        margin-top: -80%;
      }

      img {
        width: 100px;
        height: 100px;
        margin: 10px 0px;
      }

      // page title
      h4 {
        width: 90%;
        height: auto;
        margin: 5px 5%;
        padding: 5px 10px;
        text-align: center;
        color: $font-light;
        background-color: $note-darck;
        border-radius: 5px;
      }

      a {
        width: 90%;
        height: 30px;
        margin: 5px 5%;
        color: $font-light;
        // padding: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: $blue;
        cursor: pointer;
        border-radius: 5px;
        text-align: center;
        text-decoration: none;
      }
    }
  }

  // closed cont style
  .cont-close {
    @extend .cont-open;
    padding: 20% 0px 10px 0px;
    transition-duration: 0.5s;
    opacity: 0;
    @media (max-width: $phone) {
      padding: 40% 0% 0% 0%;
    }
  }
}

.not-found-page-light-Arabic {
  width: 100%;
  min-height: 100vh;
  background-color: $body-light;
  direction: rtl;

  .cont-open {
    width: 50%;
    min-height: 100vh;
    margin: auto;
    padding: 10% 0% 5% 0%;
    transition-duration: 0.5s;
    opacity: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: $phone) {
      width: 100%;
      min-height: 100vh;
      padding: 20% 0% 0% 0%;
    }

    .section {
      width: 100%;
      height: auto;

      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;

      @media (max-width: $phone) {
        margin-top: -80%;
      }

      img {
        width: 100px;
        height: 100px;
        margin: 10px 0px;
      }

      // page title
      h4 {
        width: 90%;
        height: auto;
        margin: 5px 5%;
        padding: 5px 10px;
        text-align: center;
        color: $font-darck;
        background-color: $note-light;
        border-radius: 5px;
      }

      a {
        width: 90%;
        height: 30px;
        margin: 5px 5%;
        color: $font-light;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: $blue;
        cursor: pointer;
        border-radius: 5px;
        text-align: center;
        text-decoration: none;
      }
    }
  }

  // closed cont style
  .cont-close {
    @extend .cont-open;
    padding: 20% 0px 10px 0px;
    transition-duration: 0.5s;
    opacity: 0;
    @media (max-width: $phone) {
      padding: 40% 0% 0% 0%;
    }
  }
}
// Darck and light Arabic
</style>
