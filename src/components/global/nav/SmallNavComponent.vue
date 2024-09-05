<template>
  <div :class="`small-nav-${this.$store.state.mood}`">
    <icon
      icon="bars"
      @click="this.$store.commit('changeSidBarStatus')"
      id="bars"
    />

    <router-link to="/messages">
      <icon icon="bell" />
      <p v-if="this.$store.state.messages_count > 0">
        {{ this.$store.state.messages_count }}
      </p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "small-nav-component",
};
</script>

<style lang="scss">
@import "../../../Sass/varibels/variables";

.small-nav-darck {
  width: 90%;
  height: auto;
  padding: 10px;
  border-radius: 5px;
  backdrop-filter: blur(30px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 10px;
  left: 5%;
  z-index: 50;
  @media (min-width: $tablet) {
    width: 50%;
    left: 25%;
  }

  svg {
    font-size: $large;
    color: $font-light;
    cursor: pointer;
  }

  #bars {
    padding: 5px;
    border: 1px solid $border-light;
    border-radius: 5px;
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

.small-nav-light {
  @extend .small-nav-darck;

  svg {
    color: $font-darck;
  }

  #bars {
    border: 1px solid $border-darck;
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
      color: $font-darck;
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
</style>
