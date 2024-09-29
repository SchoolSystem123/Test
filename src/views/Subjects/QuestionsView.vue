<template>
  <div
    :class="`question-page-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <SidBarComponent />
    <LoadingComponent />
    <CopyMessageComponent />
    <ErrorComponent />
    <div :class="this.status ? 'open-cont' : 'close-cont'">
      <SmallNavComponent />
      <!-- header  -->
      <div class="page-title">
        <!-- page title  -->
        <h4>
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.question_page.page_title
              : this.$store.state.Arabic.question_page.page_title
          }}
        </h4>
        <!-- page title  -->

        <p v-if="this.question_data.created_at">
          {{ this.question_data.created_at.split("T")[0] }} : 📆
        </p>
      </div>
      <!-- header  -->
      <!-- cover  -->
      <div class="cover-cont">
        <img
          class="cover"
          v-if="
            this.question_data.images && this.question_data.images.length > 0
          "
          :src="this.question_data.images[0]"
          alt="cover"
        />
        <NoteComponent
          v-if="this.question_data.note && this.question_data.note != null"
          :note="this.question_data.note"
        />
      </div>
      <!-- cover  -->
      <!-- info  -->
      <div class="info">
        <!-- title  -->
        <h1 class="title">{{ this.question_data.title }}</h1>
        <!-- title  -->

        <!-- description  -->
        <div v-if="this.question_data.description" class="description">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.question_page.description
              : this.$store.state.Arabic.question_page.description
          }}
          {{ this.question_data.description }}
        </div>
        <!-- description  -->

        <!-- class_level  -->
        <p v-if="this.question_data.class_level">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.question_page.class_level
              : this.$store.state.Arabic.question_page.class_level
          }}
          {{ this.question_data.class_level }}
        </p>
        <!-- class_level  -->

        <!-- points  -->
        <p v-if="this.question_data.points">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.question_page.points
              : this.$store.state.Arabic.question_page.points
          }}
          {{ this.question_data.points }}
        </p>
        <!-- points  -->

        <!-- repated  -->
        <div class="repated-cont" v-if="this.question_data.repated">
          <span>
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.question_page.repated
                : this.$store.state.Arabic.question_page.repated
            }}</span
          >
          <p v-for="(date, index) in this.question_data.repated" :key="index">
            {{ date }}📆
          </p>
        </div>
        <!-- repated  -->

        <CopyIdComponent
          :Id_data="{
            id: this.question_data._id,
            object_type: `Q/${this.$route.params.type}`,
          }"
        />
      </div>
      <!-- info  -->

      <!-- images container  -->
      <div class="images-cont">
        <div class="images-heade">
          <h4>
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.question_page.images_title
                : this.$store.state.Arabic.question_page.images_title
            }}
          </h4>
          <p
            v-if="
              this.question_data.images && this.question_data.images.length > 1
            "
          >
            {{ this.question_data.images.length }}
          </p>
        </div>
        <img
          v-for="(image, index) in this.question_data.images"
          :key="index"
          :src="image"
          alt="image"
          class="image"
        />

        <!-- no any image result message  -->
        <p
          class="result-message"
          v-if="
            this.question_data.images && this.question_data.images.length == 0
          "
        >
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.question_page.result_message
              : this.$store.state.Arabic.question_page.result_message
          }}
        </p>
      </div>
      <!-- images container  -->

      <!-- level nion  -->
      <div :class="`level-${this.question_data.level}`"></div>
      <!-- level nion  -->

      <!--  options  -->
      <div class="options">
        <h4>
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.question_page.options
              : this.$store.state.Arabic.question_page.options
          }}
        </h4>
        <div
          class="option"
          v-for="(option, index) in this.question_data.options"
          :key="index"
        >
          <div :class="`nion-${option.answer}`"></div>
          {{ option.value }}
        </div>
      </div>
      <!--  options  -->

      <!-- author -->
      <div class="author" @click="GetAuthor">
        <h4>
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.question_page.created_by
              : this.$store.state.Arabic.question_page.created_by
          }}
        </h4>
        <div class="user">
          <img
            v-if="this.question_data.created_by"
            :src="this.question_data.created_by.avatar"
            alt="avatar"
          />

          <h3 v-if="this.question_data.created_by">
            {{ this.question_data.created_by.name }}
          </h3>
        </div>
      </div>
      <!-- author -->

      <!-- footer component  -->
      <FooterComponent />
      <!-- footer component  -->

      <!-- scroll to top  -->
      <ScrollTopComponent :scroll_page="this.scroll_page" />
      <!-- scroll to top  -->
    </div>
  </div>
