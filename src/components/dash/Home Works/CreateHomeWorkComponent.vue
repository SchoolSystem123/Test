<template>
  <div
    :class="`up-home-work-${this.$store.state.mood}-${this.$store.state.language}-${this.status}`"
  >
    <!-- header  -->
    <div class="header">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.create_home_work.page_title
          : this.$store.state.Arabic.create_home_work.page_title
      }}
    </div>
    <!-- header  -->

    <div class="images">
      <!-- section heade  -->
      <div class="head">
        <label for="images">
          <icon icon="plus" />
        </label>
        <p>{{ this.images.length }}/5</p>
        <input type="file" id="images" ref="images" multiple />
      </div>
      <!-- section heade  -->

      <!-- images section  -->
      <div class="images-section">
        <img
          v-for="(path, index) in this.images"
          :key="index"
          :src="path"
          alt="image"
          @click="DeleteNewImage(index)"
        />
      </div>
      <!-- images section  -->
    </div>

    <!-- form section  -->
    <div class="form">
      <!-- title  -->
      <label for="title">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.create_home_work.title
          : this.$store.state.Arabic.create_home_work.title
      }}</label>

      <input
        type="text"
        id="title"
        v-model="this.title"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.create_home_work.title_placeholder
            : this.$store.state.Arabic.create_home_work.title_placeholder
        "
      />
      <!-- title  -->

      <!-- description  -->
      <label for="description">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.create_home_work.description
          : this.$store.state.Arabic.create_home_work.description
      }}</label>

      <textarea
        name=""
        id="description"
        v-model="this.description"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.create_home_work.description_placeholder
            : this.$store.state.Arabic.create_home_work.description_placeholder
        "
      ></textarea>
      <!-- description  -->

      <!-- note  -->
      <label for="note">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.create_home_work.note
          : this.$store.state.Arabic.create_home_work.note
      }}</label>

      <textarea
        name=""
        id="note"
        v-model="this.note"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.create_home_work.note_placeholder
            : this.$store.state.Arabic.create_home_work.note_placeholder
        "
      ></textarea>
      <!-- note  -->

      <!-- level  -->
      <label for="level">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.create_home_work.level
          : this.$store.state.Arabic.create_home_work.level
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

      <!-- select class -->
      <label for="">Select Class</label>
      <div class="select-class-cont">
        <icon icon="plus" @click="this.$store.commit('ChooseClass')" />

        <div class="card" v-if="this.$store.state.choosed_class">
          <img :src="this.$store.state.choosed_class.cover" alt="cover" />

          <div class="info">
            <h3>{{ this.$store.state.choosed_class.title }}</h3>

            <p>🏫🪜🎚️ : {{ this.$store.state.choosed_class.class_level }}</p>

            <p>📚📖📑 : {{ this.$store.state.choosed_class.subject }}</p>

            <p v-if="this.$store.state.choosed_class">
              🏚️💯🔝 : {{ this.$store.state.choosed_class.home_works.length }}
            </p>

            <p v-if="this.$store.state.choosed_class">
              👨‍🎓 : {{ this.$store.state.choosed_class.students.length }}
            </p>
          </div>

          <!-- add button  -->
          <button @click="Unselect">
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.choose_class_form.unselect
                : this.$store.state.Arabic.choose_class_form.unselect
            }}
          </button>
          <!-- add button -->
        </div>
      </div>
      <!-- select class -->

      <!-- button  -->
      <button @click="CreateHomeWork">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.create_home_work.button
            : this.$store.state.Arabic.create_home_work.button
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
  name: "create-home-work-component",
  data() {
    return {
      // page status
      status: "close",
      // title
      title: "",
      // description
      description: "",
      // note
      note: "",
      // level
      level: "easy",
      // api
      api: "",
      // images's array
      images: [],
      // form data
      formData: "",
    };
  },
  mounted() {
    setTimeout(() => {
      this.status = "open";
    }, 500);

    //  call to the handleFileChange method on select any image
    this.$refs.images.addEventListener("change", this.handleFileChange);
  },
  components: {},
  methods: {
    // create the home work
    async CreateHomeWork() {
      // to create a new form data
      this.formData = new FormData();

      // to start the loading
      this.$store.state.loading = "open";

      // craete headers
      const headers = {
        Authorization: `Bearer ${this.$store.state.user.token}`,
      };

      // update the api
      if (this.$store.state.user.user_type == "super") {
        // update the api
        this.api = this.$store.state.APIs.home_works.super.create;

        // add the super admin id to form data
        this.formData.append("super_admin_id", this.$store.state.user.user._id);
      } else if (this.$store.state.user.user_type == "admin") {
        // update the api
        this.api = this.$store.state.APIs.home_works.admin.create;

        // add the admin id to form data
        this.formData.append("admin_id", this.$store.state.user.user._id);
      } else if (this.$store.state.user.user_type == "teacher") {
        // update the api
        this.api = this.$store.state.APIs.home_works.teacher.create;

        // add the teacher id to form data
        this.formData.append("teacher_id", this.$store.state.user.user._id);
      }

      // add the title
      if (this.title) {
        this.formData.append("title", this.title);
      }

      // add the description
      if (this.description) {
        this.formData.append("description", this.description);
      }

      // add the note
      if (this.note) {
        this.formData.append("note", this.note);
      }

      // add the level
      if (this.level) {
        this.formData.append("level", this.level);
      }

      // add the class id
      this.formData.append("class_id", this.$store.state.choosed_class._id);

      // add the new images to form data
      if (this.$store.state.new_home_work_images.length > 0) {
        for (const file of this.$store.state.new_home_work_images) {
          this.formData.append("images", file, file.name);
        }
      }

      await axios
        .post(this.api, this.formData, { headers })
        .then((response) => {
          console.log(response);
          // to stop the loading
          this.$store.state.loading = "close";

          // update the active component in store
          this.$store.state.active_component_in_dash = "home-works";
        })
        .catch((error) => {
          // to stop the loading
          this.$store.state.loading = "close";

          // open the error from
          this.$store.state.error_form_status = "open";

          // set the error message to error message in store
          this.$store.state.error_message = error.response.data.message;
        });
    },

    // delete the new image on click
    DeleteNewImage(index) {
      // delete the image's path from images array in this component
      this.images.splice(index, 1);

      // delete the image from this.$store.state.new_home_work_images array in stor
      this.$store.state.new_home_work_images.splice(index, 1);
    },

    // to set the new selectedimages
    handleFileChange(event) {
      if (event.target.files.length <= 5) {
        // emptying the images array to delete all last paths
        this.images = [];

        this.$store.state.new_home_work_images = Array.from(event.target.files);
        // call to reader files method
        this.readerFiles();
      } else {
        // open the error from
        this.$store.state.error_form_status = "open";

        // set the error message to error message in store
        this.$store.state.error_message = {
          english: "Sorry, You can not select more than 5 images ...",
          arabic: "... عذرا  لا يمكنك اختيار اكثر من 5 صور",
        };
      }
    },

    // to reade the selected images
    async readerFiles() {
      // looping to read all selecetd images
      for (const image of this.$store.state.new_home_work_images) {
        const reader = new FileReader();

        const promise = new Promise((resolve) => {
          reader.onload = (e) => {
            resolve(e.target.result);
          };

          reader.readAsDataURL(image);
        });

        // add the promise results to images array
        this.images.push(await promise);
      }
    },

    // unselect the class
    Unselect() {
      this.$store.state.choosed_class = "";
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

    .select-class-cont {
      width: 100%;
      height: 120px;
      background-color: $card-darck;
      position: relative;
      margin: 10px 0px;
      border-radius: 5px;
      overflow-y: scroll;

      svg {
        padding: 4px;
        border-radius: 3px;
        background-color: $blue;
        color: $font-light;
        cursor: pointer;
        position: absolute;
        right: 5px;
        top: 5px;
      }

      .card {
        width: 98%;
        height: 100px;
        margin: 3% 1% 1% 1%;
        border-radius: 5px;
        background-color: $body-darck;
        border-radius: 5px;
        display: flex;
        justify-content: start;
        align-items: center;

        img {
          width: 90px;
          height: 90px;
          border-radius: 5px;
          margin: 0px 5px;
        }

        .info {
          width: 70%;
          height: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: start;
          align-items: center;
          margin: 0px 5px;

          h3 {
            width: 100%;
            height: auto;
            color: $font-light;
          }

          p {
            padding: 3px;
            border-radius: 3px;
            color: $font-light;
            background-color: $card-darck;
            font-size: $x-small;
            margin: 3px;

            @media (max-width: $phone) {
              font-size: $xx-small;
              margin: 1px;
            }
          }

          .editor {
            @extend p;
            background-color: $green;
          }
        }

        button {
          padding: 7px 15px;
          border-radius: 5px;
          background-color: $red;
          cursor: pointer;
          color: $font-light;
          border: none;
          outline: none;
          margin: 0px 5px;
        }
      }
    }

    .select-class-cont::-webkit-scrollbar {
      width: 0px;
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
        color: $font-light;
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

    .select-class-cont {
      width: 100%;
      height: 120px;
      background-color: $card-light;
      position: relative;
      margin: 10px 0px;
      border-radius: 5px;
      overflow-y: scroll;

      svg {
        padding: 4px;
        border-radius: 3px;
        background-color: $blue;
        color: $font-darck;
        cursor: pointer;
        position: absolute;
        right: 5px;
        top: 5px;
      }

      .card {
        width: 98%;
        height: 100px;
        margin: 3% 1% 1% 1%;
        border-radius: 5px;
        background-color: $body-light;
        border-radius: 5px;
        display: flex;
        justify-content: start;
        align-items: center;

        img {
          width: 90px;
          height: 90px;
          border-radius: 5px;
          margin: 0px 5px;
        }

        .info {
          width: 70%;
          height: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: start;
          align-items: center;
          margin: 0px 5px;

          h3 {
            width: 100%;
            height: auto;
            color: $font-darck;
          }

          p {
            padding: 3px;
            border-radius: 3px;
            color: $font-darck;
            background-color: $card-light;
            font-size: $x-small;
            margin: 3px;

            @media (max-width: $phone) {
              font-size: $xx-small;
              margin: 1px;
            }
          }

          .editor {
            @extend p;
            background-color: $green;
          }
        }

        button {
          padding: 7px 15px;
          border-radius: 5px;
          background-color: $red;
          cursor: pointer;
          color: $font-light;
          border: none;
          outline: none;
          margin: 0px 5px;
        }
      }
    }

    .select-class-cont::-webkit-scrollbar {
      width: 0px;
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

.up-home-work-light-English-open::-webkit-scrollbar {
  width: 0px;
}

.up-home-work-light-English-close {
  @extend .up-home-work-light-English-open;
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

    .select-class-cont {
      width: 100%;
      height: 120px;
      background-color: $card-darck;
      position: relative;
      margin: 10px 0px;
      border-radius: 5px;
      overflow-y: scroll;

      svg {
        padding: 4px;
        border-radius: 3px;
        background-color: $blue;
        color: $font-light;
        cursor: pointer;
        position: absolute;
        right: 5px;
        top: 5px;
      }

      .card {
        width: 98%;
        height: 100px;
        margin: 3% 1% 1% 1%;
        border-radius: 5px;
        background-color: $body-darck;
        border-radius: 5px;
        display: flex;
        justify-content: start;
        align-items: center;

        img {
          width: 90px;
          height: 90px;
          border-radius: 5px;
          margin: 0px 5px;
        }

        .info {
          width: 70%;
          height: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: start;
          align-items: center;
          margin: 0px 5px;

          h3 {
            width: 100%;
            height: auto;
            color: $font-light;
          }

          p {
            padding: 3px;
            border-radius: 3px;
            color: $font-light;
            background-color: $card-darck;
            font-size: $x-small;
            margin: 3px;

            @media (max-width: $phone) {
              font-size: $xx-small;
              margin: 1px;
            }
          }

          .editor {
            @extend p;
            background-color: $green;
          }
        }

        button {
          padding: 7px 15px;
          border-radius: 5px;
          background-color: $red;
          cursor: pointer;
          color: $font-light;
          border: none;
          outline: none;
          margin: 0px 5px;
        }
      }
    }

    .select-class-cont::-webkit-scrollbar {
      width: 0px;
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
        color: $font-light;
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

    .select-class-cont {
      width: 100%;
      height: 120px;
      background-color: $card-light;
      position: relative;
      margin: 10px 0px;
      border-radius: 5px;
      overflow-y: scroll;

      svg {
        padding: 4px;
        border-radius: 3px;
        background-color: $blue;
        color: $font-darck;
        cursor: pointer;
        position: absolute;
        right: 5px;
        top: 5px;
      }

      .card {
        width: 98%;
        height: 100px;
        margin: 3% 1% 1% 1%;
        border-radius: 5px;
        background-color: $body-light;
        border-radius: 5px;
        display: flex;
        justify-content: start;
        align-items: center;

        img {
          width: 90px;
          height: 90px;
          border-radius: 5px;
          margin: 0px 5px;
        }

        .info {
          width: 70%;
          height: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: start;
          align-items: center;
          margin: 0px 5px;

          h3 {
            width: 100%;
            height: auto;
            color: $font-darck;
          }

          p {
            padding: 3px;
            border-radius: 3px;
            color: $font-darck;
            background-color: $card-light;
            font-size: $x-small;
            margin: 3px;

            @media (max-width: $phone) {
              font-size: $xx-small;
              margin: 1px;
            }
          }

          .editor {
            @extend p;
            background-color: $green;
          }
        }

        button {
          padding: 7px 15px;
          border-radius: 5px;
          background-color: $red;
          cursor: pointer;
          color: $font-light;
          border: none;
          outline: none;
          margin: 0px 5px;
        }
      }
    }

    .select-class-cont::-webkit-scrollbar {
      width: 0px;
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

.up-home-work-light-Arabic-open::-webkit-scrollbar {
  width: 0px;
}

.up-home-work-light-Arabic-close {
  @extend .up-home-work-light-Arabic-open;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}
// darck and light Arabic Style
</style>
