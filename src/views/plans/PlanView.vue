<template>
  <div
    :class="`plan-page-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <SmallNavComponentVue />
    <SidBarComponentVue />
    <LoadingComponentVue />
    <ErrorComponentVue />
    <CopyMessageComponentVue />
    <div :class="this.$store.state.plan ? 'cont-open' : 'cont-close'">
      <!-- plan title  -->
      <h1>{{ this.$store.state.plan.title }}</h1>
      <!-- plan title  -->
      <!-- plan description  -->
      <div class="description">
        {{ this.$store.state.plan.description }}
      </div>
      <!-- plan description  -->

      <div class="notes-cont">
        <!-- plan class level  -->
        <p>
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.plan_page.class_level
              : this.$store.state.Arabic.plan_page.class_level
          }}
          {{ this.$store.state.plan.class_level }}
        </p>
        <!-- plan class level  -->
        <!-- plan students length  -->
        <p v-if="this.$store.state.plan.students">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.plan_page.students
              : this.$store.state.Arabic.plan_page.students
          }}
          {{ this.$store.state.plan.students.length }}
        </p>
        <!-- plan students length  -->
        <!-- plan teachers length  -->
        <p v-if="this.$store.state.plan.teachers">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.plan_page.teachers
              : this.$store.state.Arabic.plan_page.teachers
          }}
          {{ this.$store.state.plan.teachers.length }}
        </p>
        <!-- plan teachers length  -->
        <!-- plan created at  -->
        <p v-if="this.$store.state.plan.created_at">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.plan_page.created_at
              : this.$store.state.Arabic.plan_page.created_at
          }}
          {{ this.$store.state.plan.created_at.split("T")[0] }}
        </p>
        <!-- plan created at  -->
      </div>

      <!-- copy plan cont  -->
      <div class="plan-btn-cont">
        <!-- copy or delete plan component  -->
        <CopyORremoveThePlanCompoenetVue
          v-if="
            (this.$store.state.user.user &&
              this.$store.state.user.user_type == 'student') ||
            this.$store.state.user.user_type == 'teacher'
          "
          :plan_id="this.$route.params.id"
        />
        <!-- copy or delete plan component  -->

        <!-- copy id compoenent  -->
        <CopyIdComponentVue
          :Id_data="{ object_type: 'Pl', id: this.$store.state.plan._id }"
        />
        <!-- copy id compoenent  -->
      </div>
      <!-- copy plan cont  -->

      <div class="plan-info">
        <div
          class="line"
          v-for="(info, index) in this.$store.state.plan.plan_info"
          :key="index"
        >
          <p class="day">
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.plan_page.day
                : this.$store.state.Arabic.plan_page.day
            }}
            {{ info.day }}
          </p>

          <div class="info-cont">
            <div v-for="(subject, index) in info.subjects" :key="index">
              <p class="title">
                {{
                  this.$store.state.language == "English"
                    ? this.$store.state.English.plan_page.subject
                    : this.$store.state.Arabic.plan_page.subject
                }}
                {{ subject.subject_title }}
              </p>
              |
              <p class="start">
                {{
                  this.$store.state.language == "English"
                    ? this.$store.state.English.plan_page.start
                    : this.$store.state.Arabic.plan_page.start
                }}
                {{ subject.start }}
              </p>
              |
              <p class="end">
                {{
                  this.$store.state.language == "English"
                    ? this.$store.state.English.plan_page.end
                    : this.$store.state.Arabic.plan_page.end
                }}
                {{ subject.end }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- author  -->
      <div
        class="author"
        v-if="this.$store.state.plan"
        @click="GetAdmin(this.$store.state.plan.created_by._id)"
      >
        <!-- author avatar  -->
        <img
          :src="this.$store.state.plan.created_by.avatar"
          alt="avatar"
          class="avatar"
        />
        <!-- author avatar  -->

        <!-- author name -->
        <h3>{{ this.$store.state.plan.created_by.name }}</h3>
        <!-- author name -->
      </div>
      <!-- author  -->
    </div>

    <!-- scroll to top compoenet  -->
    <ScrollTopComponentVue :scroll_page="this.scroll_page" />
    <!-- scroll to top compoenet  -->
  </div>
</template>

<script>
//? importing components
import SmallNavComponentVue from "@/components/global/nav/SmallNavComponent.vue";
import SidBarComponentVue from "@/components/global/SidBarComponent.vue";
import LoadingComponentVue from "@/components/global/LoadingComponent.vue";
import ErrorComponentVue from "@/components/global/ErrorComponent.vue";
import ScrollTopComponentVue from "@/components/global/ScrollTopComponent.vue";
import CopyIdComponentVue from "@/components/global/CopyIdComponent.vue";
import CopyMessageComponentVue from "@/components/global/CopyMessageComponent.vue";
import CopyORremoveThePlanCompoenetVue from "@/components/global/buttons/CopyORremoveThePlanCompoenet.vue";
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
    CopyMessageComponentVue,
    CopyIdComponentVue,
    CopyORremoveThePlanCompoenetVue,
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
          console.log(response);
          // to close the loading component
          this.$store.state.loading = "close";

          // set the plan data to plan var in store
          this.$store.state.plan = response.data.plan_data;
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

    // get admin method
    GetAdmin(id) {
      window.location = `/admin/${id}`;
    },
  },
};
</script>
