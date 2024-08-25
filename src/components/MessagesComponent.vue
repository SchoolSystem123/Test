<template>
  <div
    :class="`message-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <!-- message title  -->
    <h3>{{ this.Message_data.title }}</h3>
    <!-- message title  -->

    <!-- message description  -->
    <div class="description">
      <u>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.messgae_component.description
            : this.$store.state.Arabic.messgae_component.description
        }}
      </u>
      {{ this.Message_data.description }}
    </div>
    <!-- message description  -->

    <!-- note component  -->
    <NoteComponentVue
      v-if="this.Message_data.note"
      :note="this.Message_data.note"
    />
    <!-- note component  -->

    <div class="notes">
      <!--  recipient  -->
      <p>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.messgae_component.recipient
            : this.$store.state.Arabic.messgae_component.recipient
        }}
        {{ this.Message_data.recipient }}
      </p>
      <!--  recipient  -->

      <!--  craeted at  -->
      <p v-if="this.Message_data.created_at">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.messgae_component.created_at
            : this.$store.state.Arabic.messgae_component.created_at
        }}
        {{ this.Message_data.created_at.split("T")[0] }}
      </p>
      <!--  craeted at  -->

      <!--  craeted by  -->
      <p @click="GetAuthor(this.Message_data.created_by._id)">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.messgae_component.created_by
            : this.$store.state.Arabic.messgae_component.created_by
        }}
        <img
          :src="this.Message_data.created_by.avatar"
          alt="avatar"
          class="author"
        />
        {{ this.Message_data.created_by.name }}
      </p>
      <!--  craeted by  -->
    </div>

    <!--  level  -->
    <div :class="`level-${this.Message_data.level}`"></div>
    <!--  level  -->
  </div>
</template>

<script>
//? importing compoenets
import NoteComponentVue from "./global/NoteComponent.vue";

export default {
  name: "message-component",
  data() {
    return {};
  },
  props: {
    Message_data: Object,
  },
  components: {
    NoteComponentVue,
  },
  methods: {
    // go to message author method
    GetAuthor(id) {
      window.location = `/admin/${id}`;
    },
  },
};
</script>

<style lang="scss">
@import "../Sass/varibels/variables";

// darck and light English style
.message-darck-English {
  width: 90%;
  height: auto;
  margin: 10px 5%;
  border-radius: 10px;
  background-color: $card-darck;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
  position: relative;

  // message title
  h3 {
    width: 90%;
    height: auto;
    padding: 5px 0px;
    margin: 5px 5%;
    color: $font-light;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;
  }

  // note compoenent
  #note-English-cont {
    direction: rtl;
    position: absolute;
    right: 5px;
    top: 5px;
    z-index: 50;

    #open {
      position: absolute;
      right: 100%;
    }
  }

  // message description
  .description {
    width: 90%;
    height: auto;
    margin: 5px 5%;
    font-size: $x-small;
    color: $font-light;
    padding: 3px;
    border-radius: 3px;
  }

  .notes {
    width: 90%;
    height: auto;
    margin: 5px 5%;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;

    // message's notes
    p {
      width: auto;
      height: auto;
      padding: 3px;
      margin: 3px;
      border-radius: 3px;
      background-color: $note-darck;
      color: $font-light;
      font-size: $x-small;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .author {
      width: 20px;
      height: 20px;
      border-radius: 3px;
      margin: 0px 2px;
    }
  }

  // message level light
  .level-important {
    width: 7px;
    height: 80%;
    position: absolute;
    left: 0%;
    top: 10%;
    background-color: $important-message;
    box-shadow: 0 0 10px $important-message;
    border-radius: 0px 3px 3px 0px;
  }

  // message level light
  .level-normal {
    @extend .level-important;
    background-color: $normal-message;
    box-shadow: 0 0 10px $normal-message;
  }

  // message level light
  .level-veryimportant {
    @extend .level-important;
    background-color: $veryimportant-message;
    box-shadow: 0 0 10px $veryimportant-message;
  }
}

.message-light-English {
  @extend .message-darck-English;
  background-color: $card-light;

  // note compoenent
  #note-English-cont {
    direction: rtl;
    position: absolute;
    right: 5px;
    top: 5px;
    z-index: 50;

    svg {
      color: $font-darck;
      background-color: $font-light;
    }

    #open {
      color: $font-darck;
    }
  }

  // message title
  h3 {
    color: $font-darck;
    border-color: transparent transparent $border-darck transparent;
  }

  // message description
  .description {
    color: $font-darck;
  }

  .notes {
    // message's notes
    p {
      background-color: $note-light;
      color: $font-darck;
    }
  }
}
// darck and light English style

// darck and light Arabic style
.message-darck-Arabic {
  @extend .message-darck-English;
  direction: rtl;

  // note compoenent
  #note-English-cont {
    direction: rtl;
    position: absolute;
    right: 92%;
    top: 5px;
    z-index: 50;

    @media (max-width: $phone) {
      right: 88%;
    }

    #open {
      position: absolute;
      right: -400%;
    }
  }
}

.message-light-Arabic {
  @extend .message-light-English;
  direction: rtl;

  // note compoenent
  #note-English-cont {
    direction: rtl;
    position: absolute;
    right: 92%;
    top: 5px;
    z-index: 50;

    @media (max-width: $phone) {
      right: 88%;
    }

    svg {
      color: $font-darck;
      background-color: $font-light;
    }
    #open {
      position: absolute;
      right: -400%;
    }
  }
}
// darck and light Arabic style
</style>
