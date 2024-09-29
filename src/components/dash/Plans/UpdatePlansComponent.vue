<template>
  <div
    :class="`update-plan-${this.$store.state.mood}-${this.$store.state.language}-${this.status}`"
  >
    <!-- header  -->
    <div class="header">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.update_plan.page_title
          : this.$store.state.Arabic.update_plan.page_title
      }}
    </div>
    <!-- header  -->

    <!-- form  -->
    <div class="form">
      <!-- title  -->
      <label for="title">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.update_plan.title
          : this.$store.state.Arabic.update_plan.title
      }}</label>

      <input
        type="text"
        id="title"
        v-model="this.title"
        :placeholder="
          this.$store.state.language == `English`
            ? this.$store.state.English.update_plan.title_placeholder
            : this.$store.state.Arabic.update_plan.title_placeholder
        "
      />
      <!-- title  -->

      <!-- description  -->
      <label for="description">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.update_plan.description
          : this.$store.state.Arabic.update_plan.description
      }}</label>

      <textarea
        type="text"
        id="description"
        v-model="this.description"
        :placeholder="
          this.$store.state.language == `English`
            ? this.$store.state.English.update_plan.description_placeholder
            : this.$store.state.Arabic.update_plan.description_placeholder
        "
      ></textarea>
      <!-- description  -->

      <!-- note  -->
      <label for="note">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.update_plan.note
          : this.$store.state.Arabic.update_plan.note
      }}</label>

      <textarea
        type="text"
        id="note"
        v-model="this.note"
        :placeholder="
          this.$store.state.language == `English`
            ? this.$store.state.English.update_plan.plan_placeholder
            : this.$store.state.Arabic.update_plan.plan_placeholder
        "
      ></textarea>
      <!-- note  -->

      <!-- level  -->
      <label for="level">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.update_plan.level
          : this.$store.state.Arabic.update_plan.level
      }}</label>

      <select name="" id="level" v-model="this.level">
        <option
          v-for="(level, index) in this.$store.state.Classes_level_list"
          :value="level.English"
          :key="index"
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
      <button @click="UpdatePlan">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.update_plan.button
            : this.$store.state.Arabic.update_plan.button
        }}
      </button>
      <!-- button  -->
    </div>
    <!-- form  -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "update-plan-component",
  data() {
    return {
      status: "close",
      // title
      title: this.$store.state.plan_data_for_update.title,
      // description
      description: this.$store.state.plan_data_for_update.description,
      // note
      note: this.$store.state.plan_data_for_update.note,
      // level
      level: this.$store.state.plan_data_for_update.class_level,
      // body data
      body_data: {},
    };
  },
  mounted() {
    setTimeout(() => {
      this.status = "open";
      console.log(this.$store.state.plan_data_for_update);
    }, 500);
  },
  methods: {
    // update plan
    async UpdatePlan() {
      // start loading
      this.$store.state.loading = "open";

      // craete headers
      const headers = {
        Authorization: `Bearer ${this.$store.state.user.token}`,
      };

      // add the super or admin id
      if (this.$store.state.user.user_type == "super") {
        this.body_data.super_admin_id = this.$store.state.user.user._id;
        this.body_data.plan_id = this.$store.state.plan_data_for_update._id;
      } else if (this.$store.state.user.user_type == "admin") {
        this.body_data.admin_id = this.$store.state.user.user._id;
        this.body_data.plan_id = this.$store.state.plan_data_for_update._id;
      }

      // add the title
      if (this.$store.state.plan_data_for_update.title != this.title) {
        this.body_data.title = this.title;
      }

      // add the description
      if (
        this.$store.state.plan_data_for_update.description != this.description
      ) {
        this.body_data.description = this.description;
      }

      // add the note
      if (this.$store.state.plan_data_for_update.note != this.note) {
        this.body_data.note = this.note;
      }

      // add the level
      if (
        this.$store.state.plan_data_for_update.class_level != this.class_level
      ) {
        this.body_data.class_level = this.level;
      }

      await axios
        .put(
          this.$store.state.user.user_type == "super"
            ? this.$store.state.APIs.plans.super.update
            : this.$store.state.APIs.plans.admin.update,
          this.body_data,
          { headers }
        )
        .then(() => {
          // to stop loading
          this.$store.state.loading = "close";

          // emptying the title's input
          this.title = "";

          // emptying the description's input
          this.description = "";

          // emptying the note's input
          this.note = "";

          // emptying the level's input
          this.level = "";

          // emptying the plan info in store
          this.$store.state.plan_info = [];

          // move to plans component
          this.$store.state.active_component_in_dash = "plans";
        })
        .catch((error) => {
          // to stop loading
          this.$store.state.loading = "close";

          // open the error from
          this.$store.state.error_form_status = "open";

          // set the error message to error message in store
          this.$store.state.error_message = error.response.data.message;
        });
    },

    // oprn close component
    OpenClosecomponent() {
      // set the day data to
      console.log(this.$store.state.plan_data_for_update);
      // to open the component
      this.$store.commit("OpenOrCloseAddSubjectForm");
    },
  },
};
</script>

