<template>
  <div :class="`info-${this.$store.state.mood}-${this.$store.state.language}`">
    <icon icon="circle-info" @click="ChangeStatus" />
    <p :class="`${this.status}`">
      📌 :
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.login.info
          : this.$store.state.Arabic.login.info
      }}
    </p>
  </div>
</template>

<script>
export default {
  name: "info-component",
  data() {
    return {
      status: "close",
    };
  },
  methods: {
    ChangeStatus() {
      this.status = this.status == "close" ? "open" : "close";
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/_variables.scss";

// darck and light English Style
.info-darck-English {
  color: $font-light;
  position: absolute;
  right: 1%;
  cursor: pointer;

  svg {
    transition-duration: 0.5s;
  }

  svg:hover {
    color: $blue;
  }

  .close {
    width: 0px;
    height: 0px;
    border-radius: 5px;
    backdrop-filter: blur(90px);
    padding: 5px 10px;
    overflow-y: scroll;
    position: absolute;
    top: 120%;
    right: 30%;
    transition-duration: 0.5s;
  }
  .close::-webkit-scrollbar {
    width: 0px;
  }

  .open {
    @extend .close;
    width: 200px;
    height: 150px;
  }
}

.info-light-English {
  @extend .info-darck-English;
  color: $font-darck;
}
// darck and light English Style

// darck and light Arabic Style
.info-darck-Arabic {
  color: $font-light;
  position: absolute;
  left: 1%;
  cursor: pointer;

  svg {
    transition-duration: 0.5s;
  }

  svg:hover {
    color: $blue;
  }

  .close {
    width: 0px;
    height: 0px;
    border-radius: 5px;
    backdrop-filter: blur(90px);
    padding: 5px 10px;
    overflow-y: scroll;
    position: absolute;
    top: 120%;
    left: 30%;
    transition-duration: 0.5s;
  }

  .close::-webkit-scrollbar {
    width: 0px;
  }

  .open {
    @extend .close;
    width: 200px;
    height: 150px;
  }
}

.info-light-Arabic {
  @extend .info-darck-Arabic;
  color: $font-darck;
}
// darck and light Arabic Style
</style>
