<template>
  <div
    :class="`error-form-${this.$store.state.mood}-${this.$store.state.error_form_status}`"
  >
    <div class="header">
      <h2>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.error
            : this.$store.state.Arabic.error
        }}
      </h2>
      <icon icon="xmark" @click="this.$store.commit('ChangeErrorFormStatus')" />
    </div>
    <p v-if="typeof this.$store.state.error_message == 'object'">
      ❌
      {{
        this.$store.state.language == "English"
          ? this.$store.state.error_message.english
          : this.$store.state.error_message.arabic
      }}
      ❌
    </p>

    <p v-else>
      {{
        this.$store.state.language == "English"
          ? "Internal Error ..."
          : "... خطأ عام"
      }}
    </p>
  </div>
</template>

<script>
export default {
  name: "error-form",
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";

// darck close error form
.error-form-darck-close {
  width: 50%;
  min-height: 20%;
  border-radius: 5px;
  backdrop-filter: blur(100px);
  box-shadow: 0 0 5px $black;
  transition-duration: 0.5s;
  position: fixed;
  top: -50%;
  left: 25%;
  z-index: 50;
  display: flex;
  flex-wrap: wrap;
  @media (max-width: $phone) {
    width: 90%;
    left: 5%;
  }

  .header {
    width: 100%;
    height: 20%;
    padding: 10px 0px;
    text-align: center;
    color: $font-light;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;

    svg {
      color: $font-light;
      position: absolute;
      font-size: $x-large;
      right: 5%;
      top: 15%;
      cursor: pointer;
      transition-duration: 0.5s;

      @media (max-width: $phone) {
        font-size: $large;
        top: 13%;
      }
    }

    svg:hover {
      transform: rotate(360deg);
    }
  }

  p {
    width: 90%;
    height: auto;
    margin: 20px auto;
    text-align: center;
    color: $font-light;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

// darck open error form
.error-form-darck-open {
  @extend .error-form-darck-close;
  top: 30%;
}

// light close error form
.error-form-light-close {
  @extend .error-form-darck-close;

  .header {
    color: $font-darck;
    border-color: transparent transparent $border-darck transparent;

    svg {
      color: $font-darck;
    }
  }

  p {
    color: $font-darck;
  }
}

// light open error form
.error-form-light-open {
  @extend .error-form-light-close;
  top: 30%;
}
</style>
