<template>
  <div
    :class="`show-student-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <SmallNavComponentVue />
    <SidBarComponentVue />
    <ErrorComponentVue />
    <LoadingComponentVue />

    <!-- container  -->
    <div :class="this.status ? 'cont-open' : 'cont-open'">
      <!-- section one container  -->
      <div class="section-one">
        <!-- avatar  -->
        <div :class="`avatar-${this.$store.state.theme}`">
          <img
            :src="this.$store.state.student.avatar"
            alt="avatar"
            class="avatar-img"
          />
        </div>
        <!-- avatar  -->

        <div class="info">
          <!-- name  -->
          <h2>
            {{ this.$store.state.student.name }}
          </h2>
          <!-- name  -->

          <!-- points  -->
          <h3>
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.student.points
                : this.$store.state.Arabic.student.points
            }}
            {{ this.$store.state.student.points }}
          </h3>
          <!-- points  -->

          <!-- GPA  -->
          <h3>
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.student.gpa
                : this.$store.state.Arabic.student.gpa
            }}
            {{ this.$store.state.student.total_gpa }}
          </h3>
          <!-- GPA  -->
        </div>

        <div class="notes">
          <!-- exams  -->
          <p>
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.student.exams
                : this.$store.state.Arabic.student.exams
            }}
            {{ this.$store.state.student.finished_exams }}
          </p>
          <!-- exams  -->

          <!-- gender  -->
          <p>
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.student.gender
                : this.$store.state.Arabic.student.gender
            }}
            {{ this.$store.state.student.gender }}
          </p>
          <!-- gender  -->

          <!-- class level  -->
          <p>
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.student.class_level
                : this.$store.state.Arabic.student.class_level
            }}
            {{ this.$store.state.student.class_level }}
          </p>
          <!-- class level  -->

          <!-- joind at  -->
          <p v-if="this.$store.state.student.joind_at">
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.student.joind_at
                : this.$store.state.Arabic.student.joind_at
            }}
            {{ this.$store.state.student.joind_at.split("T")[0] }}
          </p>
          <!-- joind at  -->

          <!-- Phone Number  -->
          <p v-if="this.$store.state.student.phone_number">
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.student.phone
                : this.$store.state.Arabic.student.phone
            }}
            {{ this.$store.state.student.phone_number }}
          </p>
          <!-- Phone Number  -->
        </div>

        <!--  copy id component   -->
        <CopyIdComponentVue
          :Id_data="{ object_type: 'S', id: this.$store.state.student._id }"
        />
        <!--  copy id component   -->

        <!--  about me  -->
        <span class="content" v-if="this.$store.state.student.about_me">
          {{ this.$store.state.student.about_me }}
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
            v-for="(medal, index) in this.$store.state.English.student.medals"
            :key="index"
          >
            {{
              this.$store.state.student.total_gpa >= medal.gpa
                ? medal.message
                : "🔒" // default value
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
            v-for="(medal, index) in this.$store.state.Arabic.student.medals"
            :key="index"
          >
            {{
              this.$store.state.student.total_gpa >= medal.gpa
                ? medal.message
                : "🔒" // default value
            }}
          </p>
          <!-- medals in Arabic language  -->
        </div>
      </div>
      <!-- section one container  -->
    </div>
    <!-- container  -->

    <!-- scroll to top component  -->
    <ScrollTopComponentVue :scroll_page="this.scroll_page" />
    <!-- scroll to top component  -->
  </div>
</template>

<script>
//? importing the components
import SmallNavComponentVue from "@/components/global/nav/SmallNavComponent.vue";
import SidBarComponentVue from "@/components/global/SidBarComponent.vue";
import ErrorComponentVue from "@/components/global/ErrorComponent.vue";
import ScrollTopComponentVue from "@/components/global/ScrollTopComponent.vue";
import LoadingComponentVue from "@/components/global/LoadingComponent.vue";
import axios from "axios";

export default {
  name: "shoe-student-page",
  data() {
    return {
      // open or close the compoenet
      status: false,
      // to open or close the scrollTp button
      scroll_page: 0,
    };
  },
  mounted() {
    // to start the loading compoenet on load page
    window.addEventListener("load", () => {
      this.$store.state.loading = "open";
    });

    // call to handel scroll method on scroll
    window.addEventListener("sceoll", this.handelScroll);

    // call to the Get student data method
    this.GetStudent();
  },
  components: {
    SmallNavComponentVue,
    SidBarComponentVue,
    ErrorComponentVue,
    ScrollTopComponentVue,
    LoadingComponentVue,
  },
  methods: {
    // get the student data method
    async GetStudent() {
      await axios
        .get(this.$store.state.APIs.students.get_one, {
          params: {
            student_id: this.$route.params.id,
          },
        })
        .then((response) => {
          // to close the loading component
          this.$store.state.loading = "close";

          // set the student data from response to student in store
          this.$store.state.student = response.data.student_data;

          // update the status to open the container
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

    // handel scroll method
    handelScroll() {
      this.scroll_page = window.scrollY;
    },
  },
};
</script>
