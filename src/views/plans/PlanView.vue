<template>
  <div
    :class="`plan-page-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <SmallNavComponentVue />
    <SidBarComponentVue />
    <LoadingComponentVue />
    <ErrorComponentVue />
    <div :class="this.$store.state.plan ? 'cont-open' : 'cont-close'">
      <!-- plan title  -->
      <h1>title</h1>
      <!-- plan title  -->
      <!-- plan description  -->
      <div class="description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo et, nobis
        enim architecto omnis consequuntur necessitatibus quaerat inventore
        veniam expedita!
      </div>
      <!-- plan description  -->

      <div class="notes-cont">
        <!-- plan class level  -->
        <p>class level</p>
        <!-- plan class level  -->
        <!-- plan students length  -->
        <p>students</p>
        <!-- plan students length  -->
        <!-- plan teachers length  -->
        <p>teachers</p>
        <!-- plan teachers length  -->
        <!-- plan created at  -->
        <p>created_at</p>
        <!-- plan created at  -->
        <!-- plan created at  -->
        <p>created_at</p>
        <!-- plan created at  -->
      </div>

      <div class="plan-info">
        <div
          class="line"
          v-for="(info, index) in this.$store.state.plan.plan_info"
          :key="index"
        >
          <p class="day">{{ info.day }}</p>

          <div class="info-cont">
            <div v-for="(subject, index) in info.subjects" :key="index">
              <p class="title">{{ subject.subject_title }}</p>
              <p class="start">start : {{ subject.start }}</p>
              <p class="end">end : {{ subject.end }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ScrollTopComponentVue :scroll_page="this.scroll_page" />
  </div>
</template>

<script>
//? importing components
import SmallNavComponentVue from "@/components/global/nav/SmallNavComponent.vue";
import SidBarComponentVue from "@/components/global/SidBarComponent.vue";
import LoadingComponentVue from "@/components/global/LoadingComponent.vue";
import ErrorComponentVue from "@/components/global/ErrorComponent.vue";
import ScrollTopComponentVue from "@/components/global/ScrollTopComponent.vue";
import axios from "axios";

export default {
  name: "plan-page",
  data() {
    return {
      // to open or close the scrollTp button
      scroll_page: 0,
    };
  },
  components: {
    SmallNavComponentVue,
    SidBarComponentVue,
    LoadingComponentVue,
    ErrorComponentVue,
    ScrollTopComponentVue,
  },
  mounted() {
    // to start the loading compoenet on load page
    window.addEventListener("load", () => {
      this.$store.state.loading = "open";
    });

    // call to get plan method
    this.GetPlan();
  },
  methods: {
    // get to plans method
    async GetPlan() {
      axios
        .get(this.$store.state.APIs.plans.get_one, {
          params: {
            // catch the plan id from url params
            plan_id: this.$route.params.id,
          },
        })
        .then((response) => {
          // to close the loading component
          this.$store.state.loading = "close";
          console.log(response);
          // set the plan data to plan var in store
          this.$store.state.plan = response.data.plan_data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
