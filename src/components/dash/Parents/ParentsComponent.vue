<template>
  <div
    :class="`section-cont-${this.status}-${this.$store.state.mood}-${this.$store.state.language}`"
    @scroll="handleScroll"
  >
    <!-- admins header  -->
    <div class="header">
      <div class="title">
        <h3>
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.dash_parents_component.title
              : this.$store.state.Arabic.dash_parents_component.title
          }}
        </h3>
        <div class="count">{{ this.parents_count }}</div>
      </div>
      <StartRateTeachersComponentVue />
    </div>
    <!-- admins header  -->

    <div class="cards-section">
      <ParentInParentsPageComponentDash
        v-for="(parents_data, index) in this.$store.state.parents"
        :key="index"
        :parents_data="parents_data"
        :view_style="this.view_style"
        :Dash="true"
      />
    </div>
  </div>
</template>

<script>
import ParentInParentsPageComponentDash from "@/components/parent/ParentInParentsPageComponentDash.vue";
import axios from "axios";
export default {
  name: "students-component",
  data() {
    return {
      status: "close",
      // limit of parents documents
      limit: 20,
      // page of parents
      page: 1,
      // elements view style
      view_style: "list",
      // parents count
      parents_count: 0,
    };
  },
  components: {
    ParentInParentsPageComponentDash,
  },
  mounted() {
    // call to the get parents method
    this.GetParentsCount();

    // call to Get parents methdo
    this.GetParents();
  },
  methods: {
    //get to all parents count
    async GetParentsCount() {
      await axios
        .get(this.$store.state.APIs.parents.get_count)
        .then((response) => {
          // set the students count to the parents count in data
          this.parents_count = response.data.parents_count;
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

    // get parents
    async GetParents() {
      // to start the loading animation
      this.$store.state.loading = "open";

      await axios
        .get(this.$store.state.APIs.parents.get_all, {
          params: {
            limit: this.limit,
            page: this.page,
          },
        })
        .then((response) => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // update the status to open the page
          this.status = "open";

          // set the parents data from response to parents array in store
          this.$store.state.parents = response.data.parents_data;
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

    // get more parents method
    async GetMoreParents() {
      await axios
        .get(this.$store.state.APIs.parents.get_all, {
          params: {
            limit: this.limit,
            page: this.page,
          },
        })
        .then((response) => {
          // set the parents data from response to parents array in store
          this.$store.state.parents = [
            ...this.$store.state.parents,
            ...response.data.parents_data,
          ];
        })
        .catch((error) => {
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

        // call to Get Parents method
        this.GetMoreParents();
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../../Sass/varibels/variables";

// darck and light English style
.section-cont-open-darck-English {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 5% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;
  direction: ltr;

  @media (min-width: $phone) {
    padding: 5px;
  }

  .header {
    width: 100%;
    height: 40px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;

    p {
      padding: 7px 20px;
      border-radius: 5px;
      color: $font-light;
      background-color: $note-darck;
      margin: 5px;
      font-size: $small;
      @media (max-width: $phone) {
        font-size: $x-small;
        padding: 6px 10px;
      }
    }

    // header title
    .title {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h3 {
        width: 90%;
        height: auto;
        color: $font-light;
      }

      .count {
        width: auto;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $font-light;
        font-size: $x-small;
        background-color: none;
      }
    }
  }

  .cards-section {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;
  }
}

.section-cont-open-darck-English::-webkit-scrollbar {
  width: 0px;
}

.section-cont-close-darck-English {
  @extend .section-cont-open-darck-English;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

.section-cont-open-light-English {
  @extend .section-cont-open-darck-English;
  .header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border-color: transparent transparent $border-darck transparent;

    // header title
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h3 {
        color: $font-darck;
      }

      .count {
        width: auto;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: none;
        color: $font-darck;
        font-size: $x-small;
      }
    }
  }
}

.section-cont-close-light {
  @extend .section-cont-open-light-English;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

.section-cont-open-light-English::-webkit-scrollbar {
  width: 0px;
}
// darck and light English style

// darck and light Arabic style
.section-cont-open-darck-Arabic {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 5% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;
  direction: rtl;

  @media (min-width: $phone) {
    padding: 5px;
  }

  .header {
    width: 100%;
    height: 40px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;

    p {
      padding: 7px 20px;
      border-radius: 5px;
      color: $font-light;
      background-color: $note-darck;
      margin: 5px;
      font-size: $small;
      @media (max-width: $phone) {
        font-size: $x-small;
        padding: 6px 10px;
      }
    }

    // header title
    .title {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h3 {
        width: 90%;
        height: auto;
        color: $font-light;
      }

      .count {
        width: auto;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $font-light;
        font-size: $x-small;
        background-color: none;
      }
    }
  }

  .cards-section {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;
  }
}

.section-cont-open-darck-Arabic::-webkit-scrollbar {
  width: 0px;
}

.section-cont-close-darck-Arabic {
  @extend .section-cont-open-darck-Arabic;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

.section-cont-open-light-Arabic {
  @extend .section-cont-open-darck-Arabic;
  .header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border-color: transparent transparent $border-darck transparent;

    // header title
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h3 {
        color: $font-darck;
      }

      .count {
        width: auto;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: none;
        color: $font-darck;
        font-size: $x-small;
      }
    }
  }
}

.section-cont-close-light {
  @extend .section-cont-open-light-Arabic;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

.section-cont-open-light-Arabic::-webkit-scrollbar {
  width: 0px;
}
// darck and light Arabic style
</style>