</template>

<script>
//? importing the components
import NoteComponent from "@/components/global/NoteComponent.vue";
import SmallNavComponent from "@/components/global/nav/SmallNavComponent.vue";
import LoadingComponent from "@/components/global/LoadingComponent.vue";
import ErrorComponent from "@/components/global/ErrorComponent.vue";
import CopyMessageComponent from "@/components/global/CopyMessageComponent.vue";
import SidBarComponent from "@/components/global/SidBarComponent.vue";
import ScrollTopComponent from "@/components/global/ScrollTopComponent.vue";
import CopyIdComponent from "@/components/global/CopyIdComponent.vue";
import FooterComponent from "@/components/global/FooterComponent.vue";
import axios from "axios";
export default {
  name: "question-page",
  data() {
    return {
      // page hegith
      scroll_page: 0,
      // status
      status: false,
      // api
      api: "",
      // question_data
      question_data: "",
    };
  },
  components: {
    CopyIdComponent,
    ScrollTopComponent,
    ErrorComponent,
    SidBarComponent,
    CopyMessageComponent,
    LoadingComponent,
    SmallNavComponent,
    NoteComponent,
    FooterComponent,
  },
  mounted() {
    if (
      !this.$store.state.user ||
      this.$store.state.user.user_type == "student" ||
      this.$store.state.user.user_type == "parent"
    ) {
      window.location = `/login`;
    }

    // call to get question method
    this.GetQuestion();
  },
  methods: {
    // select the api type by subject type
    SelectApi() {
      switch (this.$route.params.type) {
        case "Math":
          this.api = this.$store.state.APIs.subjects_questions.math.get_one;
          break;

        case "English":
          this.api = this.$store.state.APIs.subjects_questions.english.get_one;
          break;

        case "Arabic":
          this.api = this.$store.state.APIs.subjects_questions.arabic.get_one;
          break;

        case "French":
          this.api = this.$store.state.APIs.subjects_questions.french.get_one;
          break;

        case "Islam":
          this.api = this.$store.state.APIs.subjects_questions.islam.get_one;
          break;

        case "History":
          this.api = this.$store.state.APIs.subjects_questions.history.get_one;
          break;

        case "Philosophy":
          this.api =
            this.$store.state.APIs.subjects_questions.philosophy.get_one;
          break;

        case "Physics":
          this.api = this.$store.state.APIs.subjects_questions.physics.get_one;
          break;

        case "Sciences":
          this.api = this.$store.state.APIs.subjects_questions.sciences.get_one;
          break;

        case "Geography":
          this.api =
            this.$store.state.APIs.subjects_questions.geography.get_one;
          break;

        case "Chemistry":
          this.api =
            this.$store.state.APIs.subjects_questions.chemistry.get_one;
          break;

        case "Alwatania":
          this.api =
            this.$store.state.APIs.subjects_questions.alwatania.get_one;
          break;
      }
    },

    // get to question method
    async GetQuestion() {
      // to start the loading animation
      this.$store.state.loading = "open";

      // call to select api method
      this.SelectApi();

      await axios
        .get(this.api, {
          params: {
            question_id: this.$route.params.id,
          },
        })
        .then((Response) => {
          // to open the cont
          this.status = true;

          // set the question data from response to question dta var in data section
          this.question_data = Response.data.question_data;

          // to stop the loading animation
          this.$store.state.loading = "close";
        })
        .catch((error) => {
          // to close the cont
          this.status = false;

          // to stop the loading animation
          this.$store.state.loading = "close";

          // set the error message to the error message in store
          this.$store.state.error_message = error.response.data.message;

          // to open the error form
          this.$store.state.error_form_status = "open";
        });
    },

    // get author method
    GetAuthor() {
      if (this.question_data.created_by_type == "admin") {
        window.location = `/admin/${this.question_data.created_by._id}`;
      } else {
        window.location = `/teacher/${this.question_data.created_by._id}`;
      }
    },

    // scroll method
    handleScroll() {
      this.scroll_page = window.scrollY;
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";

// darck and light English style
.question-page-darck-English {
  width: 100%;
  min-height: 100vh;
  background-color: $body-darck;
  direction: ltr;

  // open conatiner style
  .open-cont {
    width: 50%;
    height: auto;
    margin: auto;
    transition-duration: 0.5s;
    padding: 7% 0px 5% 0px;
    opacity: 1;
    position: relative;

    @media (max-width: $phone) {
      padding: 15% 0px 5% 0px;
      width: 100%;
    }

    // page title style
    .page-title {
      width: 80%;
      height: auto;
      margin: auto;
      padding: 5px 0px;
      color: $font-light;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        font-size: $x-small;
      }
    }

    // cover conatiner style
    .cover-cont {
      width: 80%;
      min-height: 30px;
      border-radius: 5px;
      margin: 5% 5% 5% 10%;
      cursor: pointer;
      padding: 5px;
      position: relative;

      // cover
      .cover {
        width: 100%;
        height: auto;
        border-radius: 10px;
        cursor: pointer;
      }

      // note component
      #note-English-cont {
        position: absolute;
        top: 15px;
        left: 15px;
      }
    }

    // info
    .info {
      width: 80%;
      height: auto;
      margin: 0px 10%;
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      align-items: center;

      // title
      .title {
        width: 100%;
        height: auto;
        margin: 5px 0px;
        color: $font-light;
      }

      // description
      .description {
        width: 100%;
        height: auto;
        margin: 5px 0px;
        color: $font-light;
      }

      // copy id component
      .copy-id-darck-English {
        width: 100%;
      }

      p {
        font-size: $x-small;
        color: $font-light;
        margin: 3px;
        border-radius: 3px;
        padding: 3px;
        background-color: $note-darck;
      }

      .repated-cont {
        width: 100%;
        height: auto;
        padding: 0px 3px;
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;

        span {
          padding: 3px;
          border: 3px;
          color: $font-light;
          border-radius: 3px;
          font-size: $x-small;
          background-color: $note-darck;
        }
      }
    }

    // images images conatiner
    .images-cont {
      width: 80%;
      height: auto;
      margin: 2% 0% 2% 10%;
      // background-color: green;

      .images-heade {
        width: 100%;
        height: 40px;
        margin: 15px 0px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid;
        border-color: transparent transparent $border-light transparent;

        h4 {
          width: 60%;
          height: auto;
          padding: 5px 0px;
          color: $font-light;
          margin: 20px 0px;
        }

        p {
          width: auto;
          height: auto;
          color: $font-light;
        }
      }

      img {
        width: 100%;
        height: auto;
        border-radius: 10px;
        margin: 5px 0%;
        cursor: pointer;
      }

      .result-message {
        width: 100%;
        height: auto;
        text-align: center;
        color: $font-light;
      }
    }

    // level hard nion
    .level-hard {
      width: 5px;
      height: 80%;
      background-color: $hard;
      border-radius: 2px;
      box-shadow: 0 0 5px $hard;
      position: fixed;
      left: 5%;
      top: 10%;
      transition-duration: 0.5s;
      @media (max-width: $phone) {
        height: 90%;
        top: 8%;
      }

      @media (min-width: $tablet) {
        position: absolute;
        height: 90%;
        top: 5%;
      }
    }

    // level normal nion
    .level-normal {
      @extend .level-hard;
      background-color: $normal;
      box-shadow: 0 0 5px $normal;
    }

    // level easy nion
    .level-easy {
      @extend .level-hard;
      background-color: $easy;
      box-shadow: 0 0 5px $easy;
    }

    // options cont
    .options {
      width: 80%;
      height: auto;
      margin: 2% 0% 2% 10%;

      // section title
      h4 {
        width: 100%;
        height: auto;
        color: $font-light;
        padding: 5px 0px;
        border: 1px solid;
        border-color: transparent transparent $border-light transparent;
      }

      .option {
        width: 98%;
        min-height: 30px;
        margin: 5px 1%;
        padding: 3px 10px;
        background-color: $card-darck;
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;
        color: $font-light;
        border-radius: 5px;
        position: relative;

        .nion-false {
          width: 4px;
          height: 90%;
          border-radius: 0px 2px 2px 0px;
          position: absolute;
          left: 0px;
          top: 5%;
          background-color: $red;
          box-shadow: 0 0 5px $red;
        }

        .nion-true {
          @extend .nion-false;
          background-color: $green;
          box-shadow: 0 0 5px $green;
        }
      }
    }

    // author container style
    .author {
      width: 80%;
      height: auto;
      margin: 2% 0% 2% 10%;

      // section title
      h4 {
        width: 100%;
        height: auto;
        color: $font-light;
        padding: 5px 0px;
        border: 1px solid;
        border-color: transparent transparent $border-light transparent;
      }

      // link
      .user {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: start;
        align-items: center;
        text-decoration: none;
        background-color: $card-darck;
        border-radius: 10px;
        padding: 5px;
        margin: 5% 0%;
        transition-duration: 0.5s;
        cursor: pointer;

        // author avatar
        img {
          width: 70px;
          height: 70px;
          border-radius: 5px;
        }

        // author name
        h3 {
          width: auto;
          color: $font-light;
          margin: -7% 0% 0% 5%;
        }
      }

      a:hover {
        background-color: $border-darck;
      }
    }

    // footer component
    .footer-darck-English {
      width: 80%;
      margin: 0px 10%;
    }
  }

  // close conatiner style
  .close-cont {
    @extend .open-cont;
    padding: 20% 0px 5% 0px;
    opacity: 0;
    @media (max-width: $phone) {
      width: 100%;
      padding-top: 40%;
    }

    // level hard nion
    .level-hard {
      margin-left: -20%;
      transition-duration: 0.5s;
    }
  }
}

.question-page-light-English {
  width: 100%;
  min-height: 100vh;
  background-color: $body-light;
  direction: ltr;

  // open conatiner style
  .open-cont {
    width: 50%;
    height: auto;
    margin: auto;
    transition-duration: 0.5s;
    padding: 7% 0px 5% 0px;
    opacity: 1;
    position: relative;

    @media (max-width: $phone) {
      padding: 15% 0px 5% 0px;
      width: 100%;
    }

    // page title style
    .page-title {
      width: 80%;
      height: auto;
      margin: auto;
      padding: 5px 0px;
      color: $font-darck;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
      display: flex;
      justify-content: space-between;
      align-items: center;

      p {
        font-size: $x-small;
      }
    }

    // cover conatiner style
    .cover-cont {
      width: 80%;
      min-height: 30px;
      border-radius: 5px;
      margin: 5% 5% 5% 10%;
      cursor: pointer;
      padding: 5px;
      position: relative;

      // cover
      .cover {
        width: 100%;
        height: auto;
        border-radius: 10px;
        cursor: pointer;
      }

      // note component
      #note-English-cont {
        position: absolute;
        top: 15px;
        left: 15px;
      }
    }

    // info
    .info {
      width: 80%;
      height: auto;
      margin: 0px 10%;
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      align-items: center;

      // title
      .title {
        width: 100%;
        height: auto;
        margin: 5px 0px;
        color: $font-darck;
      }

      // description
      .description {
        width: 100%;
        height: auto;
        margin: 5px 0px;
        color: $font-darck;
      }

      // copy id component
      .copy-id-darck-English {
        width: 100%;
      }

      p {
        font-size: $x-small;
        color: $font-darck;
        margin: 3px;
        border-radius: 3px;
        padding: 3px;
        background-color: $note-light;
      }

      .repated-cont {
        width: 100%;
        height: auto;
        padding: 0px 3px;
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;

        span {
          padding: 3px;
          border: 3px;
          color: $font-darck;
          border-radius: 3px;
          font-size: $x-small;
          background-color: $note-light;
        }
      }
    }

    // images images conatiner
    .images-cont {
      width: 80%;
      height: auto;
      margin: 2% 0% 2% 10%;
      // background-color: green;

      .images-heade {
        width: 100%;
        height: 40px;
        margin: 15px 0px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid;
        border-color: transparent transparent $border-darck transparent;

        h4 {
          width: 60%;
          height: auto;
          padding: 5px 0px;
          color: $font-darck;
          margin: 20px 0px;
        }

        p {
          width: auto;
          height: auto;
          color: $font-darck;
        }
      }

      img {
        width: 100%;
        height: auto;
        border-radius: 10px;
        margin: 5px 0%;
        cursor: pointer;
      }

      .result-message {
        width: 100%;
        height: auto;
        text-align: center;
        color: $font-darck;
      }
    }

    // level hard nion
    .level-hard {
      width: 5px;
      height: 80%;
      background-color: $hard;
      border-radius: 2px;
      box-shadow: 0 0 5px $hard;
      position: fixed;
      left: 5%;
      top: 10%;
      transition-duration: 0.5s;
      @media (max-width: $phone) {
        height: 90%;
        top: 8%;
      }

      @media (min-width: $tablet) {
        position: absolute;
        height: 90%;
        top: 5%;
      }
    }

    // level normal nion
    .level-normal {
      @extend .level-hard;
      background-color: $normal;
      box-shadow: 0 0 5px $normal;
    }

    // level easy nion
    .level-easy {
      @extend .level-hard;
      background-color: $easy;
      box-shadow: 0 0 5px $easy;
    }

    // options cont
    .options {
      width: 80%;
      height: auto;
      margin: 2% 0% 2% 10%;

      // section title
      h4 {
        width: 100%;
        height: auto;
        color: $font-darck;
        padding: 5px 0px;
        border: 1px solid;
        border-color: transparent transparent $border-darck transparent;
      }

      .option {
        width: 98%;
        min-height: 30px;
        margin: 5px 1%;
        padding: 3px 10px;
        background-color: $card-light;
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;
        color: $font-darck;
        border-radius: 5px;
        position: relative;

        .nion-false {
          width: 4px;
          height: 90%;
          border-radius: 0px 2px 2px 0px;
          position: absolute;
          left: 0px;
          top: 5%;
          background-color: $red;
          box-shadow: 0 0 5px $red;
        }

        .nion-true {
          @extend .nion-false;
          background-color: $green;
          box-shadow: 0 0 5px $green;
        }
      }
    }

    // author container style
    .author {
      width: 80%;
      height: auto;
      // background-color: green;
      margin: 2% 0% 2% 10%;

      // section title
      h4 {
        width: 100%;
        height: auto;
        color: $font-darck;
        padding: 5px 0px;
        border: 1px solid;
        border-color: transparent transparent $border-darck transparent;
      }

      // link
      .user {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: start;
        align-items: center;
        text-decoration: none;
        background-color: $card-light;
        border-radius: 10px;
        padding: 5px;
        margin: 5% 0%;
        transition-duration: 0.5s;
        cursor: pointer;

        // author avatar
        img {
          width: 70px;
          height: 70px;
          border-radius: 5px;
        }

        // author name
        h3 {
          width: auto;
          color: $font-darck;
          margin: -7% 0% 0% 5%;
        }
      }

      a:hover {
        background-color: $border-light;
      }
    }

    // footer component
    .footer-light-English {
      width: 80%;
      margin: 0px 10%;
    }
  }

  // close conatiner style
  .close-cont {
    @extend .open-cont;
    padding: 20% 0px 5% 0px;
    opacity: 0;
    @media (max-width: $phone) {
      width: 100%;
      padding-top: 40%;
    }

    // level hard nion
    .level-hard {
      margin-left: -20%;
      transition-duration: 0.5s;
    }
  }
}
// darck and light English style