<style lang="scss">
@import "../../../Sass/varibels/variables";

// darck and light English style
.update-plan-darck-English-open {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 5% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;
  direction: ltr;

  .header {
    width: 100%;
    height: auto;
    padding: 5px 0px;
    color: $font-light;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;
  }

  .form {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    label {
      width: 100%;
      height: auto;
      padding: 5px 0px;
      margin: 5px 0px;
      color: $font-light;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
    }

    input,
    select {
      width: 100%;
      height: 40px;
      border: none;
      outline: none;
      border-radius: 5px;
      margin: 5px 0px;
      padding: 0px 10px;
      background-color: $body-light;
    }

    textarea {
      width: 100%;
      height: 120px;
      border-radius: 5px;
      border: none;
      outline: none;
      resize: none;
      margin: 5px 0px;
      background-color: $body-light;
      padding: 5px 5px 5px 10px;
    }

    .plan-data {
      width: 100%;
      min-height: 120px;
      border-radius: 5px;
      margin: 5px 0px;
      padding: 40px 3px 3px 3px;
      background-color: $card-darck;
      position: relative;

      .add {
        position: absolute;
        left: 5px;
        top: 5px;
        font-size: $x-small;
        padding: 3px;
        border-radius: 3px;
        background-color: $blue;
        color: $font-light;
        cursor: pointer;
      }

      .line {
        width: 98%;
        min-height: 40px;
        margin: 5px 1%;
        border-radius: 3px;
        background-color: $body-darck;
        display: flex;
        justify-content: end;
        align-items: center;
        position: relative;

        h5 {
          position: absolute;
          left: 5px;
          top: 5px;
          padding: 3px;
          border-radius: 3px;
          background-color: $note-darck;
          color: $font-light;
          @media (max-width: $phone) {
            font-size: $xx-small;
          }
        }

        .subjects {
          width: 85%;
          min-height: 30px;
          margin: 3px 0px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: end;

          .subject {
            width: 98%;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: space-around;
            margin: 5px 1%;
            padding: 3px;
            border-radius: 3px;
            background-color: $note-darck;
            color: $font-light;

            @media (max-width: $phone) {
              width: 90%;
            }

            p {
              @media (max-width: $phone) {
                font-size: $xx-small;
              }
            }

            div {
              cursor: pointer;
            }
          }
        }
      }
    }

    button {
      padding: 10px 20px;
      border-radius: 5px;
      border: none;
      outline: none;
      color: $font-light;
      margin: 10px 0px;
      background-color: $green;
      cursor: pointer;
    }
  }
}

.update-plan-darck-English-open::-webkit-scrollbar {
  width: 0px;
}

