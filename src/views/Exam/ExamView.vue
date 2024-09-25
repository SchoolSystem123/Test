<template>
  <div
    @loa="rtrt"
    :class="`exam-page-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <LoadingComponent />

    <div :class="this.status ? 'open-cont' : 'close-cont'">
      <!-- header  -->
      <div class="header">
        <h3>
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.exam_page.exam_header
              : this.$store.state.Arabic.exam_page.exam_header
          }}
        </h3>
        <p>{{ this.exam_time }} : {{ this.exa_mints }}⏳</p>
      </div>
      <!-- header  -->

      <div class="container">
        <!-- sid bar -->
        <div :class="`sid-bar-${this.sid_bar_status}`">
          <icon :icon="this.icon" @click="openOrCloseSidBar" />

          <ul>
            <li
              v-for="(question, index) in this.$store.state.exam_questions"
              :key="index"
              @click="ChangeQuestion(question)"
            >
              {{
                this.$store.state.language == "English"
                  ? this.$store.state.English.exam_page.question_header
                  : this.$store.state.Arabic.exam_page.question_header
              }}
              {{ index }}
            </li>
          </ul>
        </div>
        <!-- sid bar -->

        <!-- level nion   -->
        <div :class="`level-${this.active_question.level}`"></div>
        <!-- level nion   -->

        <!-- section  -->
        <div class="section">
          <!-- question's header  -->
          <div class="section-header">
            <h3>
              {{
                this.$store.state.language == "English"
                  ? this.$store.state.English.exam_page.question_header
                  : this.$store.state.Arabic.exam_page.question_header
              }}
            </h3>
            <span>{{ this.active_question.points }}M</span>
          </div>
          <!-- question's header  -->

          <!-- stop exam button  -->
          <button @click="test" :class="`btn-${this.exam_status}`">
            Stop Exam
          </button>
          <!-- stop exam button  -->

          <!-- question's title  -->
          <h4>{{ this.active_question.title }} {{ this.total_points }}</h4>
          <!-- question's title  -->

          <!-- question's description  -->
          <p>
            <mark
              ><u
                >{{
                  this.$store.state.language == "English"
                    ? this.$store.state.English.exam_page.question_description
                    : this.$store.state.Arabic.exam_page.question_description
                }}
              </u></mark
            >
            {{ this.active_question.description }}
          </p>
          <!-- question's description  -->

          <!-- question's description  -->
          <div
            class="repated"
            v-if="
              this.active_question.repated &&
              this.active_question.repated.length > 0
            "
          >
            <p>
              {{
                this.$store.state.language == "English"
                  ? this.$store.state.English.exam_page.question_repated
                  : this.$store.state.Arabic.exam_page.question_repated
              }}
            </p>
            <p
              v-for="(date, index) in this.active_question.repated"
              :key="index"
            >
              {{ date }} 📆
            </p>
            <p>{{ this.active_question.level }}</p>
            <p>{{ this.total_points }}</p>
          </div>
          <!-- question's description  -->

          <!-- images section  -->
          <div
            class="images-cont"
            v-if="
              this.active_question.images &&
              this.active_question.images.length > 0
            "
          >
            <img
              v-for="(path, index) in this.active_question.images"
              :key="index"
              :src="path"
              alt=""
            />
          </div>
          <!-- images section  -->

          <!-- options section  -->
          <div class="options-cont">
            <div
              class="option"
              v-for="(option, index) in this.active_question.options"
              :key="index"
              @click="ChooseOption(option, index)"
            >
              <label :for="option.value">
                <span>{{ option.value }}</span>
              </label>
              <input
                type="checkbox"
                :id="index"
                :checked="
                  this.choosed_option &&
                  this.active_question._id == this.choosed_option.question_id &&
                  this.choosed_option.index == index
                    ? true
                    : false
                "
              />
            </div>

            <button @click="ValidateOption()" class="validate">Validate</button>
            <button @click="RestartOption()" class="restart">Restart</button>
          </div>
          <!-- options section  -->
        </div>
        <!-- section  -->
      </div>
    </div>
  </div>
</template>