// darck and light Arabic style
.question-page-darck-Arabic {
  width: 100%;
  min-height: 100vh;
  background-color: $body-darck;
  direction: rtl;

  // open conatiner style
  .open-cont {
    width: 50%;
    height: auto;
    margin: auto;
    transition-duration: 0.5s;
    padding: 7% 0px 5% 0px;
    opacity: 1;
    position: relative;

    @media (max-width: $phone) {
      padding: 15% 0px 5% 0px;
      width: 100%;
    }

    // page title style
    .page-title {
      width: 80%;
      height: auto;
      margin: auto;
      padding: 5px 0px;
      color: $font-light;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        font-size: $x-small;
      }
    }

    // cover conatiner style
    .cover-cont {
      width: 80%;
      min-height: 30px;
      border-radius: 5px;
      margin: 5% 10% 5% 5%;
      cursor: pointer;
      padding: 5px;
      position: relative;

      // cover
      .cover {
        width: 100%;
        height: auto;
        border-radius: 10px;
        cursor: pointer;
      }

      // note component
      #note-Arabic-cont {
        position: absolute;
        top: 15px;
        right: 15px;
      }
    }

    // info
    .info {
      width: 80%;
      height: auto;
      margin: 0px 10%;
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      align-items: center;

      // title
      .title {
        width: 100%;
        height: auto;
        margin: 5px 0px;
        color: $font-light;
      }

      // description
      .description {
        width: 100%;
        height: auto;
        margin: 5px 0px;
        color: $font-light;
      }

      // copy id component
      .copy-id-darck-Arabic {
        width: 100%;
      }

      p {
        font-size: $x-small;
        color: $font-light;
        margin: 3px;
        border-radius: 3px;
        padding: 3px;
        background-color: $note-darck;
      }

      .repated-cont {
        width: 100%;
        height: auto;
        padding: 0px 3px;
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;

        span {
          padding: 3px;
          border: 3px;
          color: $font-light;
          border-radius: 3px;
          font-size: $x-small;
          background-color: $note-darck;
        }
      }
    }

    // images images conatiner
    .images-cont {
      width: 80%;
      height: auto;
      margin: 2% 10% 2% 0%;
      // background-color: green;

      .images-heade {
        width: 100%;
        height: 40px;
        margin: 15px 0px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid;
        border-color: transparent transparent $border-light transparent;

        h4 {
          width: 60%;
          height: auto;
          padding: 5px 0px;
          color: $font-light;
          margin: 20px 0px;
        }

        p {
          width: auto;
          height: auto;
          color: $font-light;
        }
      }

      img {
        width: 100%;
        height: auto;
        border-radius: 10px;
        margin: 5px 0%;
        cursor: pointer;
      }

      .result-message {
        width: 100%;
        height: auto;
        text-align: center;
        color: $font-light;
      }
    }

    // level hard nion
    .level-hard {
      width: 5px;
      height: 80%;
      background-color: $hard;
      border-radius: 2px;
      box-shadow: 0 0 5px $hard;
      position: fixed;
      left: 5%;
      top: 10%;
      transition-duration: 0.5s;
      @media (max-width: $phone) {
        height: 90%;
        top: 8%;
      }

      @media (min-width: $tablet) {
        position: absolute;
        height: 90%;
        top: 5%;
      }
    }

    // level normal nion
    .level-normal {
      @extend .level-hard;
      background-color: $normal;
      box-shadow: 0 0 5px $normal;
    }

    // level easy nion
    .level-easy {
      @extend .level-hard;
      background-color: $easy;
      box-shadow: 0 0 5px $easy;
    }

    // options cont
    .options {
      width: 80%;
      height: auto;
      margin: 2% 10% 2% 0%;

      // section title
      h4 {
        width: 100%;
        height: auto;
        color: $font-light;
        padding: 5px 0px;
        border: 1px solid;
        border-color: transparent transparent $border-light transparent;
      }

      .option {
        width: 98%;
        min-height: 30px;
        margin: 5px 1%;
        padding: 3px 10px;
        background-color: $card-darck;
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;
        color: $font-light;
        border-radius: 5px;
        position: relative;

        .nion-false {
          width: 4px;
          height: 90%;
          border-radius: 2px 0px 0px 2px;
          position: absolute;
          right: 0px;
          top: 5%;
          background-color: $red;
          box-shadow: 0 0 5px $red;
        }

        .nion-true {
          @extend .nion-false;
          background-color: $green;
          box-shadow: 0 0 5px $green;
        }
      }
    }

    // author container style
    .author {
      width: 80%;
      height: auto;
      margin: 2% 10% 2% 0%;

      // section title
      h4 {
        width: 100%;
        height: auto;
        color: $font-light;
        padding: 5px 0px;
        border: 1px solid;
        border-color: transparent transparent $border-light transparent;
      }

      // link
      .user {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: start;
        align-items: center;
        text-decoration: none;
        background-color: $card-darck;
        border-radius: 10px;
        padding: 5px;
        margin: 5% 0%;
        transition-duration: 0.5s;
        cursor: pointer;

        // author avatar
        img {
          width: 70px;
          height: 70px;
          border-radius: 5px;
        }

        // author name
        h3 {
          width: auto;
          color: $font-light;
          margin: -7% 0% 0% 5%;
        }
      }

      a:hover {
        background-color: $border-darck;
      }
    }

    // footer component
    .footer-darck-Arabic {
      width: 80%;
      margin: 2% 10% 2% 0%;
    }
  }

  // close conatiner style
  .close-cont {
    @extend .open-cont;
    padding: 20% 0px 5% 0px;
    opacity: 0;

    @media (max-width: $phone) {
      width: 100%;
      padding-top: 40%;
    }

    // level hard nion
    .level-hard {
      margin-left: -20%;
      transition-duration: 0.5s;
    }
  }
}

