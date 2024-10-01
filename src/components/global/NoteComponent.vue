<template>
  <div :id="`note-${this.$store.state.language}-cont`">
    <icon icon="question" @click="ChangeStatus" />
    <span :id="`${this.status}`">📝 : {{ this.note }}</span>
  </div>
</template>

<script>
export default {
  props: {
    note: String,
  },
  data() {
    return {
      status: "close",
    };
  },
  methods: {
    ChangeStatus() {
      console.log(this.status);
      this.status = this.status == "close" ? "open" : "close";
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";

// English
#note-English-cont {
  direction: ltr;
  svg {
    color: $font-light;
    width: 20px;
    height: 20px;
    padding: 5px;
    border-radius: 5px;
    background-color: $message-darck;
    cursor: pointer;
  }

  #open {
    width: 150px;
    height: 150px;
    position: absolute;
    left: 100%;
    top: 100%;
    backdrop-filter: blur(70px);
    font-size: $x-small;
    padding: 10px;
    border-radius: 5px;
    overflow-y: scroll;
    color: $font-light;
    box-shadow: 0 0 5px $black;
    transition-duration: 0.5s;
    opacity: 1;
  }

  #open::-webkit-scrollbar {
    width: 0px;
  }

  #close {
    @extend #open;
    width: 0px;
    height: 0px;
    opacity: 0;
    text-shadow: 0 0 5px $black;
  }
}

#note-English {
  @extend #note-English-cont;

  svg {
    color: $font-darck;
    background-color: $message-light;
  }
}
// English

// Arabic
#note-Arabic-cont {
  @extend #note-English-cont;
  direction: rtl;

  #open {
    right: 100%;
  }
}

#note-Arabic {
  @extend #note-Arabic-cont;

  svg {
    color: $font-darck;
    background-color: $message-light;
  }
}
// English
</style>
