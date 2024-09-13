<template>
  <div
    :class="`food-page-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <SmallNavComponentVue />
    <SidBarComponentVue />
    <LoadingComponentVue />
    <ErrorComponentVue />

    <div :class="this.$store.state.food ? 'cont-open' : 'cont-close'">
      <div class="page-header">
        <!-- page title  -->
        <h3>
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.food_page.page_title
              : this.$store.state.Arabic.food_page.page_title
          }}
        </h3>
        <!-- page title  -->
        <p v-if="this.$store.state.food.created_at">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.food_page.created_at
              : this.$store.state.Arabic.food_page.created_at
          }}
          {{ this.$store.state.food.created_at.split("T")[0] }}
        </p>
      </div>

      <!-- cover  -->
      <img
        v-if="this.$store.state.food.images"
        :src="this.$store.state.food.images[0]"
        alt="cover"
        class="cover"
      />
      <!-- cover  -->

      <!-- title  -->
      <h2>{{ this.$store.state.food.title }}</h2>
      <!-- title  -->

      <!-- description  -->
      <p>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.food_page.description
            : this.$store.state.Arabic.food_page.description
        }}
        {{ this.$store.state.food.description }}
      </p>
      <!-- description  -->

      <!-- images cont  -->
      <div
        class="images-cont"
        v-if="
          this.$store.state.food && this.$store.state.food.images.length > 0
        "
      >
        <div class="header">
          <h3>
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.food_page.images
                : this.$store.state.Arabic.food_page.images
            }}
          </h3>
          <p>
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.food_page.images_length
                : this.$store.state.Arabic.food_page.images_length
            }}
            {{ this.$store.state.food.images.length }}
          </p>
        </div>

        <img
          v-for="(image, index) in this.$store.state.food.images"
          :key="index"
          :src="image"
          alt="cover"
          class="image"
        />
      </div>
      <!-- images cont  -->

      <!--  footer compoennet  -->
      <FooterComponentVue />
      <!--  footer compoennet  -->
    </div>
    <!--  scroll to top compoennet  -->
    <ScrollTopComponentVue :scroll_page="this.scroll_page" />
    <!--  scroll to top compoennet  -->
  </div>
</template>

<script>
//? importing compoenents
import SmallNavComponentVue from "@/components/global/nav/SmallNavComponent.vue";
import SidBarComponentVue from "@/components/global/SidBarComponent.vue";
import LoadingComponentVue from "@/components/global/LoadingComponent.vue";
import ErrorComponentVue from "@/components/global/ErrorComponent.vue";
import ScrollTopComponentVue from "@/components/global/ScrollTopComponent.vue";
import FooterComponentVue from "@/components/global/FooterComponent.vue";
import axios from "axios";

export default {
  name: "food-page",
  data() {
    return {
      scroll_page: 0,
    };
  },
  components: {
    SmallNavComponentVue,
    SidBarComponentVue,
    LoadingComponentVue,
    ErrorComponentVue,
    ScrollTopComponentVue,
    FooterComponentVue,
  },
  mounted() {
    setTimeout(() => {
      // to start the loading animation
      this.$store.state.loading = "open";
    }, 100);

    // call the get food method
    this.GetFood();

    // call the handleScroll method on scrol window
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    async GetFood() {
      await axios
        .get(this.$store.state.APIs.food.get_one, {
          params: {
            food_id: this.$route.params.id,
          },
        })
        .then((response) => {
          // set the food data from response to food var in store
          this.$store.state.food = response.data.food_data;

          // stop the loading animation
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

    // scroll method
    async handleScroll() {
      this.scroll_page = window.scrollY;
    },
  },
};
</script>
