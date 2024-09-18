<template>
  <div
    :class="`add-options-${this.$store.state.mood}-${this.$store.state.language}-${this.$store.state.add_option_form_status}`"
  >
    <!-- header  -->
    <div class="header">
      <h3>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.add_option_component.title
            : this.$store.state.Arabic.add_option_component.title
        }}
      </h3>

      <icon
        icon="xmark"
        @click="this.$store.commit('ChangeAddOptionFormStatus')"
      />
    </div>
    <!-- header  -->

    <!-- form  -->
    <div class="form">
      <!-- option title  -->
      <label for="option">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.add_option_component.option
            : this.$store.state.Arabic.add_option_component.option
        }}
      </label>

      <input
        type="text"
        id="option"
        v-model="this.option_title"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.add_option_component.placeholder_option
            : this.$store.state.Arabic.add_option_component.placeholder_option
        "
      />
      <!-- option title  -->

      <!-- option value  -->
      <label for="value">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.add_option_component.option_value
            : this.$store.state.Arabic.add_option_component.option_value
        }}
      </label>

      <select name="" id="value" v-model="this.option_value">
        <option
          v-for="(option, index) in this.$store.state.question_value"
          :key="index"
          :value="option.value"
        >
          {{
            this.$store.state.language == "English"
              ? option.English
              : option.Arabic
          }}
        </option>
      </select>
      <!-- option value  -->

      <button @click="AddOption">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.add_option_component.button
            : this.$store.state.Arabic.add_option_component.button
        }}
      </button>
    </div>
    <!-- form  -->
  </div>
</template>

<script>
export default {
  name: "add-option-component",
  data() {
    return {
      // option title
      option_title: "",
      // option value
      option_value: false,
    };
  },
  components: {},
  mounted() {},
  methods: {
    // add the option method
    AddOption() {
      if (
        (this.option_title != "" && this.option_value) ||
        !this.option_value
      ) {
        this.$store.state.question_options.push({
          value: this.option_title,
          answer: this.option_value,
        });

        // emptying the option's data
        this.option_title = "";
        this.option_value = false;
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../../../../Sass/varibels/variables";

// darck and light English style
.add-options-darck-English-open {
  width: 60%;
  height: 45%;
  background-color: $card-darck;
  box-shadow: 0 0 10px $black;
  border-radius: 10px;
  position: absolute;
  top: 30%;
  left: 20%;
  transition-duration: 0.5s;
  z-index: 50;
  direction: ltr;

  .header {
    width: 100%;
    height: 50px;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;
    color: $font-light;
    position: relative;

    h3 {
      width: 100%;
      height: 100%;
      color: $font-light;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    svg {
      position: absolute;
      right: 15px;
      top: 15px;
      color: $font-light;
      font-size: $large;
      cursor: pointer;
    }
  }

  .form {
    width: 100%;
    height: 75%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;

    label {
      width: 98%;
      height: 30px;
      color: $font-light;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
      margin: 5px 0px;
    }

    input,
    select {
      width: 98%;
      height: 40px;
      border: none;
      border-radius: 5px;
      outline: none;
      padding: 0px 10px;
      background-color: $message-light;
    }

    button {
      padding: 10px 20px;
      margin: 10px 0px 0px 0px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      background-color: $green;
      color: $font-light;
    }
  }
}

.add-options-darck-English-close {
  @extend .add-options-darck-English-open;
  top: -50%;
  z-index: -50;
}

.add-options-light-English-open {
  width: 60%;
  height: 45%;
  background-color: $body-light;
  box-shadow: 0 0 10px $black;
  border-radius: 10px;
  position: absolute;
  top: 30%;
  left: 20%;
  transition-duration: 0.5s;
  z-index: 50;
  direction: ltr;

  .header {
    width: 100%;
    height: 50px;
    border: 1px solid;
    border-color: transparent transparent $border-darck transparent;
    color: $font-darck;
    position: relative;

    h3 {
      width: 100%;
      height: 100%;
      color: $font-darck;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    svg {
      position: absolute;
      right: 15px;
      top: 15px;
      color: $font-darck;
      font-size: $large;
      cursor: pointer;
    }
  }

  .form {
    width: 100%;
    height: 75%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;

    label {
      width: 98%;
      height: 30px;
      color: $font-darck;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
      margin: 5px 0px;
    }

    input,
    select {
      width: 98%;
      height: 40px;
      border: none;
      border-radius: 5px;
      outline: none;
      padding: 0px 10px;
      background-color: $message-light;
    }

    button {
      padding: 10px 20px;
      margin: 10px 0px 0px 0px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      background-color: $green;
      color: $font-light;
    }
  }
}

.add-options-light-English-close {
  @extend .add-options-light-English-open;
  top: -50%;
  z-index: -50;
}
// darck and light English style

// darck and light Arabic style
.add-options-darck-Arabic-open {
  width: 60%;
  height: 45%;
  background-color: $card-darck;
  box-shadow: 0 0 10px $black;
  border-radius: 10px;
  position: absolute;
  top: 30%;
  left: 20%;
  transition-duration: 0.5s;
  z-index: 50;
  direction: rtl;

  .header {
    width: 100%;
    height: 50px;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;
    color: $font-light;
    position: relative;

    h3 {
      width: 100%;
      height: 100%;
      color: $font-light;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    svg {
      position: absolute;
      right: 15px;
      top: 15px;
      color: $font-light;
      font-size: $large;
      cursor: pointer;
    }
  }

  .form {
    width: 100%;
    height: 75%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;

    label {
      width: 98%;
      height: 30px;
      color: $font-light;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
      margin: 5px 0px;
    }

    input,
    select {
      width: 98%;
      height: 40px;
      border: none;
      border-radius: 5px;
      outline: none;
      padding: 0px 10px;
      background-color: $message-light;
    }

    button {
      padding: 10px 20px;
      margin: 10px 0px 0px 0px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      background-color: $green;
      color: $font-light;
    }
  }
}

.add-options-darck-Arabic-close {
  @extend .add-options-darck-Arabic-open;
  top: -50%;
  z-index: -50;
}

.add-options-light-Arabic-open {
  width: 60%;
  height: 45%;
  background-color: $body-light;
  box-shadow: 0 0 10px $black;
  border-radius: 10px;
  position: absolute;
  top: 30%;
  left: 20%;
  transition-duration: 0.5s;
  z-index: 50;
  direction: rtl;

  .header {
    width: 100%;
    height: 50px;
    border: 1px solid;
    border-color: transparent transparent $border-darck transparent;
    color: $font-darck;
    position: relative;

    h3 {
      width: 100%;
      height: 100%;
      color: $font-darck;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    svg {
      position: absolute;
      right: 15px;
      top: 15px;
      color: $font-darck;
      font-size: $large;
      cursor: pointer;
    }
  }

  .form {
    width: 100%;
    height: 75%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;

    label {
      width: 98%;
      height: 30px;
      color: $font-darck;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
      margin: 5px 0px;
    }

    input,
    select {
      width: 98%;
      height: 40px;
      border: none;
      border-radius: 5px;
      outline: none;
      padding: 0px 10px;
      background-color: $message-light;
    }

    button {
      padding: 10px 20px;
      margin: 10px 0px 0px 0px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      background-color: $green;
      color: $font-light;
    }
  }
}

.add-options-light-Arabic-close {
  @extend .add-options-light-Arabic-open;
  top: -50%;
  z-index: -50;
}
// darck and light Arabic style
</style>
