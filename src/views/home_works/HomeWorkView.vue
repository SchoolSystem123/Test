<template>
  <div
    :class="`home-work-page-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <SidBarComponentVue />
    <LoadingComponentVue />
    <CopyMessageComponentVue />
    <ErrorComponentVue />
    <VerifyDeleteHWComponentVue />
    <div :class="this.status ? 'open-cont' : 'close-cont'">
      <SmallNavComponentVue />

      <div class="page-title">
        <!-- page title  -->
        <h4>
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.home_work_page.page_title
              : this.$store.state.Arabic.home_work_page.page_title
          }}
        </h4>
        <!-- page title  -->

        <p v-if="this.$store.state.home_work.created_at">
          {{ this.$store.state.home_work.created_at.split("T")[0] }} : 📆
        </p>
      </div>

      <!-- update home work shurt btn component  -->
      <UpdateHWhSurtCutBtnComponentVue
        v-if="this.$store.state.user"
        :home_work_id="this.$store.state.home_work._id"
      />

      <!-- delete home work shurt cut btn component  -->
      <DeleteHWShurtCutBtnComponentVue
        v-if="this.$store.state.user.user"
        :home_work_id="this.$store.state.home_work._id"
      />

      <!-- cover container  -->
      <div class="cover-cont">
        <!-- cover  -->
        <img
          :src="this.$store.state.home_work.images[0]"
          alt="cover"
          v-if="
            this.$store.state.home_work.images &&
            this.$store.state.home_work.images.length > 0
          "
          class="cover"
        />

        <!-- note component  -->
        <NoteComponentVue
          v-if="
            this.$store.state.home_work.note &&
            this.$store.state.home_work.note != null
          "
          :note="this.$store.state.home_work.note"
        />
        <!-- note component  -->
      </div>

      <!-- title  -->
      <h2 class="title">{{ this.$store.state.home_work.title }}</h2>

      <!-- description  -->
      <p class="description">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.home_work_page.description
            : this.$store.state.Arabic.home_work_page.description
        }}
        {{ this.$store.state.home_work.description }}
      </p>

      <!-- copy id component  -->
      <CopyIdComponentVue
        :Id_data="{ id: this.$store.state.home_work._id, object_type: 'H' }"
      />

      <p class="subject">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.home_work_page.subject
            : this.$store.state.Arabic.home_work_page.subject
        }}
        {{ this.$store.state.home_work.subject }}
      </p>

      <!-- images container  -->
      <div class="images-cont">
        <div class="images-heade">
          <h4>
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.home_work_page.images_title
                : this.$store.state.Arabic.home_work_page.images_title
            }}
          </h4>
          <p
            v-if="
              this.$store.state.home_work.images &&
              this.$store.state.home_work.images.length > 1
            "
          >
            {{ this.$store.state.home_work.images.length }}
          </p>
        </div>
        <img
          v-for="(image, index) in this.$store.state.home_work.images"
          :key="index"
          :src="image"
          alt="image"
          class="image"
        />

        <!-- no any image result message  -->
        <p
          class="result-message"
          v-if="
            this.$store.state.home_work.images &&
            this.$store.state.home_work.images.length == 0
          "
        >
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.home_work_page.result_message
              : this.$store.state.Arabic.home_work_page.result_message
          }}
        </p>
      </div>
      <!-- images container  -->

      <!-- class title  -->
      <h4 class="section-title">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.home_work_page.class
            : this.$store.state.Arabic.home_work_page.class
        }}
      </h4>

      <!-- class component  -->
      <ClassComponentVue
        @click="GoToClass(this.$store.state.home_work.class_id._id)"
        v-if="this.$store.state.home_work"
        :class_data="this.$store.state.home_work.class_id"
      />
      <!-- class component  -->

      <!-- author -->
      <div class="author">
        <h4>
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.home_work_page.created_by
              : this.$store.state.Arabic.home_work_page.created_by
          }}
        </h4>
        <router-link
          :to="
            this.$store.state.home_work.created_by_type == 'admin'
              ? '/admin'
              : '/teacher'
          "
        >
          <img
            v-if="this.$store.state.home_work.created_by"
            :src="this.$store.state.home_work.created_by.avatar"
            alt="avatar"
          />

          <h3 v-if="this.$store.state.home_work.created_by">
            {{ this.$store.state.home_work.created_by.name }}
          </h3>
        </router-link>
      </div>
      <!-- author -->

      <!-- footer component  -->
      <FooterComponentVue />
      <!-- footer component  -->

      <!-- level nion  -->
      <div :class="`level-${this.$store.state.home_work.level}`"></div>

      <!-- scroll to top component  -->
      <ScrollTopComponentVue :scroll_page="this.scroll_page" />
      <!-- scroll to top component  -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SmallNavComponentVue from "@/components/global/nav/SmallNavComponent.vue";