.question-page-light-Arabic {
  width: 100%;
  min-height: 100vh;
  background-color: $body-light;
  direction: rtl;

  // open conatiner style
  .open-cont {
    width: 50%;
    height: auto;
    margin: auto;
    transition-duration: 0.5s;
    padding: 7% 0px 5% 0px;
    opacity: 1;
    position: relative;

    @media (max-width: $phone) {
      padding: 15% 0px 5% 0px;
      width: 100%;
    }

    // page title style
    .page-title {
      width: 80%;
      height: auto;
      margin: auto;
      padding: 5px 0px;
      color: $font-darck;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
      display: flex;
      justify-content: space-between;
      align-items: center;

      p {
        font-size: $x-small;
      }
    }

    // cover conatiner style
    .cover-cont {
      width: 80%;
      min-height: 30px;
      border-radius: 5px;
      margin: 5% 10% 5% 5%;
      cursor: pointer;
      padding: 5px;
      position: relative;

      // cover
      .cover {
        width: 100%;
        height: auto;
        border-radius: 10px;
        cursor: pointer;
      }

      // note component
      #note-Arabic-cont {
        position: absolute;
        top: 15px;
        right: 15px;
      }
    }

    // info
    .info {
      width: 80%;
      height: auto;
      margin: 0px 10%;
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      align-items: center;

      // title
      .title {
        width: 100%;
        height: auto;
        margin: 5px 0px;
        color: $font-darck;
      }

      // description
      .description {
        width: 100%;
        height: auto;
        margin: 5px 0px;
        color: $font-darck;
      }

      // copy id component
      .copy-id-darck-Arabic {
        width: 100%;
      }

      p {
        font-size: $x-small;
        color: $font-darck;
        margin: 3px;
        border-radius: 3px;
        padding: 3px;
        background-color: $note-light;
      }

      .repated-cont {
        width: 100%;
        height: auto;
        padding: 0px 3px;
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;

        span {
          padding: 3px;
          border: 3px;
          color: $font-darck;
          border-radius: 3px;
          font-size: $x-small;
          background-color: $note-light;
        }
      }
    }

    // images images conatiner
    .images-cont {
      width: 80%;
      height: auto;
      margin: 2% 10% 2% 0%;
      // background-color: green;

      .images-heade {
        width: 100%;
        height: 40px;
        margin: 15px 0px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid;
        border-color: transparent transparent $border-darck transparent;

        h4 {
          width: 60%;
          height: auto;
          padding: 5px 0px;
          color: $font-darck;
          margin: 20px 0px;
        }

        p {
          width: auto;
          height: auto;
          color: $font-darck;
        }
      }

      img {
        width: 100%;
        height: auto;
        border-radius: 10px;
        margin: 5px 0%;
        cursor: pointer;
      }

      .result-message {
        width: 100%;
        height: auto;
        text-align: center;
        color: $font-darck;
      }
    }

    // level hard nion
    .level-hard {
      width: 5px;
      height: 80%;
      background-color: $hard;
      border-radius: 2px;
      box-shadow: 0 0 5px $hard;
      position: fixed;
      left: 5%;
      top: 10%;
      transition-duration: 0.5s;
      @media (max-width: $phone) {
        height: 90%;
        top: 8%;
      }

      @media (min-width: $tablet) {
        position: absolute;
        height: 90%;
        top: 5%;
      }
    }

    // level normal nion
    .level-normal {
      @extend .level-hard;
      background-color: $normal;
      box-shadow: 0 0 5px $normal;
    }

    // level easy nion
    .level-easy {
      @extend .level-hard;
      background-color: $easy;
      box-shadow: 0 0 5px $easy;
    }

    // options cont
    .options {
      width: 80%;
      height: auto;
      margin: 2% 10% 2% 0%;

      // section title
      h4 {
        width: 100%;
        height: auto;
        color: $font-darck;
        padding: 5px 0px;
        border: 1px solid;
        border-color: transparent transparent $border-darck transparent;
      }

      .option {
        width: 98%;
        min-height: 30px;
        margin: 5px 1%;
        padding: 3px 10px;
        background-color: $card-light;
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;
        color: $font-darck;
        border-radius: 5px;
        position: relative;

        .nion-false {
          width: 4px;
          height: 90%;
          border-radius: 2px 0px 0px 2px;
          position: absolute;
          right: 0px;
          top: 5%;
          background-color: $red;
          box-shadow: 0 0 5px $red;
        }

        .nion-true {
          @extend .nion-false;
          background-color: $green;
          box-shadow: 0 0 5px $green;
        }
      }
    }

    // author container style
    .author {
      width: 80%;
      height: auto;
      margin: 2% 10% 2% 0%;

      // section title
      h4 {
        width: 100%;
        height: auto;
        color: $font-darck;
        padding: 5px 0px;
        border: 1px solid;
        border-color: transparent transparent $border-darck transparent;
      }

      // link
      .user {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: start;
        align-items: center;
        text-decoration: none;
        background-color: $card-light;
        border-radius: 10px;
        padding: 5px;
        margin: 5% 0%;
        transition-duration: 0.5s;
        cursor: pointer;

        // author avatar
        img {
          width: 70px;
          height: 70px;
          border-radius: 5px;
        }

        // author name
        h3 {
          width: auto;
          color: $font-darck;
          margin: -7% 0% 0% 5%;
        }
      }

      a:hover {
        background-color: $border-light;
      }
    }

    // footer component
    .footer-light-Arabic {
      width: 80%;
      margin: 2% 10% 2% 0%;
    }
  }

  // close conatiner style
  .close-cont {
    @extend .open-cont;
    padding: 20% 0px 5% 0px;
    opacity: 0;

    @media (max-width: $phone) {
      width: 100%;
      padding-top: 40%;
    }

    // level hard nion
    .level-hard {
      margin-left: -20%;
      transition-duration: 0.5s;
    }
  }
}
// darck and light Arabic style
</style>
