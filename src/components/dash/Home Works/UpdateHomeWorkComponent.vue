<template>
  <div
    :class="`up-home-work-${this.$store.state.mood}-${this.$store.state.language}-${this.status}`"
  >
    <!-- header  -->
    <div class="header">
      {{
        this.$store.state.language == "Arabic"
          ? this.$store.state.English.update_home_work.page_title
          : this.$store.state.Arabic.update_home_work.page_title
      }}
    </div>
    <!-- header  -->

    <div class="images">
      <!-- section heade  -->
      <div class="head">
        <label for="images">
          <icon icon="plus" />
        </label>
        <p v-if="this.$store.state.home_work_for_update.images">
          {{ this.$store.state.home_work_for_update.images.length }}/5
        </p>
        <input type="file" id="images" />
      </div>
      <!-- section heade  -->

      <!-- images section  -->
      <div class="images-section" v-if="this.$store.state.home_work_for_update">
        <img
          v-for="(path, index) in this.$store.state.home_work_for_update.images"
          :key="index"
          :src="path"
          alt=""
        />
      </div>
      <!-- images section  -->
    </div>

    <!-- form section  -->
    <div class="form">
      <!-- title  -->
      <label for="title">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.update_home_work.title
          : this.$store.state.Arabic.update_home_work.title
      }}</label>

      <input
        type="text"
        id="title"
        v-mode="this.title"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.update_home_work.title_placeholder
            : this.$store.state.Arabic.update_home_work.title_placeholder
        "
      />
      <!-- title  -->

      <!-- description  -->
      <label for="description">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.update_home_work.description
          : this.$store.state.Arabic.update_home_work.description
      }}</label>

      <textarea
        name=""
        id="description"
        v-model="this.description"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.update_home_work.description_placeholder
            : this.$store.state.Arabic.update_home_work.description_placeholder
        "
      ></textarea>
      <!-- description  -->

      <!-- note  -->
      <label for="note">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.update_home_work.note
          : this.$store.state.Arabic.update_home_work.note
      }}</label>

      <textarea
        name=""
        id="note"
        v-model="this.note"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.update_home_work.note_placeholder
            : this.$store.state.Arabic.update_home_work.note_placeholder
        "
      ></textarea>
      <!-- note  -->

      <!-- level  -->
      <label for="level">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.update_home_work.level
          : this.$store.state.Arabic.update_home_work.level
      }}</label>

      <select name="" id="level" v-model="this.level">
        <option
          v-for="(level, index) in this.$store.state.home_work_level_list"
          :key="index"
          :value="level.value"
        >
          {{
            this.$store.state.language == "English"
              ? level.English
              : level.Arabic
          }}
        </option>
      </select>
      <!-- level  -->

      <!-- button  -->
      <button>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.update_home_work.button
            : this.$store.state.Arabic.update_home_work.button
        }}
      </button>
      <!-- button  -->
    </div>
    <!-- form section  -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "update-home-work-component",
  data() {
    return {
      // page status
      status: "close",
      // title
      title: this.$store.state.home_work_for_update.title
        ? this.$store.state.home_work_for_update.title
        : "sad",
      // description
      description: this.$store.state.home_work_for_update.description
        ? this.$store.state.home_work_for_update.description
        : "",
      // note
      note: this.$store.state.home_work_for_update.note
        ? this.$store.state.home_work_for_update.note
        : "",
      // level
      level: this.$store.state.home_work_for_update.level
        ? this.$store.state.home_work_for_update.level
        : "",
      // api
      api: "",
      // form data
      formData: "",
    };
  },
  mounted() {
    setTimeout(() => {
      this.status = "open";
      console.log(this.$store.state.home_work_for_update);
      console.log(this.$store.state.home_work_for_update.title);
      console.log(this.$store.state.home_work_for_update.description);
      console.log(this.$store.state.home_work_for_update.level);
    }, 500);
  },
  components: {},
  methods: {
    // update the home work
    async UpdateHomeWork() {
      // to start the loading
      this.$store.state.loading = "open";

      // craete headers
      const headers = {
        Authorization: `Bearer ${this.$store.state.user.token}`,
      };

      // update the api
      if (this.$store.state.user.user_type == "super") {
        this.api = this.$store.state.APIs.home_works.super.update;
      } else if (this.$store.state.user.user_type == "admin") {
        this.api = this.$store.state.APIs.home_works.admin.update;
      } else if (this.$store.state.user.user_type == "teacher") {
        this.api = this.$store.state.APIs.home_works.teacher.update;
      }

      // add the title
      if (this.title != this.$store.state.home_work_for_update.title) {
        this.formData.append("title", this.title);
      }

      // add the description
      if (
        this.description != this.$store.state.home_work_for_update.description
      ) {
        this.formData.append("description", this.description);
      }

      // add the note
      if (this.note != this.$store.state.home_work_for_update.note) {
        this.formData.append("note", this.note);
      }

      // add the level
      if (this.level != this.$store.state.home_work_for_update.level) {
        this.formData.append("level", this.level);
      }

      await axios
        .put(this.api, this.formData, { headers })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss">
@import "../../../Sass/varibels/_variables.scss";

// darck and light English Style
.up-home-work-darck-English-open {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 5% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;
  direction: ltr;

  // header
  .header {
    width: 100%;
    height: auto;
    padding: 5px 0px;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;
    color: $font-light;
  }

  .images {
    width: 100%;
    height: 200px;
    border-radius: 5px;
    background-color: $card-darck;
    overflow-y: scroll;
    margin: 10px 0px;

    .head {
      width: 98%;
      height: 30px;
      border-radius: 5px;
      margin: 10px 1%;
      position: relative;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;

      input {
        display: none;
      }

      svg {
        position: absolute;
        right: 5px;
        top: 0px;
        padding: 5px;
        border-radius: 3px;
        background-color: $blue;
        color: $font-light;
        cursor: pointer;
      }

      p {
        color: $font-light;
        position: absolute;
        left: 5px;
        top: 5px;
      }
    }

    // images section
    .images-section {
      width: 100%;
      height: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      align-items: center;
      padding: 0px 1%;

      img {
        max-width: 200px;
        max-height: 200px;
        border-radius: 5px;
        margin: 5px;
        cursor: pointer;
      }
    }
  }

  .images::-webkit-scrollbar {
    width: 0px;
  }

  // form section style
  .form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    label {
      width: 100%;
      height: auto;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
      color: $font-light;
      margin: 10px 0px;
    }

    input {
      width: 100%;
      height: 40px;
      padding-left: 10px;
      outline: none;
      border: none;
      border-radius: 5px;
      margin: 10px 0px;
      background-color: $body-light;
    }

    textarea {
      width: 100%;
      height: 120px;
      border: none;
      outline: none;
      border-radius: 5px;
      padding: 5px 10px;
      resize: none;
      background-color: $body-light;
    }

    select {
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 5px;
      outline: none;
      background-color: $body-light;
    }

    button {
      padding: 10px 20px;
      border-radius: 5px;
      border: none;
      outline: none;
      margin: 10px 0px;
      background-color: $green;
      color: $font-light;
      cursor: pointer;
    }
  }
}

.up-home-work-darck-English-open::-webkit-scrollbar {
  width: 0px;
}

.up-home-work-darck-English-close {
  @extend .up-home-work-darck-English-open;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

.up-home-work-light-English-open {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 5% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;
  direction: ltr;

  // header
  .header {
    width: 100%;
    height: auto;
    padding: 5px 0px;
    border: 1px solid;
    border-color: transparent transparent $border-darck transparent;
    color: $font-darck;
  }

  .images {
    width: 100%;
    height: 200px;
    border-radius: 5px;
    background-color: $card-light;
    overflow-y: scroll;
    margin: 10px 0px;

    .head {
      width: 98%;
      height: 30px;
      border-radius: 5px;
      margin: 10px 1%;
      position: relative;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;

      input {
        display: none;
      }

      svg {
        position: absolute;
        right: 5px;
        top: 0px;
        padding: 5px;
        border-radius: 3px;
        background-color: $blue;
        color: $font-darck;
        cursor: pointer;
      }

      p {
        color: $font-darck;
        position: absolute;
        left: 5px;
        top: 5px;
      }
    }

    // images section
    .images-section {
      width: 100%;
      height: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      align-items: center;
      padding: 0px 1%;

      img {
        max-width: 200px;
        max-height: 200px;
        border-radius: 5px;
        margin: 5px;
        cursor: pointer;
      }
    }
  }

  .images::-webkit-scrollbar {
    width: 0px;
  }

  // form section style
  .form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    label {
      width: 100%;
      height: auto;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
      color: $font-darck;
      margin: 10px 0px;
    }

    input {
      width: 100%;
      height: 40px;
      padding-left: 10px;
      outline: none;
      border: none;
      border-radius: 5px;
      margin: 10px 0px;
      background-color: $body-darck;
    }

    textarea {
      width: 100%;
      height: 120px;
      border: none;
      outline: none;
      border-radius: 5px;
      padding: 5px 10px;
      resize: none;
      background-color: $body-darck;
    }

    select {
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 5px;
      outline: none;
      background-color: $body-darck;
    }

    button {
      padding: 10px 20px;
      border-radius: 5px;
      border: none;
      outline: none;
      margin: 10px 0px;
      background-color: $green;
      color: $font-darck;
      cursor: pointer;
    }
  }
}

.up-home-work-light-English-open::-webkit-scrollbar {
  width: 0px;
}

.up-home-work-light-English-close {
  @extend .up-home-work-darck-English-open;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}
// darck and light English Style

// darck and light Arabic Style
.up-home-work-darck-Arabic-open {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 5% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;
  direction: rtl;

  // header
  .header {
    width: 100%;
    height: auto;
    padding: 5px 0px;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;
    color: $font-light;
  }

  .images {
    width: 100%;
    height: 200px;
    border-radius: 5px;
    background-color: $card-darck;
    overflow-y: scroll;
    margin: 10px 0px;

    .head {
      width: 98%;
      height: 30px;
      border-radius: 5px;
      margin: 10px 1%;
      position: relative;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;

      input {
        display: none;
      }

      svg {
        position: absolute;
        right: 5px;
        top: 0px;
        padding: 5px;
        border-radius: 3px;
        background-color: $blue;
        color: $font-light;
        cursor: pointer;
      }

      p {
        color: $font-light;
        position: absolute;
        left: 5px;
        top: 5px;
      }
    }

    // images section
    .images-section {
      width: 100%;
      height: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      align-items: center;
      padding: 0px 1%;

      img {
        max-width: 200px;
        max-height: 200px;
        border-radius: 5px;
        margin: 5px;
        cursor: pointer;
      }
    }
  }

  .images::-webkit-scrollbar {
    width: 0px;
  }

  // form section style
  .form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    label {
      width: 100%;
      height: auto;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
      color: $font-light;
      margin: 10px 0px;
    }

    input {
      width: 100%;
      height: 40px;
      padding-left: 10px;
      outline: none;
      border: none;
      border-radius: 5px;
      margin: 10px 0px;
      background-color: $body-light;
    }

    textarea {
      width: 100%;
      height: 120px;
      border: none;
      outline: none;
      border-radius: 5px;
      padding: 5px 10px;
      resize: none;
      background-color: $body-light;
    }

    select {
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 5px;
      outline: none;
      background-color: $body-light;
    }

    button {
      padding: 10px 20px;
      border-radius: 5px;
      border: none;
      outline: none;
      margin: 10px 0px;
      background-color: $green;
      color: $font-light;
      cursor: pointer;
    }
  }
}

