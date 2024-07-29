<template>
  <div
    :class="`class-page-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <LoadingComponentVue />
    <ErrorComponentVue />
    <SidBarComponentVue />
    <CopyMessageComponentVue />
    <div :class="this.status ? 'open-cont' : 'close-cont'">
      <SmallNavComponentVue />
      <NoteComponentVue
        v-if="this.$store.state.class.note"
        :note="this.$store.state.class.note"
      />

      <!-- class cover -->
      <img :src="this.$store.state.class.cover" alt="cover" class="cover" />

      <!-- teacher avatar  -->
      <router-link
        to="/teacher"
        class="teacher"
        v-if="this.$store.state.class.teacher"
      >
        <img
          :src="this.$store.state.class.teacher.avatar"
          alt="teacher avatar"
          class="avatar"
        />
        <h3>{{ this.$store.state.class.teacher.name }}</h3>
      </router-link>

      <!-- class title -->
      <h1>{{ this.$store.state.class.title }}</h1>

      <!-- class id  -->
      <CopyIdComponentVue
        :Id_data="{ id: this.$store.state.class._id, object_type: 'C' }"
      />

      <!-- join & levae button -->
      <JoinAndLeaveBtnComponentVue
        v-if="
          this.$store.state.user &&
          this.$store.state.user.user_type == 'student'
        "
        :class_id="this.$route.params.id"
      />
      <!-- join & levae to button -->

      <!-- class level -->
      <p id="info">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.class_page.class_level
            : this.$store.state.Arabic.class_page.class_level
        }}
        {{ this.$store.state.class.class_level }}
      </p>
      <!-- class level -->

      <!-- class subject -->
      <p id="info">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.class_page.class_subject
            : this.$store.state.Arabic.class_page.class_subject
        }}
        {{ this.$store.state.class.subject }}
      </p>
      <!-- class subject -->

      <!-- student length  -->
      <p
        id="info-link"
        v-if="this.$store.state.class.students"
        @click="ChangeSection('students')"
      >
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.class_page.section_title.student
            : this.$store.state.Arabic.class_page.section_title.student
        }}
        {{ this.$store.state.class.students.length }}
      </p>
      <!-- student length  -->

      <!-- home works length  -->
      <p
        id="info-link"
        v-if="this.$store.state.class.home_works"
        @click="ChangeSection('home_works')"
      >
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.class_page.section_title.home_work
            : this.$store.state.Arabic.class_page.section_title.home_work
        }}
        {{ this.$store.state.class.home_works.length }}
      </p>
      <!-- home works length  -->

      <!-- author -->
      <div class="author">
        <h3>
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.class_page.created_by
              : this.$store.state.Arabic.class_page.created_by
          }}
        </h3>
        <!-- created by  -->
        <router-link
          :to="
            this.$store.state.class.created_by_type == 'admin' ||
            this.$store.state.class.created_by_type == 'super'
              ? `/admin/${this.$store.state.class.created_by._id}`
              : `/teacher/${this.$store.state.class.created_by._id}`
          "
          v-if="this.$store.state.class.created_by"
        >
          <img
            :src="this.$store.state.class.created_by.avatar"
            alt="teacher avatar"
            class="avatar"
          />
          <h5>{{ this.$store.state.class.created_by.name }}</h5>
        </router-link>
      </div>
      <!-- author -->

      <!-- home works conatiner  -->
      <h4 v-if="this.section_type == 'home_works'">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.class_page.section_title.home_work
            : this.$store.state.Arabic.class_page.section_title.home_work
        }}
        <icon
          v-if="
            this.$store.state.class.home_works &&
            this.$store.state.class.home_works.length > 0
          "
          :icon="this.view_style"
          @click="ChangeIconStyle"
        />
      </h4>

      <div class="home-works" v-if="this.section_type == 'home_works'">
        <p
          v-if="
            this.$store.state.class.home_works &&
            this.$store.state.class.home_works.length == 0
          "
          class="result-message"
        >
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.class_page.result_messages
                  .home_work_message
              : this.$store.state.Arabic.class_page.result_messages
                  .home_work_message
          }}
        </p>
        <HomeWorkComponentVue
          v-for="(HW, index) in this.$store.state.class.home_works"
          :key="index"
          :home_work="HW"
          :view_style="this.view_style"
        />
      </div>
      <!-- home works conatiner  -->

      <!-- students conatiner  -->
      <h4 v-if="this.section_type == 'students'">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.class_page.section_title.student
            : this.$store.state.Arabic.class_page.section_title.student
        }}
        <icon
          v-if="
            this.$store.state.class.students &&
            this.$store.state.class.students.length > 0
          "
          :icon="this.view_style"
          @click="ChangeIconStyle"
        />
      </h4>

      <div class="students" v-if="this.section_type == 'students'">
        <p
          v-if="
            this.$store.state.class.students &&
            this.$store.state.class.students.length == 0
          "
          class="result-message"
        >
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.class_page.result_messages.students
              : this.$store.state.Arabic.class_page.result_messages.students
          }}
        </p>

        <!-- student componenet -->
        <StudentComponentVue
          v-for="(student, index) in this.$store.state.class.students"
          :key="index"
          :student_data="student"
          :view_style="this.view_style"
        />
      </div>
      <!-- students conatiner  -->

      <!-- footer component  -->
      <FooterComponentVue />
      <!--  scroll to scomponent  -->
    </div>
    <ScrollTopComponentVue :scroll_page="this.scroll_page" />
  </div>
