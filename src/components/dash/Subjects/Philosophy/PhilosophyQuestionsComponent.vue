<template>
  <div
    :class="`philosophy-questions-page-${this.$store.state.mood}-${this.$store.state.language}-${this.status}`"
    @scroll="handleScroll"
  >
    <!-- header  -->
    <div class="header">
      <h3>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.questions.philosophy
            : this.$store.state.Arabic.questions.philosophy
        }}
      </h3>

      <p>{{ this.questions_count }}</p>
    </div>
    <!-- header  -->

    <!-- section  -->
    <div class="section">
      <QuestionInQuestionsComponent
        v-for="(question_data, index) in this.$store.state.philosophy_questions"
        :key="index"
        :question_data="question_data"
        :subject_type="this.subject_type"
      />
    </div>
    <!-- section  -->
  </div>
</template>

<script>
import QuestionInQuestionsComponent from "@/components/Subjects/QuestionInQuestionsComponent.vue";
import axios from "axios";
export default {
  name: "philosophy-questions-component",
  data() {
    return {
      // page status
      status: "close",
      // questions_count
      questions_count: 0,
      // limit of questions documents
      limit: 20,
      // page
      page: 1,
      // scroll_page
      scroll_page: 0,
      // subject_type
      subject_type: "Philosophy",
    };
  },
  components: {
    QuestionInQuestionsComponent,
  },
  mounted() {
    // call to get philosophy questiosn method
    this.GetQuestionsCount();

    // to open the page on load like smoothey
    setTimeout(() => {
      this.status = "open";
    }, 500);

    // call to get philosophyquestion method
    this.GetPhilosophyQuestions();
  },
  methods: {
    // get questions count method
    async GetQuestionsCount() {
      await axios
        .get(this.$store.state.APIs.subjects_questions.philosophy.get_count)
        .then((response) => {
          // set the questions count from response to questions_count in data section
          this.questions_count = response.data.Questions_count;
        })
        .catch((error) => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // to set the reqeust's error message to error message var in store
          this.$store.state.error_message = error.response.data.message;

          // to open the error form
          this.$store.state.error_form_status = "open";
        });
    },

    // get philosophy questions
    async GetPhilosophyQuestions() {
      // to start the loading animation
      this.$store.state.loading = "open";

      await axios
        .get(this.$store.state.APIs.subjects_questions.philosophy.get_all, {
          params: {
            limit: this.limit,
            page: this.page,
          },
        })
        .then((response) => {
          // to open the page like smoothy
          this.status = "open";

          // to stop the loading animation
          this.$store.state.loading = "close";

          // set the philosophy questions from response to questions array in store
          this.$store.state.philosophy_questions = response.data.questions_data;
        })
        .catch((error) => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // to set the reqeust's error message to error message var in store
          this.$store.state.error_message = error.response.data.message;

          // to open the error form
          this.$store.state.error_form_status = "open";
        });
    },

    // get philosophy questions
    async GetMorePhilosophyQuestions() {
      await axios
        .get(this.$store.state.APIs.subjects_questions.philosophy.get_all, {
          params: {
            limit: this.limit,
            page: this.page,
          },
        })
        .then((response) => {
          // set the philosophy questions from response to questions array in store
          this.$store.state.philosophy_questions = [
            ...this.$store.state.philosophy_questions,
            ...response.data.questions_data,
          ];
        })
        .catch((error) => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // to set the reqeust's error message to error message var in store
          this.$store.state.error_message = error.response.data.message;

          // to open the error form
          this.$store.state.error_form_status = "open";
        });
    },

    // handel scroll method
    handleScroll(event) {
      this.scroll_page = event.target.scrollTop;

      // check if the window height is donw
      if (this.scroll_page > 350) {
        this.scroll_page = window.scrollY;

        // to change page
        this.page += 1;

        // call to Get More questions method
        this.GetMorePhilosophyQuestions();
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../../../Sass/varibels/variables";

// darck and light English style
.philosophy-questions-page-darck-English-open {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 0% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;
  direction: ltr;

  // header
  .header {
    width: 100%;
    height: 40px;
    color: $font-light;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .section {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
}

.philosophy-questions-page-darck-English-open::-webkit-scrollbar {
  width: 0px;
}

.philosophy-questions-page-darck-English-close {
  @extend .philosophy-questions-page-darck-English-open;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

.philosophy-questions-page-light-English-open {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 0% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;
  direction: ltr;

  // header
  .header {
    width: 100%;
    height: 40px;
    color: $font-darck;
    border: 1px solid;
    border-color: transparent transparent $border-darck transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .section {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
}

.philosophy-questions-page-light-English-open::-webkit-scrollbar {
  width: 0px;
}

.philosophy-questions-page-light-English-close {
  @extend .philosophy-questions-page-darck-English-open;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}
// darck and light English style

// darck and light Arabic style
.philosophy-questions-page-darck-Arabic-open {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 0% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;
  direction: rtl;

  // header
  .header {
    width: 100%;
    height: 40px;
    color: $font-light;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .section {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
}

.philosophy-questions-page-darck-Arabic-open::-webkit-scrollbar {
  width: 0px;
}

.philosophy-questions-page-darck-Arabic-close {
  @extend .philosophy-questions-page-darck-Arabic-open;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

.philosophy-questions-page-light-Arabic-open {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 0% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;
  direction: rtl;

  // header
  .header {
    width: 100%;
    height: 40px;
    color: $font-darck;
    border: 1px solid;
    border-color: transparent transparent $border-darck transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .section {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
}

.philosophy-questions-page-light-Arabic-open::-webkit-scrollbar {
  width: 0px;
}

.philosophy-questions-page-light-Arabic-close {
  @extend .philosophy-questions-page-darck-Arabic-open;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}
// darck and light Arabic style
</style>
