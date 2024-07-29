<template>
  <div
    :class="`profile-page-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <LoadingComponentVue />
    <SidBarComponentVue />
    <SmallNavComponentVue />
    <ErrorComponentVue />
    <CopyMessageComponentVue />
    <div :class="this.status ? 'cont-open' : 'cont-close'">
      <!-- section one container  -->
      <div class="section-one">
        <!-- avatar  -->
        <div :class="`avatar-${this.$store.state.theme}`">
          <img
            :src="this.$store.state.profile.avatar"
            alt="avatar"
            class="avatar-img"
          />
        </div>
        <!-- avatar  -->
        <router-link
          class="update-icon"
          :to="`/updateProfile/${this.$store.state.user.user._id}`"
          >⚙️</router-link
        >

        <div class="info">
          <!-- name  -->
          <h2>
            {{ this.$store.state.profile.name }}
          </h2>
          <!-- name  -->

          <!-- points  -->
          <h3>
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.profile.points
                : this.$store.state.Arabic.profile.points
            }}
            {{ this.$store.state.profile.points }}
          </h3>
          <!-- points  -->

          <!-- GPA  -->
          <h3>
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.profile.gpa
                : this.$store.state.Arabic.profile.gpa
            }}
            {{ this.$store.state.profile.total_gpa }}
          </h3>
          <!-- GPA  -->
        </div>

        <div class="notes">
          <!-- exams  -->
          <p>
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.profile.exams
                : this.$store.state.Arabic.profile.exams
            }}
            {{ this.$store.state.profile.finished_exams }}
          </p>
          <!-- exams  -->

          <!-- gender  -->
          <p>
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.profile.gender
                : this.$store.state.Arabic.profile.gender
            }}
            {{ this.$store.state.profile.gender }}
          </p>
          <!-- gender  -->

          <!-- class level  -->
          <p>
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.profile.class_level
                : this.$store.state.Arabic.profile.class_level
            }}
            {{ this.$store.state.profile.class_level }}
          </p>
          <!-- class level  -->

          <!-- joind at  -->
          <p v-if="this.$store.state.profile.joind_at">
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.profile.joind_at
                : this.$store.state.Arabic.profile.joind_at
            }}
            {{ this.$store.state.profile.joind_at.split("T")[0] }}
          </p>
          <!-- joind at  -->

          <!-- Phone Number  -->
          <p v-if="this.$store.state.profile.phone_number">
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.profile.phone
                : this.$store.state.Arabic.profile.phone
            }}
            {{ this.$store.state.profile.phone_number }}
          </p>
          <!-- Phone Number  -->
        </div>

        <!--  copy id component   -->
        <CopyIdComponentVue
          :Id_data="{ object_type: 'S', id: this.$store.state.profile._id }"
        />
        <!--  copy id component   -->

        <!--  about me  -->
        <span class="content" v-if="this.$store.state.profile.about_me">
          {{ this.$store.state.profile.about_me }}
        </span>
        <!--  about me  -->

        <!-- medals in English language  -->
        <div
          class="medals"
          v-if="
            this.$store.state.language == 'English' &&
            this.$store.state.user_type == 'student'
          "
        >
          <span>Medals</span>

          <!-- add the medals by gpa -->
          <p
            v-for="(medal, index) in this.$store.state.English.profile.medals"
            :key="index"
          >
            {{
              this.$store.state.profile.total_gpa >= medal.gpa
                ? medal.message
                : "🔒"
            }}
          </p>
        </div>
        <!-- medals in English language  -->

        <!-- medals in Arabic language  -->
        <div
          class="medals"
          v-if="
            this.$store.state.language == 'Arabic' &&
            this.$store.state.user_type == 'student'
          "
        >
          <span>الميدليات</span>

          <!-- add the medals by gpa -->
          <p
            v-for="(medal, index) in this.$store.state.Arabic.profile.medals"
            :key="index"
          >
            {{
              this.$store.state.profile.total_gpa >= medal.gpa
                ? medal.message
                : "🔒"
            }}
          </p>
          <!-- medals in Arabic language  -->
        </div>
      </div>
      <!-- section one container  -->

      <!-- add plans here    -->

      <!-- section tow container  -->
      <div class="section-tow">
        <div class="title">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.profile.classes_cont.title
              : this.$store.state.Arabic.profile.classes_cont.title
          }}
        </div>

        <!-- class component  -->
        <ClassComponentVue
          v-for="(class_data, index) in this.$store.state.profile.classes"
          :key="index"
          :class_data="class_data"
        />
        <!-- class component  -->

        <router-link to="/my/classes">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.profile.classes_cont.title
              : this.$store.state.Arabic.profile.classes_cont.title
          }}
          <icon icon="arrow-right" />
        </router-link>
      </div>
      <!-- section tow container  -->

      <!-- section three container  -->
      <div class="section-tow">
        <div class="title">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.profile.plans_cont.title
              : this.$store.state.Arabic.profile.plans_cont.title
          }}
        </div>

        <!-- plan component  -->
        <PlanInProfilePageCompoeneVue
          v-for="(plan_data, index) in this.$store.state.profile.my_plans"
          :key="index"
          :plan_data="plan_data"
        />
        <!-- class component  -->

        <router-link to="/my/plans">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.profile.plans_cont.title
              : this.$store.state.Arabic.profile.plans_cont.title
          }}
          <icon icon="arrow-right" />
        </router-link>
      </div>
      <!-- section three container  -->
    </div>

    <!-- scroll to top compoenent  -->
    <ScrollTopComponentVue :scroll_page="this.scroll_page" />
    <!-- scroll to top compoe nent  -->
  </div>