import SidBarComponentVue from "@/components/global/SidBarComponent.vue";
import LoadingComponentVue from "@/components/global/LoadingComponent.vue";
import CopyIdComponentVue from "@/components/global/CopyIdComponent.vue";
import CopyMessageComponentVue from "@/components/global/CopyMessageComponent.vue";
import ErrorComponentVue from "@/components/global/ErrorComponent.vue";
import ClassComponentVue from "@/components/class/ClassComponent.vue";
import FooterComponentVue from "@/components/global/FooterComponent.vue";
import ScrollTopComponentVue from "@/components/global/ScrollTopComponent.vue";
import NoteComponentVue from "@/components/global/NoteComponent.vue";
import UpdateHWhSurtCutBtnComponentVue from "@/components/global/shurtCutsButtons/UpdateHWShurtCutBtnComponent.vue";
import DeleteHWShurtCutBtnComponentVue from "@/components/global/shurtCutsButtons/DeleteHWShurtCutBtnComponent.vue";
import VerifyDeleteHWComponentVue from "@/components/global/forms/VerifyDeleteHWComponent.vue";

export default {
  name: "home-work-page",
  data() {
    return {
      home_work_id: this.$route.params.id,
      scroll_page: 0,
      // open or close the compoenet
      status: false,
    };
  },
  components: {
    SmallNavComponentVue,
    SidBarComponentVue,
    LoadingComponentVue,
    CopyIdComponentVue,
    CopyMessageComponentVue,
    ErrorComponentVue,
    ClassComponentVue,
    FooterComponentVue,
    ScrollTopComponentVue,
    NoteComponentVue,
    UpdateHWhSurtCutBtnComponentVue,
    DeleteHWShurtCutBtnComponentVue,
    VerifyDeleteHWComponentVue,
  },
  mounted() {
    // to start the loading animation on loaded the page
    window.addEventListener("load", () => {
      // to start the loading animation
      this.$store.state.loading = "open";
    });

    // call get home work method
    this.GetHomeWork();

    // call scroll method on scroll
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    // get the home work method
    async GetHomeWork() {
      try {
        axios
          .get(
            `${this.$store.state.APIs.home_works.get_home_work_one}?home_work_id=${this.home_work_id}`
          )
          .then((response) => {
            // open the page conatiner
            this.status = true;

            // set the home work data to home work data var in stor
            this.$store.state.home_work = response.data.home_work_data;

            // to stop the loading animation
            this.$store.state.loading = "close";
          })
          .catch((error) => {
            // to stop the loading animation
            this.$store.state.loading = "close";

            // set the error message to the error message in store
            this.$store.state.error_message = error.response.data.message;

            // to open the error form
            this.$store.state.error_form_status = "open";
          });
      } catch (error) {
        // to stop the loading animation
        this.$store.state.loading = "close";

        // set the error message to the error message in store
        this.$store.state.error_message = error.response.data.message;

        // to open the error form
        this.$store.state.error_form_status = "open";
      }
    },

    // fo to class on click
    GoToClass(id) {
      window.location = `/class/${id}`;
    },

    // scroll method
    handleScroll() {
      this.scroll_page = window.scrollY;
    },
  },
};
</script>
