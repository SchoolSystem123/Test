<template>
  <div :class="`section-cont-${this.status}-${this.$store.state.mood}`">
    <!-- header  -->
    <div class="header">
      <h3>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.home_works_in_dash.page_title
            : this.$store.state.Arabic.home_works_in_dash.page_title
        }}
      </h3>
    </div>
    <!-- header  -->

    <div class="cards-section">
      <HomeWorkComponent
        v-for="(home_work, index) in this.$store.state.home_works"
        :key="index"
        :home_work="home_work"
        :view_style="this.view_style"
      />
    </div>
  </div>
</template>

<script>
import HomeWorkComponent from "@/components/homeWorks/HomeWorkComponent.vue";
import axios from "axios";
export default {
  name: "home-work-component",
  data() {
    return {
      // status
      status: "close",
      // limit of home works's documents
      limit: 20,
      // page of home works's documents
      page: 1,
      // view_style
      view_style: "window-restore",
    };
  },
  mounted() {
    // call to get home works method
    this.GetHomeWorks();
  },
  components: {
    HomeWorkComponent,
  },
  methods: {
    // get home works method
    async GetHomeWorks() {
      // to start the loading
      this.$store.state.loading = "open";

      await axios
        .get(this.$store.state.APIs.home_works.get_all, {
          params: {
            limit: this.limit,
            page: this.page,
          },
        })
        .then((Response) => {
          // to stop the loading
          this.$store.state.loading = "close";

          // to open the page
          this.status = "open";

          // set the home works data from response to home_works array in store
          this.$store.state.home_works = Response.data.home_works_data;
        })
        .catch((error) => {
          // to stop the loading
          this.$store.state.loading = "close";

          // to open the page
          this.status = "open";

          // to set the reqeust's error message to error message var in store
          this.$store.state.error_message = error.response.data.message;

          // to open the error form
          this.$store.state.error_form_status = "open";
        });
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
    padding: 5px 0px;
    margin: 0px 0px 10px 0px;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;

    h3 {
      color: $font-light;
    }

    svg {
      padding: 5px;
      border: 1px solid $border-light;
      border-radius: 5px;
      color: $font-light;
      cursor: pointer;
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
    .title {
      border-color: transparent transparent $border-darck transparent;
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
