<template>
  <div
    :class="`dash-message-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <!-- message title  -->
    <h3>{{ this.message_data.title }}</h3>
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
      {{ this.message_data.description }}
    </div>
    <!-- message description  -->

    <!-- note component  -->
    <NoteComponentVue
      v-if="this.message_data.note"
      :note="this.message_data.note"
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
        {{ this.message_data.recipient }}
      </p>
      <!--  recipient  -->

      <!--  craeted at  -->
      <p v-if="this.message_data.created_at">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.messgae_component.created_at
            : this.$store.state.Arabic.messgae_component.created_at
        }}
        {{ this.message_data.created_at.split("T")[0] }}
      </p>
      <!--  craeted at  -->

      <!--  craeted by  -->
      <p @click="GetAuthor(this.message_data.created_by._id)">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.messgae_component.created_by
            : this.$store.state.Arabic.messgae_component.created_by
        }}
        <img
          :src="this.message_data.created_by.avatar"
          alt="avatar"
          class="author"
        />
        {{ this.message_data.created_by.name }}
      </p>
      <!--  craeted by  -->
    </div>

    <!--  level  -->
    <div :class="`level-${this.message_data.level}`"></div>
    <!--  level  -->

    <!-- buttons -->
    <button class="update" @click="GoUpdateMessgae">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.messgae_component.update
          : this.$store.state.Arabic.messgae_component.update
      }}
    </button>
    <button class="delete" @click="DeleteMessage">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.messgae_component.delete
          : this.$store.state.Arabic.messgae_component.delete
      }}
    </button>
    <!-- buttons -->
  </div>
</template>

<script>
import NoteComponentVue from "@/components/global/NoteComponent.vue";
export default {
  name: "message-dash-component",
  data() {
    return {};
  },
  props: {
    message_data: Object,
  },
  mounted() {},
  components: {
    NoteComponentVue,
  },
  methods: {
    // go to update message method
    GoUpdateMessgae() {
      // set the message data to message_for_update in store
      this.$store.state.message_for_update = this.message_data;

      // change the active component
      this.$store.state.active_component_in_dash = "update-message";
    },

    // delete messages method
    async DeleteMessage() {
      // set the message id to the message_id_for_delete in store
      this.$store.state.message_id_for_delete = this.message_data._id;

      // to open the deleteing the message verify form
      this.$store.commit("OpenOrCloseDeleteMessage");
    },

    // go to message author method
    GetAuthor(id) {
      window.location = `/admin/${id}`;
    },
  },
};
</script>

<style lang="scss">
@import "../../../Sass/varibels/variables";
// darck and light English style
.dash-message-darck-English {
  width: 100%;
  height: auto;
  margin: 10px 0%;
  padding: 0px 10px;
  border-radius: 10px;
  background-color: $card-darck;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
  position: relative;
  direction: ltr;

  @media (min-width: $phone) {
    width: 47%;
    height: auto;
  }

  // message title
  h3 {
    width: 100%;
    height: auto;
    padding: 5px 0px;
    margin: 5px 0%;
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
    width: 100%;
    height: auto;
    margin: 5px 0%;
    font-size: $x-small;
    color: $font-light;
    padding: 3px;
    border-radius: 3px;
  }

  .notes {
    width: 100%;
    height: auto;
    margin: 5px 0%;
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

  .delete {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: none;
    color: $font-light;
    cursor: pointer;
    background-color: $red;
    margin: 5px 0px;
  }

  .update {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: none;
    color: $font-light;
    cursor: pointer;
    background-color: $green;
    margin: 5px 0px;
  }
}

.dash-message-light-English {
  width: 100%;
  height: auto;
  margin: 10px 0%;
  padding: 0px 10px;
  border-radius: 10px;
  background-color: $card-light;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
  position: relative;
  direction: ltr;

  @media (min-width: $phone) {
    width: 47%;
    height: auto;
  }

  // message title
  h3 {
    width: 100%;
    height: auto;
    padding: 5px 0px;
    margin: 5px 0%;
    color: $font-darck;
    border: 1px solid;
    border-color: transparent transparent $border-darck transparent;
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
    width: 100%;
    height: auto;
    margin: 5px 0%;
    font-size: $x-small;
    color: $font-darck;
    padding: 3px;
    border-radius: 3px;
  }

  .notes {
    width: 100%;
    height: auto;
    margin: 5px 0%;
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
      background-color: $note-light;
      color: $font-darck;
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

  .delete {
    width: 90%;
    height: 40px;
    border-radius: 10px;
    border: none;
    color: $font-light;
    cursor: pointer;
    background-color: $red;
  }

  .update {
    width: 90%;
    height: 40px;
    border-radius: 10px;
    border: none;
    color: $font-light;
    cursor: pointer;
    background-color: $green;
  }

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

  .delete {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: none;
    color: $font-light;
    cursor: pointer;
    background-color: $red;
    margin: 5px 0px;
  }

  .update {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: none;
    color: $font-light;
    cursor: pointer;
    background-color: $green;
    margin: 5px 0px;
  }
}
// darck and light English style

// darck and light Arabic style
.dash-message-darck-Arabic {
  @extend .dash-message-darck-English;
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

.dash-message-light-Arabic {
  @extend .dash-message-darck-Arabic;
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
