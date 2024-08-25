<template>
  <div
    :class="`footer-${this.$store.state.mood}-${this.$store.state.language}`"
    id="footer"
  >
    <h5 v-if="this.$store.state.user">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.footer.message
          : this.$store.state.Arabic.footer.message
      }}
      {{ this.$store.state.user.user.name }}
    </h5>
    <!-- english footer  -->
    <ul v-if="this.$store.state.language == 'English'">
      <li
        v-for="(line, index) in this.$store.state.English.footer.links"
        :key="index"
      >
        <a :href="line.link">
          {{ line.title }}
          <icon icon="arrow-right" />
        </a>
      </li>
    </ul>

    <ul v-if="this.$store.state.language == 'Arabic'">
      <li
        v-for="(line, index) in this.$store.state.Arabic.footer.links"
        :key="index"
      >
        <a :href="line.link">
          {{ line.title }}
          <icon icon="arrow-right" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "footer-component",
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";

// english
.footer-darck-English {
  width: 90%;
  margin: 5% 5% 0% 5%;
  height: auto;
  background-color: $footer-darck;
  padding: 5px;
  border-radius: 5px;
  direction: ltr;

  // title
  h5 {
    width: 100%;
    height: auto;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;
    // background-color: red;
    color: $font-light;
  }

  ul {
    width: 90%;
    margin: 1% 5%;
    height: auto;
    // background-color: blue;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 30%;
      height: auto;
      margin: 1%;
      text-align: center;
      list-style-type: none;
      cursor: pointer;
      font-size: $xx-small;
      a {
        color: $font-light;
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
        transition-duration: 0.3s;
        svg {
          transition-duration: 0.3s;
          margin: 0px 0px 0px 5px;
        }
      }
    }

    li:hover {
      a {
        color: $blue;
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
        svg {
          margin: 0px 0px 0px 10px;
        }
      }
    }
  }
}

.footer-light-English {
  @extend .footer-darck-English;
  background-color: $footer-light;

  // title
  h5 {
    border-color: transparent transparent $border-darck transparent;
    color: $font-darck;
  }

  ul {
    li {
      a {
        color: $font-darck;
      }
    }
  }
}
// english

// arabic
.footer-darck-Arabic {
  width: 90%;
  margin: 5% 5% 0% 5%;
  height: auto;
  background-color: $footer-darck;
  padding: 5px;
  border-radius: 5px;
  direction: rtl;

  // title
  h5 {
    width: 100%;
    height: auto;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;
    // background-color: red;
    color: $font-light;
  }

  ul {
    width: 90%;
    margin: 1% 5%;
    height: auto;
    // background-color: blue;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 30%;
      height: auto;
      margin: 1%;
      text-align: center;
      list-style-type: none;
      cursor: pointer;
      font-size: $xx-small;
      a {
        color: $font-light;
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
        transition-duration: 0.3s;
        svg {
          transition-duration: 0.3s;
          margin: 0px 5px 0px 0px;
          transform: rotate(180deg);
        }
      }
    }

    li:hover {
      a {
        color: $blue;
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
        svg {
          margin: 0px 0px 0px 10px;
        }
      }
    }
  }
}

.footer-light-Arabic {
  @extend .footer-darck-Arabic;
  background-color: $footer-light;

  // title
  h5 {
    border-color: transparent transparent $border-darck transparent;
    color: $font-darck;
  }

  ul {
    li {
      a {
        color: $font-darck;
      }
    }
  }
}
// arabic
</style>
