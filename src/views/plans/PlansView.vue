<template>
  <div
    :class="`plans-page-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <SmallNavComponentVue />
    <SidBarComponentVue />
    <LoadingComponentVue />
    <ErrorComponentVue />

    <div :class="this.status ? 'cont-open' : 'cont-close'">
      <!-- page title -->
      <h3 class="page-title">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.plans_page.page_title
            : this.$store.state.Arabic.plans_page.page_title
        }}
      </h3>
      <!-- page title -->

      <!-- search component  -->
      <SearchINputComponentVue />
      <!-- search component  -->

      <!-- results cont  -->
      <div class="results-cont">
        <!-- results headers  -->
        <div class="results-heade">
          <p>
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.plans_page.results_message
                : this.$store.state.Arabic.plans_page.results_message
            }}
          </p>
          <icon :icon="this.view_style" @click="ChangeIconStyle" />
        </div>
        <!-- results headers  -->

        <div class="plans-cont">
          <PlanInPlansPageComponentVue
            v-for="(plan_data, index) in this.$store.state.plans"
            :key="index"
            :view_style="this.view_style"
            :Plan_data="plan_data"
          />
        </div>
      </div>
      <!-- results cont  -->
    </div>

    <!-- scroll to top component  -->
    <ScrollTopComponentVue :scroll_page="this.scroll_page" />
    <!-- scroll to top component  -->
  </div>
</template>

<script>
//? importing components
//? importing components
//todo importing components
// importing components
import SmallNavComponentVue from "@/components/global/nav/SmallNavComponent.vue";
import SidBarComponentVue from "@/components/global/SidBarComponent.vue";
import LoadingComponentVue from "@/components/global/LoadingComponent.vue";
import ErrorComponentVue from "@/components/global/ErrorComponent.vue";
import SearchINputComponentVue from "@/components/plan/SearchINputComponent.vue";
import PlanInPlansPageComponentVue from "@/components/plan/PlanInPlansPageComponent.vue";
import ScrollTopComponentVue from "@/components/global/ScrollTopComponent.vue";
import axios from "axios";

export default {
  name: "plans-page",
  data() {
    return {
      // plans view style
      view_style: "list",
      // limit of plans
      limit: 50,
      // page of plans in data base
      page: 1,
      // to open or close the scrollTp button
      scroll_page: 0,
      // open or close the compoenet
      status: false,
    };
  },
  components: {
    SmallNavComponentVue,
    SidBarComponentVue,
    LoadingComponentVue,
    ErrorComponentVue,
    SearchINputComponentVue,
    PlanInPlansPageComponentVue,
    ScrollTopComponentVue,
  },
  mounted() {
    // to start the loading animation on load the page
    window.addEventListener("load", () => {
      // start the loading animation
      this.$store.state.loading = "open";
    });

    // call to handel method on window scroll
    window.addEventListener("scroll", this.handelScroll);

    // call to get plans method
    this.GetPlans();
  },
  methods: {
    //? get to plans method
    async GetPlans() {
      await axios
        .get(this.$store.state.APIs.plans.get_all, {
          params: {
            limit: this.limit,
            page: this.page,
          },
        })
        .then((response) => {
          // open the page conatiner
          this.status = true;

          // set the plans data from response to plans array in store to open the page's cont like smooth
          this.$store.state.plans = [
            ...this.$store.state.plans,
            ...response.data.plans_data,
          ];

          // to stope the loading animation
          this.$store.state.loading = "close";
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

    // change the style view type
    ChangeIconStyle() {
      this.view_style = this.view_style == "list" ? "window-restore" : "list";
    },

    // handelScroll
    handelScroll() {
      if (
        window.scrollY + window.innerHeight >=
        document.body.scrollHeight - 600
      ) {
        this.scroll_page = window.scrollY;

        // to change the page
        this.page += 1;

        // call to get plans method to get more plans
        this.GetPlans();
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";

// darck and light English list style
.plans-page-list-darck-English {
  width: 100%;
  height: auto;
  border-radius: 10px;
  background-color: $card-darck;
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  margin: 5px 0px;
  transition-duration: 0.5s;
  cursor: pointer;
  direction: ltr;

  // plan title style
  h2 {
    width: 100%;
    height: auto;
    color: $font-light;
  }

  // notes style
  p {
    width: auto;
    height: auto;
    padding: 3px;
    color: $font-light;
    font-size: $x-small;
    border-radius: 3px;
    margin: 3px;
    background-color: $note-darck;
  }
}

.plans-page-list-light-English {
  @extend .plans-page-list-darck-English;
  background-color: $card-light;

  // plan title
  h2 {
    color: $font-darck;
  }

  // notes style
  p {
    color: $font-darck;
    background-color: $note-light;
  }
}
// darck and light English list style

// darck and light Arabic list style
.plans-page-list-darck-Arabic {
  width: 100%;
  height: auto;
  border-radius: 10px;
  background-color: $card-darck;
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  margin: 5px 0px;
  transition-duration: 0.5s;
  cursor: pointer;
  direction: rtl;

  // plan title style
  h2 {
    width: 100%;
    height: auto;
    color: $font-light;
  }

  // notes style
  p {
    width: auto;
    height: auto;
    padding: 3px;
    color: $font-light;
    font-size: $x-small;
    border-radius: 3px;
    margin: 3px;
    background-color: $note-darck;
  }
}

.plans-page-list-light-Arabic {
  @extend .plans-page-list-darck-Arabic;
  background-color: $card-light;

  // plan title
  h2 {
    color: $font-darck;
  }

  // notes style
  p {
    color: $font-darck;
    background-color: $note-light;
  }
}
// darck and light Arabic list style

// darck and light English window-restore style
.plans-page-window-restore-darck-English {
  @extend .plans-page-list-darck-English;
  width: 45%;
  margin: 5px 2%;
}

.plans-page-window-restore-light-English {
  @extend .plans-page-window-restore-darck-English;
  background-color: $card-light;

  // plan title
  h2 {
    color: $font-darck;
  }

  // notes style
  p {
    color: $font-darck;
    background-color: $note-light;
  }
}
// darck and light English window-restore style

// darck and light Arabic window-restore style
.plans-page-window-restore-darck-Arabic {
  @extend .plans-page-window-restore-darck-English;
  direction: rtl;
}

.plans-page-window-restore-light-Arabic {
  @extend .plans-page-window-restore-light-English;
  direction: rtl;
}
// darck and light Arabic window-restore style
</style>