<script>
//? importingthe components
import LoadingComponent from "@/components/global/LoadingComponent.vue";
import axios from "axios";
export default {
  name: "exam-page",
  data() {
    return {
      // active question
      active_question: {},
      // choosed option
      choosed_option: "",
      // / exam_choosed_options
      exam_choosed_options: [],
      // exam_choosed_options_id
      exam_choosed_options_id: [],
      // checked value
      checked: "",
      // exam time
      exam_time: this.$store.state.exam_time,
      // mints
      exa_mints: 60,
      // total points
      total_points: 0,
      // page status
      status: false,
      // sid_bar_status
      sid_bar_status: "close",
      // icon
      icon: "arrow-right",
      //exam_status
      exam_status: "open",
      // api
      api: "",
    };
  },
  components: {
    LoadingComponent,
  },
  mounted() {
    setTimeout(() => {
      this.$store.state.loading = "open";
    }, 200);

    this.GetQuestions();

    window.addEventListener("beforeunload", this.handleBeforeUnload);
  },

  // beforeRouteLeave() {
  //   alert("sadasdsad");
  // },
  methods: {
    handleBeforeUnload(event) {
      alert("sadsaf ds f dsf dsf sd fffff");
      event.preventDefault();
      console.log(event);
      // event.returnValue = "Are you sure to leave site?";
    },
    // get questions method
    async GetQuestions() {
      // call to select the api method
      this.SelectApi();
      await axios
        .get(this.api, {
          params: {
            class_level: this.$route.params.class_level,
          },
        })
        .then((response) => {
          // call to start time ending method
          this.TimeMethood();
          console.log(response);
          // to open the cont
          this.status = true;

          // to stop the loading animation
          this.$store.state.loading = "close";

          // set the questiosn from response to exam questions array in store
          this.$store.state.exam_questions = response.data.questions_data;

          // set the first question data to active question
          this.active_question = this.$store.state.exam_questions[0];
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

    // select the api type by subject name
    SelectApi() {
      switch (this.$route.params.subject) {
        case "Math":
          this.api = this.$store.state.APIs.subjects_questions.math.start_exam;
          break;

        case "English":
          this.api =
            this.$store.state.APIs.subjects_questions.english.start_exam;
          break;

        case "Arabic":
          this.api =
            this.$store.state.APIs.subjects_questions.arabic.start_exam;
          break;

        case "French":
          this.api =
            this.$store.state.APIs.subjects_questions.french.start_exam;
          break;

        case "Islam":
          this.api = this.$store.state.APIs.subjects_questions.islam.start_exam;
          break;

        case "History":
          this.api =
            this.$store.state.APIs.subjects_questions.history.start_exam;
          break;

        case "Philosophy":
          this.api =
            this.$store.state.APIs.subjects_questions.philosophy.start_exam;
          break;

        case "Physics":
          this.api =
            this.$store.state.APIs.subjects_questions.physics.start_exam;
          break;

        case "Sciences":
          this.api =
            this.$store.state.APIs.subjects_questions.sciences.start_exam;
          break;

        case "Geography":
          this.api =
            this.$store.state.APIs.subjects_questions.geography.start_exam;
          break;

        case "Chemistry":
          this.api =
            this.$store.state.APIs.subjects_questions.chemistry.start_exam;
          break;

        case "Alwatania":
          this.api =
            this.$store.state.APIs.subjects_questions.alwatania.start_exam;
          break;
      }
    },

    // openOrCloseSidBar
    openOrCloseSidBar() {
      // change icon
      this.icon = this.icon == "arrow-left" ? "arrow-right" : "arrow-left";

      // update sid bar status
      this.sid_bar_status = this.sid_bar_status == "close" ? "open" : "close";
    },

    // handleScroll
    async handleScroll() {
      // check if the window height is donw
      if (
        window.scrollY + window.innerHeight >=
        document.body.scrollHeight - 600
      ) {
        // to change page
        this.page += 1;

        // call the get classes method to get more classes
        await this.GetCLasses();
      }

      // to start scroll to top component
      this.scroll_page = window.scrollY;
    },

    // change question
    ChangeQuestion(question) {
      this.active_question = question;

      let choosed_question_option = this.exam_choosed_options.filter((line) => {
        return line.question_id == this.active_question._id;
      });

      this.choosed_option = choosed_question_option[0];

      console.log(choosed_question_option);
    },

    // ChooseOption
    ChooseOption(option, index) {
      this.choosed_option = {
        question_id: this.active_question._id,
        _id: `${this.active_question._id}${option.answer}${index}`,
        value: option.value,
        answer: option.answer,
        index: index,
      };

      // for check all the worng options
      this.checked = `${option.value}${option.answer}${index}`;
    },

    ValidateOption() {
      // search if the exam_choosed_options has the option
      let isExsist = this.exam_choosed_options.findIndex(
        (line) => line.question_id == this.active_question._id
      );

      // check if the option is exists
      if (
        isExsist == -1 &&
        this.choosed_option.value &&
        this.choosed_option.answer
      ) {
        this.exam_choosed_options.push({
          question_id: this.active_question._id,
          _id: `${this.active_question._id}${this.choosed_option.answer}${this.choosed_option.index}`,
          title: this.choosed_option.value,
          answer: this.choosed_option.answer,
          points: this.choosed_option.answer ? this.active_question.points : 0,
          index: this.choosed_option.index,
        });
      }

      // call to calculate exam points
      this.CalculatePoints();
    },

    RestartOption() {
      // filter and delete the question's option
      this.exam_choosed_options = this.exam_choosed_options.filter((ele) => {
        return ele.question_id != this.active_question._id;
      });

      // emptying the choosed_option
      this.choosed_option = "";

      // call to calculate exam points
      this.CalculatePoints();
    },

    // calculate exam points
    CalculatePoints() {
      // export all choosed options points
      let test = this.exam_choosed_options.map((line) => line.points);

      // calculate all choosed options's points
      this.total_points = test.reduce((total, num) => total + num, 0);
    },

    // time method
    TimeMethood() {
      setInterval(() => {
        if (this.exa_mints > 0) {
          this.exa_mints -= 1;
        } else if (this.exam_time > 0) {
          this.exa_mints = 60;

          this.exam_time -= 1;
        } else {
          alert("Exam is down ...");
        }
      }, 1000);
    },

    test() {
      this.exam_status = this.exam_status == "close" ? "open" : "close";
    },

    rtrt() {
      // event.preventDefault();
      // event.preventDefault();
      alert("sadasdsad");
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";
// darck and light English Style
.exam-page-darck-English {
  width: 100%;
  min-height: 100vh;
  background-color: $body-darck;

  // open cont style
  .open-cont {
    width: 100%;
    height: 100vh;
    margin: auto;
    padding: 3% 0px 5% 0px;
    opacity: 1;
    transition-duration: 0.5s;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    @media (max-width: $phone) {
      width: 100%;
      padding: 10% 0px 5% 0px;
    }

    .header {
      width: 90%;
      margin: 5px 5%;
      height: 40px;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
      color: $font-light;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .container {
      width: 90%;
      height: 85vh;
      margin: 0px 5%;
      position: relative;

      .sid-bar-open {
        width: 20%;
        height: 100%;
        border-radius: 5px;
        backdrop-filter: blur(50px);
        transition-duration: 0.5s;
        position: absolute;
        left: 0%;
        top: 0%;
        z-index: 50;

        @media (max-width: $phone) {
          width: 30%;
        }

        svg {
          transition-duration: 0.5s;
          padding: 7px;
          border-radius: 0%;
          position: absolute;
          right: 5px;
          top: 5px;
          cursor: pointer;
          color: $font-light;
          background-color: $note-darck;
          border-radius: 3px;
        }

        ul {
          width: 100%;
          height: 90%;
          margin-top: 20%;
          list-style-type: none;
          overflow-y: scroll;

          @media (max-width: $phone) {
            margin-top: 50%;
          }

          li {
            width: 98%;
            height: 40px;
            margin: 5px 1%;
            border-radius: 5px;
            padding: 0px 5px;
            display: flex;
            justify-content: start;
            align-items: center;
            color: $font-light;
            cursor: pointer;
            overflow: hidden;
            background-color: $note-darck;
            transition-duration: 0.5s;

            @media (max-width: $phone) {
              font-size: $x-small;
            }
          }

          li:hover {
            background-color: $message-darck;
          }
        }

        ul::-webkit-scrollbar {
          width: 0px;
        }
      }

      .sid-bar-close {
        @extend .sid-bar-open;
        width: 0px;

        svg {
          transition-duration: 0.5s;
          padding: 7px;
          border-radius: 0%;
          position: absolute;
          right: -35px;
          top: 5px;
          cursor: pointer;
          color: $font-light;
          background-color: $note-darck;
          border-radius: 3px;
        }
      }

      .level-hard {
        width: 5px;
        height: 96%;
        border-radius: 0px 2px 2px 0px;
        position: absolute;
        left: 0px;
        top: 2%;
        z-index: 30;
        background-color: $red;
        box-shadow: 0 0 10px $red;
      }

      .level-normal {
        @extend .level-hard;
        background-color: $normal;
        box-shadow: 0 0 10px $normal;
      }

      .level-easy {
        @extend .level-hard;
        background-color: $green;
        box-shadow: 0 0 10px $green;
      }

      .section {
        width: 100%;
        height: 100%;
        margin: 0px;
        border-radius: 5px;
        background-color: #333;
        transition-duration: 0.5s;
        overflow-y: scroll;
        position: relative;

        .section-header {
          width: 90%;
          height: 40px;
          border: 1px solid;
          border-color: transparent transparent $border-light transparent;
          color: $font-light;
          margin: 35px 5% 5px 5%;
          display: flex;
          // align-items: center;

          h3 {
            width: 95%;
            height: 100%;
            display: flex;
            justify-content: start;
            align-items: center;
          }

          span {
            width: 10%;
            height: 100%;
            display: flex;
            justify-content: end;
            align-items: center;
          }
        }

        h4 {
          margin: 5px 0px;
        }

        p {
          font-size: $x-small;
        }

        .repated {
          width: 90%;
          height: auto;
          margin: 5px 5%;
          display: flex;
          flex-wrap: wrap;
          align-items: center;

          p {
            padding: 4px;
            width: auto;
            height: auto;
            border-radius: 4px;
            margin: 3px;
            background-color: $note-darck;
          }
        }

        .btn-open {
          position: absolute;
          right: 5px;
          top: 5px;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          outline: none;
          background-color: $green;
          color: $font-light;
          cursor: pointer;
          transition-duration: 0.5s;

          @media (max-width: $phone) {
            padding: 7px 10px;
          }
        }

        .btn-close {
          @extend .btn-open;
          position: absolute;
          right: 5px;
          top: -10%;
        }

        h4 {
          width: 90%;
          margin: 0px 5%;
          height: auto;
          color: $font-light;
        }

        p {
          width: 90%;
          height: auto;
          margin: 0px 5%;
          color: $font-light;
        }

        .images-cont {
          width: 90%;
          height: auto;
          margin: 5px 5%;

          img {
            width: 100%;
            height: auto;
            border-radius: 5px;
          }
        }

        .options-cont {
          width: 90%;
          height: auto;
          margin: 5px 5%;

          .option {
            width: 100%;
            height: 40px;
            margin: 5px 0%;
            padding: 0px 5px;
            border-radius: 5px;
            cursor: pointer;
            background-color: $note-darck;
            display: flex;
            justify-content: space-between;
            align-items: center;

            label {
              width: 95%;
              height: 100%;
              display: flex;
              justify-content: start;
              align-items: center;

              span {
                color: $font-light;
              }
            }
          }
        }

        .validate {
          width: 100%;
          height: 40px;
          border-radius: 5px;
          cursor: pointer;
          margin: 5px 0%;
          border: none;
          outline: none;
          color: $font-light;
          background-color: $green;
        }

        .restart {
          @extend .validate;
          background-color: $red;
        }
      }

      .section::-webkit-scrollbar {
        width: 0px;
      }
    }
  }

  // close cont style
  .close-cont {
    @extend .open-cont;
    padding: 20% 0px 5% 0px;
    transition-duration: 0.5s;
    opacity: 0;
  }
}
</style>
