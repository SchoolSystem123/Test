<template>
  <nav :class="`nav-${this.$store.state.mood}-${this.$store.state.theme}`">
    <div class="header">
      <img
        :src="this.$store.state.user ? this.$store.state.user.user.avatar : ''"
        alt=""
        @click="this.$store.commit('changeSidBarStatus')"
      />
      <div class="message">
        <h3>
          {{ this.$store.state.user ? this.$store.state.user.user.name : null }}
        </h3>
        <p>Good Day 👋</p>
      </div>
      <router-link to="/messages">
        <icon icon="bell" />
        <p v-if="this.$store.state.messages_count > 0">
          {{ this.$store.state.messages_count }}
        </p>
      </router-link>
    </div>
    <SuperSearchComponentVue />
  </nav>
</template>

<script>
import SuperSearchComponentVue from "./SuperSearchComponent.vue";

export default {
  name: "Nav-component",
  components: {
    SuperSearchComponentVue,
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";

.nav-darck-blue {
  width: 100%;
  height: 200px;
  background-color: $body-darck;
  box-shadow: 0 0 10px $black;
  border-radius: 10px;
  background: linear-gradient(to top, $first-blue, $second-blue);
  overflow: hidden;
  @media (max-width: $laptop) {
    width: 100%;
  }

  .header {
    width: 98%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1% 1% 10px 1%;

    img {
      width: 50px;
      height: 50px;
      border-radius: 10px;
      border: 3px solid $blue;
      cursor: pointer;
    }

    .message {
      width: 50%;
      height: auto;
      @media (max-width: $phone) {
        margin-left: -25%;
      }

      @media (min-width: $phone) {
        margin-left: -30%;
      }

      h3 {
        width: 100%;
        height: auto;
        color: $font-light;
      }

      p {
        width: 100%;
        height: auto;
        color: $font-light;
        font-size: small;
      }
    }

    a {
      width: 10%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      svg {
        cursor: pointer;
        color: $font-light;
      }

      p {
        position: absolute;
        right: 35%;
        top: -70%;

        @media (max-width: $phone) {
          top: -80%;
          right: 15%;
        }

        display: flex;
        justify-content: center;
        align-items: center;
        font-size: $xx-small;
        background-color: $red;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        color: $font-light;
      }
    }
  }
}

.nav-darck-pink {
  @extend .nav-darck-blue;
  background: linear-gradient(to top, $first-pink, $second-pink);
}

.nav-darck-orange {
  @extend .nav-darck-blue;
  background: linear-gradient(to top, $first-orange, $second-orange);
}

.nav-darck-green {
  @extend .nav-darck-blue;
  background: linear-gradient(to top, $first-green, $second-green);
}

// light mood

.nav-light-blue {
  @extend .nav-darck-blue;
  background-color: $body-light;
  background: linear-gradient(to top, $first-blue, $second-blue);
}

.nav-light-orange {
  @extend .nav-light-blue;
  background-color: $body-light;
  background: linear-gradient(to top, $first-orange, $second-orange);
}

.nav-light-pink {
  @extend .nav-light-blue;
  background-color: $body-light;
  background: linear-gradient(to top, $first-pink, $second-pink);
}

.nav-light-green {
  @extend .nav-light-blue;
  background-color: $body-light;
  background: linear-gradient(to top, $first-green, $second-green);
}
</style>
