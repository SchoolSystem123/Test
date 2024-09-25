<template>
  <div
    :class="`start-exam-page-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <SmallNavComponent />
    <SidBarComponent />
    <LoadingComponent />

    <div :class="this.status ? 'open-cont' : 'close-cont'">
      <!-- header  -->
      <div class="header">
        <h3 class="page-title">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.start_exam_page.page_title
              : this.$store.state.Arabic.start_exam_page.page_title
          }}
        </h3>

        <p>
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.start_exam_page.time
              : this.$store.state.Arabic.start_exam_page.time
          }}
        </p>
      </div>
      <!-- header  -->

      <!-- classes level list  -->
      <label
        for="class_level"
        v-if="
          this.$store.state.user &&
          this.$store.state.user.user_type != 'student'
        "
      >
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.start_exam_page.choose_class_level
            : this.$store.state.Arabic.start_exam_page.choose_class_level
        }}
      </label>

      <select
        name=""
        id="class_level"
        v-model="this.class_level"
        v-if="
          this.$store.state.user &&
          this.$store.state.user.user_type != 'student'
        "
      >
        <option
          v-for="(class_level, index) in this.$store.state.Classes_level_list"
          :key="index"
          :value="class_level.English"
        >
          {{
            this.$store.state.language == "English"
              ? class_level.English
              : class_level.Arabic
          }}
        </option>
      </select>
      <!-- classes level list  -->

      <!-- Subject List -->
      <label
        for="subject"
        v-if="
          this.$store.state.user &&
          this.$store.state.user.user_type != 'student'
        "
      >
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.start_exam_page.choose_subject
            : this.$store.state.Arabic.start_exam_page.choose_subject
        }}
      </label>

      <select
        name=""
        id="subject"
        v-model="this.subject_type"
        v-if="
          this.$store.state.user &&
          this.$store.state.user.user_type != 'student'
        "
      >
        <option
          v-for="(subject, index) in this.$store.state.subjects_list"
          :key="index"
          :value="subject.English"
        >
          {{
            this.$store.state.language == "English"
              ? subject.English
              : subject.Arabic
          }}
        </option>
      </select>
      <!-- Subject List  -->

      <!-- info  -->
      <div class="info">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.start_exam_page.info
            : this.$store.state.Arabic.start_exam_page.info
        }}
      </div>
      <!-- info  -->

      <!-- start button  -->
      <button @click="GetExam">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.start_exam_page.start
            : this.$store.state.Arabic.start_exam_page.start
        }}
      </button>
      <!-- start button  -->
    </div>
  </div>
</template>

<script>
//? importing the components
import SmallNavComponent from "@/components/global/nav/SmallNavComponent.vue";
import SidBarComponent from "@/components/global/SidBarComponent.vue";
import LoadingComponent from "@/components/global/LoadingComponent.vue";