.update-plan-darck-English-close {
  @extend .update-plan-darck-English-open;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

.update-plan-light-English-open {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 5% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;
  direction: ltr;

  .header {
    width: 100%;
    height: auto;
    padding: 5px 0px;
    color: $font-darck;
    border: 1px solid;
    border-color: transparent transparent $border-darck transparent;
  }

  .form {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    label {
      width: 100%;
      height: auto;
      padding: 5px 0px;
      margin: 5px 0px;
      color: $font-darck;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
    }

    input,
    select {
      width: 100%;
      height: 40px;
      border: none;
      outline: none;
      border-radius: 5px;
      margin: 5px 0px;
      padding: 0px 10px;
      background-color: $note-light;
    }

    textarea {
      width: 100%;
      height: 120px;
      border-radius: 5px;
      border: none;
      outline: none;
      resize: none;
      margin: 5px 0px;
      background-color: $note-light;
      padding: 5px 5px 5px 10px;
    }

    .plan-data {
      width: 100%;
      min-height: 120px;
      border-radius: 5px;
      margin: 5px 0px;
      padding: 40px 3px 3px 3px;
      background-color: $card-light;
      position: relative;

      .add {
        position: absolute;
        left: 5px;
        top: 5px;
        font-size: $x-small;
        padding: 3px;
        border-radius: 3px;
        background-color: $blue;
        color: $font-light;
        cursor: pointer;
      }

      .line {
        width: 98%;
        min-height: 40px;
        margin: 5px 1%;
        border-radius: 3px;
        background-color: $body-light;
        display: flex;
        justify-content: end;
        align-items: center;
        position: relative;

        h5 {
          position: absolute;
          left: 5px;
          top: 5px;
          padding: 3px;
          border-radius: 3px;
          background-color: $note-light;
          color: $font-darck;
          @media (max-width: $phone) {
            font-size: $xx-small;
          }
        }

        .subjects {
          width: 85%;
          min-height: 30px;
          margin: 3px 0px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: end;

          .subject {
            width: 98%;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: space-around;
            margin: 5px 1%;
            padding: 3px;
            border-radius: 3px;
            background-color: $note-light;
            color: $font-darck;
            @media (max-width: $phone) {
              width: 90%;
            }

            p {
              @media (max-width: $phone) {
                font-size: $xx-small;
              }
            }
          }
        }
      }
    }

    button {
      padding: 10px 20px;
      border-radius: 5px;
      border: none;
      outline: none;
      color: $font-light;
      margin: 10px 0px;
      background-color: $green;
      cursor: pointer;
    }
  }
}

.update-plan-light-English-open::-webkit-scrollbar {
  width: 0px;
}

.update-plan-light-English-close {
  @extend .update-plan-light-English-open;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}
// darck and light English style

// darck and light Arabic style
.update-plan-darck-Arabic-open {
  @extend .update-plan-darck-English-open;
  direction: rtl;

  .form {
    .plan-data {
      width: 100%;
      min-height: 120px;
      border-radius: 5px;
      margin: 5px 0px;
      padding: 40px 3px 3px 3px;
      background-color: $card-darck;
      position: relative;

      .add {
        position: absolute;
        left: 5px;
        top: 5px;
        font-size: $x-small;
        padding: 3px;
        border-radius: 3px;
        background-color: $blue;
        color: $font-light;
        cursor: pointer;
      }

      .line {
        h5 {
          position: absolute;
          left: 82%;
          top: 5px;
          padding: 3px;
          border-radius: 3px;
          background-color: $note-darck;
          color: $font-light;
          @media (max-width: $phone) {
            font-size: $xx-small;
          }
        }
      }
    }
  }
}

.update-plan-darck-Arabic-open::-webkit-scrollbar {
  width: 0px;
}

.update-plan-darck-Arabic-close {
  @extend .update-plan-darck-Arabic-open;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

.update-plan-light-Arabic-open {
  @extend .update-plan-light-English-open;
  direction: rtl;

  .form {
    .plan-data {
      width: 100%;
      min-height: 120px;
      border-radius: 5px;
      margin: 5px 0px;
      padding: 40px 3px 3px 3px;
      background-color: $card-light;
      position: relative;

      .line {
        h5 {
          position: absolute;
          left: 82%;
          top: 5px;
          padding: 3px;
          border-radius: 3px;
          background-color: $note-light;
          color: $font-darck;
          @media (max-width: $phone) {
            font-size: $xx-small;
          }
        }
      }
    }
  }
}

.update-plan-light-Arabic-open::-webkit-scrollbar {
  width: 0px;
}

.update-plan-light-Arabic-close {
  @extend .update-plan-light-Arabic-open;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}
// darck and light Arabic style
</style>
