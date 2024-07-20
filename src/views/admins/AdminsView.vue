<template>
  <div
    :class="`admins-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <!-- small nav bar component  -->
    <SmallNavComponentVue />
    <!-- small nav bar component  -->

    <!-- sidbar component  -->
    <SidBarComponentVue />
    <!-- sidbar component  -->

    <!-- loading animation component  -->
    <LoadingComponentVue />
    <!-- loading animation component  -->

    <!-- error form component  -->
    <ErrorComponentVue />
    <!-- error form component  -->

    <div
      :class="
        this.$store.state.admins && this.$store.state.admins.length > 0
          ? 'cont-open'
          : 'cont-close'
      "
    >
      <!-- page title  -->
      <h3 class="page-title">{{ this.$store.state.language == "English" 
        ? this.$store.state.English.admins_page.page_title
        : this.$store.state.Arabic.admins_page.page_title}}</h3>
      <!-- page title  -->

      <SearchByNameComponentVue />

      <!-- results conatiner  -->
      <div :class="`result-cont-${this.view_style}`">
        <!-- results headers  -->
        <div class="results-heade">
          <p>{{ this.$store.state.language == "English" 
        ? this.$store.state.English.admins_page.results_message
        : this.$store.state.Arabic.admins_page.results_message}}</p>
          <icon :icon="this.view_style" @click="ChangeIconStyle" />
        </div>
        <!-- results headers  -->

        <!-- admin component   -->
        <AdminInAdminpagecomponentVue
          v-for="(admin_data, index) in this.$store.state.admins"
          :key="index"
          :admin_data="admin_data"
          :view_style="this.view_style"
        />
        <!-- admin component   -->
      </div>
    </div>

    <ScrollTopComponentVue :scroll_page="this.scroll_page"/>
  </div>
</template>

<script>
import axios from "axios";
import SmallNavComponentVue from "@/components/global/nav/SmallNavComponent.vue";
import SidBarComponentVue from "@/components/global/SidBarComponent.vue";
import LoadingComponentVue from "@/components/global/LoadingComponent.vue";
import SearchByNameComponentVue from "@/components/admin/SearchByNameComponent.vue";
import AdminInAdminpagecomponentVue from "@/components/admin/AdminInAdminspagecomponent.vue";
import ScrollTopComponentVue from '@/components/global/ScrollTopComponent.vue';
import ErrorComponentVue from '@/components/global/ErrorComponent.vue';

export default {
  name: "admin-page",
  data() {
    return {
      view_style: "list",
      limit: 20,
      page: 1,
      scroll_page : 0
    };
  },
  components: {
    SmallNavComponentVue,
    SidBarComponentVue,
    LoadingComponentVue,
    SearchByNameComponentVue,
    AdminInAdminpagecomponentVue,
    ScrollTopComponentVue,
    ErrorComponentVue
  },
  mounted() {
    // to start the loading animation on loaded the page
    window.addEventListener('load' , () => {
      // to start the loading animation
      this.$store.state.loading = "open";
    });

    // call the get admins method on load the page
    this.GetAdmins();

    // handel scroll
    window.addEventListener('scroll' , this.handleScroll);
  },
  methods: {
    // get admins method
    async GetAdmins() {
      await axios
        .get(this.$store.state.APIs.admins.get_all, {
          params: {
            limit: this.limit,
            page: this.page,
          },
        })
        .then((response) => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // set the admins data from response to admins array in store
          this.$store.state.admins = [...this.$store.state.admins ,  ...response.data.admins_data];

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

    // change view style method
    ChangeIconStyle() {
      this.view_style = this.view_style == "list" ? "window-restore" : "list";
    },

    // handleScroll
    handleScroll() {
      // check if the window height is donw
      if (
        window.scrollY + window.innerHeight >=
        document.body.scrollHeight - 600
      ) {
      this.scroll_page = window.scrollY;

        // to change page
        this.page += 1;

        // call the get admins method to get more admins
        this.GetAdmins();
      }
    }
  },
};
</script>