</template>

<script>
import SmallNavComponentVue from "@/components/global/nav/SmallNavComponent.vue";
import SidBarComponentVue from "@/components/global/SidBarComponent.vue";
import LoadingComponentVue from "@/components/global/LoadingComponent.vue";
import ErrorComponentVue from "@/components/global/ErrorComponent.vue";
import CopyIdComponentVue from "@/components/global/CopyIdComponent.vue";
import CopyMessageComponentVue from "@/components/global/CopyMessageComponent.vue";
import ClassComponentVue from "@/components/class/ClassComponent.vue";
import PlanInProfilePageCompoeneVue from "@/components/plan/PlanInProfilePageCompoene.vue";
import ScrollTopComponentVue from "@/components/global/ScrollTopComponent.vue";
import axios from "axios";

export default {
  name: "profile-page",
  data() {
    return {
      api: "",
      // open or close the compoenet
      status: false,

      scroll_page: 0,
    };
  },
  components: {
    SmallNavComponentVue,
    SidBarComponentVue,
    LoadingComponentVue,
    ErrorComponentVue,
    CopyMessageComponentVue,
    CopyIdComponentVue,
    ClassComponentVue,
    PlanInProfilePageCompoeneVue,
    ScrollTopComponentVue,
  },
  mounted() {
    // check if the user is loged in
    if (!this.$store.state.user.user) {
      //send the user to log in page
      window.location = "/login";
    }

    //* to start the loading animation on loaded the page
    window.addEventListener("load", () => {
      // to start the loading animation
      this.$store.state.loading = "open";
    });

    // cla to get student profile data method
    this.GeProfileData();

    // handel scroll
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    //? select the api
    SelectApi() {
      if (this.$store.state.user.user_type == "admin") {
        this.api = this.$store.state.APIs.admins.get_one;
        // update user type in store
        this.$store.state.user_type = "admin";
      } else if (this.$store.state.user.user_type == "teacher") {
        this.api = this.$store.state.APIs.teachers.get_one;
        // update user type in store
        this.$store.state.user_type = "teacher";
      } else if (this.$store.state.user.user_type == "student") {
        this.api = this.$store.state.APIs.students.get_one;
        // update user type in store
        this.$store.state.user_type = "student";
      } else if (this.$store.state.user.user_type == "parent") {
        this.api = this.$store.state.APIs.parents.get_one;
        // update user type in store
        this.$store.state.user_type = "parent";
      }
    },

    // get to use profile data
    async GeProfileData() {
      // call to select api method
      this.SelectApi();

      await axios
        .get(this.api, {
          params: {
            student_id: this.$store.state.user.user._id,
          },
        })
        .then((response) => {
          // open the page conatiner
          this.status = true;

          // set the respons student data to profile in store
          this.$store.state.profile = response.data.user_data;

          // to stop the loading animation
          this.$store.state.loading = "close";

          console.log(response);
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

    // handleScroll
    async handleScroll() {
      // to start scroll to top component
      this.scroll_page = window.scrollY;
    },
  },
};
</script>