export default {
  name: "exam-page",
  data() {
    return {
      // page status
      status: false,
      // class level
      class_level:
        this.$store.state.user && this.$store.state.user.user_type == "student"
          ? this.$store.state.user.user.class_level
          : "First_grade",
      // subject type
      subject_type: "Math",
    };
  },
  components: {
    SmallNavComponent,
    SidBarComponent,
    LoadingComponent,
  },
  mounted() {
    setTimeout(() => {
      this.status = true;
    }, 500);
  },
  methods: {
    // get to exam page method
    GetExam() {
      window.location = `/exam/${this.subject_type}/${this.class_level}`;
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";

// darck and light English style
.start-exam-page-darck-English {
  width: 100%;
  min-height: 100vh;
  background-color: $body-darck;
  direction: ltr;

  .open-cont {
    width: 50%;
    height: auto;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    padding: 5% 0px 5% 0px;
    opacity: 1;
    transition-duration: 0.5s;

    @media (max-width: $phone) {
      width: 100%;
      padding: 10% 0px 5% 0px;
    }

    // page title style
    .header {
      width: 90%;
      margin: 5%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0px;
      color: $font-light;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
    }

    label {
      width: 90%;
      height: 30px;
      margin: 5px 5%;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
      color: $font-light;
    }

    select {
      width: 90%;
      height: 40px;
      margin: 5px 5%;
      border-radius: 5px;
      border: none;
      outline: none;
      background-color: $message-light;
    }

    .info {
      width: 90%;
      height: auto;
      margin: 10px 5%;
      color: $font-light;
    }

    button {
      width: 90%;
      height: 40px;
      margin: 5px 5%;
      border: none;
      outline: none;
      border-radius: 5px;
      background-color: $green;
      color: $font-light;
      cursor: pointer;
    }
  }

  .close-cont {
    @extend .open-cont;
    padding: 20% 0px 5% 0px;
    transition-duration: 0.5s;
    opacity: 0;
  }
}

.start-exam-page-light-English {
  width: 100%;
  min-height: 100vh;
  background-color: $body-light;
  direction: ltr;

  .open-cont {
    width: 50%;
    height: auto;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    padding: 5% 0px 5% 0px;
    opacity: 1;
    transition-duration: 0.5s;

    @media (max-width: $phone) {
      width: 100%;
      padding: 10% 0px 5% 0px;
    }

    // page title style
    .header {
      width: 90%;
      margin: 5%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0px;
      color: $font-darck;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
    }

    label {
      width: 90%;
      height: 30px;
      margin: 5px 5%;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
      color: $font-darck;
    }

    select {
      width: 90%;
      height: 40px;
      margin: 5px 5%;
      border-radius: 5px;
      border: none;
      outline: none;
      background-color: $message-light;
    }

    .info {
      width: 90%;
      height: auto;
      margin: 10px 5%;
      color: $font-darck;
    }

    button {
      width: 90%;
      height: 40px;
      margin: 5px 5%;
      border: none;
      outline: none;
      border-radius: 5px;
      background-color: $green;
      color: $font-light;
      cursor: pointer;
    }
  }

  .close-cont {
    @extend .open-cont;
    padding: 20% 0px 5% 0px;
    transition-duration: 0.5s;
    opacity: 0;
  }
}
// darck and light English style

// darck and light Arabic style
.start-exam-page-darck-Arabic {
  width: 100%;
  min-height: 100vh;
  background-color: $body-darck;
  direction: rtl;

  .open-cont {
    width: 50%;
    height: auto;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    padding: 5% 0px 5% 0px;
    opacity: 1;
    transition-duration: 0.5s;

    @media (max-width: $phone) {
      width: 100%;
      padding: 10% 0px 5% 0px;
    }

    // page title style
    .header {
      width: 90%;
      margin: 5%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0px;
      color: $font-light;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
    }

    label {
      width: 90%;
      height: 30px;
      margin: 5px 5%;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
      color: $font-light;
    }

    select {
      width: 90%;
      height: 40px;
      margin: 5px 5%;
      border-radius: 5px;
      border: none;
      outline: none;
      background-color: $message-light;
    }

    .info {
      width: 90%;
      height: auto;
      margin: 10px 5%;
      color: $font-light;
    }

    button {
      width: 90%;
      height: 40px;
      margin: 5px 5%;
      border: none;
      outline: none;
      border-radius: 5px;
      background-color: $green;
      color: $font-light;
      cursor: pointer;
    }
  }

  .close-cont {
    @extend .open-cont;
    padding: 20% 0px 5% 0px;
    transition-duration: 0.5s;
    opacity: 0;
  }
}

.start-exam-page-light-Arabic {
  width: 100%;
  min-height: 100vh;
  background-color: $body-light;
  direction: rtl;

  .open-cont {
    width: 50%;
    height: auto;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    padding: 5% 0px 5% 0px;
    opacity: 1;
    transition-duration: 0.5s;

    @media (max-width: $phone) {
      width: 100%;
      padding: 10% 0px 5% 0px;
    }

    // page title style
    .header {
      width: 90%;
      margin: 5%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0px;
      color: $font-darck;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
    }

    label {
      width: 90%;
      height: 30px;
      margin: 5px 5%;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
      color: $font-darck;
    }

    select {
      width: 90%;
      height: 40px;
      margin: 5px 5%;
      border-radius: 5px;
      border: none;
      outline: none;
      background-color: $message-light;
    }

    .info {
      width: 90%;
      height: auto;
      margin: 10px 5%;
      color: $font-darck;
    }

    button {
      width: 90%;
      height: 40px;
      margin: 5px 5%;
      border: none;
      outline: none;
      border-radius: 5px;
      background-color: $green;
      color: $font-light;
      cursor: pointer;
    }
  }

  .close-cont {
    @extend .open-cont;
    padding: 20% 0px 5% 0px;
    transition-duration: 0.5s;
    opacity: 0;
  }
}
// darck and light Arabic style
</style>
