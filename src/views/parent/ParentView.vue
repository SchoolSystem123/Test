<template>
  <div
    :class="`profile-page-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <SmallNavComponentVue />
    <SidBarComponentVue />
    <ErrorComponentVue />
    <ScrollTopComponentVue />
    <LoadingComponentVue />
    <CopyMessageComponentVue />

    <div :class="this.status ? 'cont-open' : 'cont-close'">
      <!-- section one container  -->
      <div class="section-one" v-if="this.$store.state.show_user.data">
        <!-- avatar  -->
        <div :class="`avatar-${this.$store.state.theme}`">
          <img
            :src="this.$store.state.show_user.data.avatar"
            alt="avatar"
            class="avatar-img"
          />
        </div>

        <div class="info">
          <!-- name  -->
          <h2>
            {{ this.$store.state.show_user.data.name }}
          </h2>
          <!-- name  -->
        </div>

        <div class="notes">
          <!-- gender  -->
          <p>
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.show_user_page.gender
                : this.$store.state.Arabic.show_user_page.gender
            }}
            {{ this.$store.state.show_user.data.gender }}
          </p>
          <!-- gender  -->

          <!-- children level  -->
          <p>
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.show_user_page.children
                : this.$store.state.Arabic.show_user_page.children
            }}
            {{ this.$store.state.show_user.data.children.length }}
          </p>
          <!-- children level  -->

          <!-- joind at  -->
          <p v-if="this.$store.state.show_user.data.joind_at">
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.show_user_page.joind_at
                : this.$store.state.Arabic.show_user_page.joind_at
            }}
            {{ this.$store.state.show_user.data.joind_at.split("T")[0] }}
          </p>
          <!-- joind at  -->

          <!-- Phone Number  -->
          <p v-if="this.$store.state.show_user.data.phone_number">
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.show_user_page.phone
                : this.$store.state.Arabic.show_user_page.phone
            }}
            {{ this.$store.state.show_user.data.phone_number }}
          </p>
          <!-- Phone Number  -->
        </div>

        <!--  copy id component   -->
        <CopyIdComponentVue
          :Id_data="{
            object_type: 'S',
            id: this.$store.state.show_user.data._id,
          }"
        />
        <!--  copy id component   -->

        <!--  about me  -->
        <span class="content" v-if="this.$store.state.show_user.data.about_me">
          {{ this.$store.state.show_user.data.about_me }}
        </span>
        <!--  about me  -->
      </div>
      <!-- section one container  -->

      <!-- section three container  -->
      <div class="section-tow" v-if="this.$store.state.show_user.data">
        <div class="title">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.show_user_page.plans_cont.title
              : this.$store.state.Arabic.show_user_page.plans_cont.title
          }}
        </div>

        <StudentInStudentsComponent
          v-for="(child_data, index) in this.$store.state.show_user.data
            .children"
          :key="index"
          :student_data="child_data"
          :view_style="`list`"
        />

        <!-- default results messgaes  -->
        <p
          class="default_message"
          v-if="this.$store.state.show_user.data.children.length == 0"
        >
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.show_user_page.default_message_plans
              : this.$store.state.Arabic.show_user_page.default_message_plans
          }}
        </p>
        <!-- default results messgaes  -->
      </div>
      <!-- section three container  -->
    </div>

    <!-- scroll to top compoenent  -->
    <ScrollTopComponentVue :scroll_page="this.scroll_page" />
    <!-- scroll to top compoe nent  -->
  </div>
</template>

<script>
//? importing components
import StudentInStudentsComponent from "@/components/student/StudentInStudentsComponent.vue";
import SmallNavComponentVue from "@/components/global/nav/SmallNavComponent.vue";
import SidBarComponentVue from "@/components/global/SidBarComponent.vue";
import LoadingComponentVue from "@/components/global/LoadingComponent.vue";
import ErrorComponentVue from "@/components/global/ErrorComponent.vue";
import CopyIdComponentVue from "@/components/global/CopyIdComponent.vue";
import CopyMessageComponentVue from "@/components/global/CopyMessageComponent.vue";
import ScrollTopComponentVue from "@/components/global/ScrollTopComponent.vue";
import axios from "axios";

export default {
  name: "admin-page",
  data() {
    return {
      status: false,
      // window scroll
      scroll_page: 0,
    };
  },
  components: {
    SmallNavComponentVue,
    SidBarComponentVue,
    ErrorComponentVue,
    ScrollTopComponentVue,
    LoadingComponentVue,
    CopyIdComponentVue,
    CopyMessageComponentVue,
    StudentInStudentsComponent,
  },
  mounted() {
    //* to start the loading animation on loaded the page
    window.addEventListener("load", () => {
      // to start the loading animation
      this.$store.state.loading = "open";
    });

    // call to get admin method
    this.GetParent();

    // handel scroll
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    // get teacher method
    async GetParent() {
      await axios
        .get(this.$store.state.APIs.parents.get_one, {
          params: {
            parent_id: this.$route.params.id,
          },
        })
        .then((response) => {
          console.log(response);
          // update the status to open the cont
          this.status = true;

          // to stop the loading animation
          this.$store.state.loading = "close";

          // set the parent data to Show user var in store
          this.$store.state.show_user = {
            type: "parent",
            data: response.data.user_data,
          };
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
    handleScroll() {
      // to start scroll to top component
      this.scroll_page = window.scrollY;
    },
  },
};
</script>