</template>

<script>
import axios from "axios";
import LoadingComponentVue from "@/components/global/LoadingComponent.vue";
import ErrorComponentVue from "@/components/global/ErrorComponent.vue";
import SidBarComponentVue from "@/components/global/SidBarComponent.vue";
import NoteComponentVue from "@/components/global/NoteComponent.vue";
import HomeWorkComponentVue from "@/components/homeWorks/HomeWorkComponent.vue";
import CopyIdComponentVue from "@/components/global/CopyIdComponent.vue";
import ScrollTopComponentVue from "@/components/global/ScrollTopComponent.vue";
import CopyMessageComponentVue from "@/components/global/CopyMessageComponent.vue";
import FooterComponentVue from "@/components/global/FooterComponent.vue";
import SmallNavComponentVue from "@/components/global/nav/SmallNavComponent.vue";
import JoinAndLeaveBtnComponentVue from "@/components/global/buttons/JoinAndLeaveBtnComponent.vue";
import StudentComponentVue from "@/components/student/StudentComponent.vue";

export default {
  name: "class-page",
  data() {
    return {
      class_data: "",
      view_style: "list",
      scroll_page: 0,
      section_type: "home_works",
      // open or close the compoenet
      status: false,
    };
  },
  mounted() {
    // check if the class svaed in store or not
    if (!this.$store.state.class) {
      this.GetClass();
    }

    // call the handleScroll method on scrol window
    window.addEventListener("scroll", this.handleScroll);
  },
  components: {
    LoadingComponentVue,
    ErrorComponentVue,
    SidBarComponentVue,
    NoteComponentVue,
    HomeWorkComponentVue,
    CopyIdComponentVue,
    ScrollTopComponentVue,
    CopyMessageComponentVue,
    FooterComponentVue,
    SmallNavComponentVue,
    JoinAndLeaveBtnComponentVue,
    StudentComponentVue,
  },
  methods: {
    // change icon style
    ChangeIconStyle() {
      this.view_style = this.view_style == "list" ? "window-restore" : "list";
      console.log(this.view_style);
    },

    // get class method
    async GetClass() {
      // to start the loading animation
      this.$store.state.loading = "open";

      await axios
        .get(
          `${this.$store.state.APIs.classes.get_one}?class_id=${this.$route.params.id}`
        )
        .then((response) => {
          // open the page conatiner
          this.status = true;

          // set the class data from response to class var in store
          this.$store.state.class = response.data.class_data;
          console.log(response.data);
        })
        .catch((error) => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // to set the reqeust's error message to error message var in store
          this.$store.state.error_message = error.response.data.message;

          // to open the error form
          this.$store.state.error_form_status = "open";
        });

      // to stop the loading animation
      this.$store.state.loading = "close";
    },

    // scroll method
    handleScroll() {
      this.scroll_page = window.scrollY;
    },

    // Change section
    ChangeSection(type) {
      this.section_type = type;
      console.log(this.section_type);
    },
  },
};
</script>
