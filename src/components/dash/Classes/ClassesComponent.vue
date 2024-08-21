<template>
  <div
    :class="`section-cont-${this.status}-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <div class="header">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.dash_classes_component.title
          : this.$store.state.Arabic.dash_classes_component.title
      }}
    </div>

    <div class="cards-section">
      <ClassesPageClassComponentDash
        v-for="(class_data, index) in this.$store.state.classes"
        :key="index"
        :class_data="class_data"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ClassesPageClassComponentDash from "../../class/ClassesPageClassComponentDash.vue";
export default {
  name: "classes-component",
  data() {
    return {
      // limit of classes's documents
      limit: 10,
      // page of classes's documents
      page: 1,
      // status var to open th page smoothe
      status: "close",
    };
  },
  mounted() {
    // call to get classes method
    this.GetClasses();
  },
  components: {
    ClassesPageClassComponentDash,
  },
  methods: {
    // get classes
    async GetClasses() {
      // to start the loading
      this.$store.state.loading = "open";

      await axios
        .get(this.$store.state.APIs.classes.get_all, {
          params: {
            limit: this.limit,
            page: this.page,
          },
        })
        .then((Response) => {
          // to stop the loading
          this.$store.state.loading = "close";

          // update the status var
          this.status = "open";

          // set the classes data from response to classes array in store
          this.$store.state.classes = Response.data.classes_data;
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
  },
};
</script>
