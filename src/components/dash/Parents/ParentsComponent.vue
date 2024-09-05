<template>
  <div
    :class="`section-cont-${this.status}-${this.$store.state.mood}`"
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
      // limit of teachers documents
      limit: 20,
      // page of teachers
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

// darck and light style
.section-cont-open-darck {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 5% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;

  @media (min-width: $phone) {
    padding: 5px;
  }

  .header {
    width: 100%;
    height: auto;
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

    button {
      padding: 7px 17px;
      border-radius: 5px;
      color: $font-light;
      background-color: $blue;
      cursor: pointer;
      border: none;
      outline: none;
      margin: 5px;
      @media (max-width: $phone) {
        font-size: $x-small;
        padding: 6px 10px;
      }
    }

    // header title
    .title {
      width: 100%;
      height: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h3 {
        width: auto;
        height: auto;
        color: $font-light;
      }

      svg {
        padding: 3px;
        border-radius: 3px;
        color: $font-light;
        border: 1px solid $border-light;
        cursor: pointer;
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

.section-cont-open-darck::-webkit-scrollbar {
  width: 0px;
}

.section-cont-close-darck {
  @extend .section-cont-open-darck;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

.section-cont-open-light {
  @extend .section-cont-open-darck;
  .header {
    // header title
    border-color: transparent transparent $border-darck transparent;
    .title {
      h3 {
        color: $font-darck;
      }
    }
  }
}

.section-cont-close-light {
  @extend .section-cont-open-light;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

.section-cont-open-light::-webkit-scrollbar {
  width: 0px;
}
// darck and light style
</style>