.up-home-work-darck-Arabic-open::-webkit-scrollbar {
  width: 0px;
}

.up-home-work-darck-Arabic-close {
  @extend .up-home-work-darck-Arabic-open;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

.up-home-work-light-Arabic-open {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 5% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;
  direction: rtl;

  // header
  .header {
    width: 100%;
    height: auto;
    padding: 5px 0px;
    border: 1px solid;
    border-color: transparent transparent $border-darck transparent;
    color: $font-darck;
  }

  .images {
    width: 100%;
    height: 200px;
    border-radius: 5px;
    background-color: $card-light;
    overflow-y: scroll;
    margin: 10px 0px;

    .head {
      width: 98%;
      height: 30px;
      border-radius: 5px;
      margin: 10px 1%;
      position: relative;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;

      input {
        display: none;
      }

      svg {
        position: absolute;
        right: 5px;
        top: 0px;
        padding: 5px;
        border-radius: 3px;
        background-color: $blue;
        color: $font-darck;
        cursor: pointer;
      }

      p {
        color: $font-darck;
        position: absolute;
        left: 5px;
        top: 5px;
      }
    }

    // images section
    .images-section {
      width: 100%;
      height: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      align-items: center;
      padding: 0px 1%;

      img {
        max-width: 200px;
        max-height: 200px;
        border-radius: 5px;
        margin: 5px;
        cursor: pointer;
      }
    }
  }

  .images::-webkit-scrollbar {
    width: 0px;
  }

  // form section style
  .form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    label {
      width: 100%;
      height: auto;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
      color: $font-darck;
      margin: 10px 0px;
    }

    input {
      width: 100%;
      height: 40px;
      padding-left: 10px;
      outline: none;
      border: none;
      border-radius: 5px;
      margin: 10px 0px;
      background-color: $body-darck;
    }

    textarea {
      width: 100%;
      height: 120px;
      border: none;
      outline: none;
      border-radius: 5px;
      padding: 5px 10px;
      resize: none;
      background-color: $body-darck;
    }

    select {
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 5px;
      outline: none;
      background-color: $body-darck;
    }

    button {
      padding: 10px 20px;
      border-radius: 5px;
      border: none;
      outline: none;
      margin: 10px 0px;
      background-color: $green;
      color: $font-darck;
      cursor: pointer;
    }
  }
}

.up-home-work-light-Arabic-open::-webkit-scrollbar {
  width: 0px;
}

.up-home-work-light-Arabic-close {
  @extend .up-home-work-darck-Arabic-open;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}
// darck and light Arabic Style
</style>
