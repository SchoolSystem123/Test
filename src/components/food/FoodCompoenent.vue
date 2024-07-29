<template>
  <div
    :class="`food-compoenent-${this.$store.state.mood}-${this.$store.state.language}-${this.view_style}`"
    @click="this.GetFood(this.food_data._id)"
  >
    <!-- cover  -->
    <img
      v-if="this.food_data.images"
      :src="this.food_data.images[0]"
      alt="cover"
    />
    <!-- cover  -->

    <div class="info">
      <!-- title  -->
      <h4>{{ this.food_data.title }}</h4>
      <!-- title  -->

      <!-- description  -->
      <p v-if="this.food_data.created_at">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.food_compoenet.created_at
            : this.$store.state.Arabic.food_compoenet.created_at
        }}
        {{ this.food_data.created_at.split("T")[0] }}
      </p>
      <!-- description  -->

      <!-- number of images  -->
      <p v-if="this.food_data.images">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.food_compoenet.images
            : this.$store.state.Arabic.food_compoenet.images
        }}
        {{ this.food_data.images.length }}
      </p>
      <!-- number of images  -->
    </div>
  </div>
</template>

<script>
export default {
  name: "food-compoenet",
  data() {
    return {};
  },
  props: {
    food_data: Object,
    view_style: String,
  },
  components: {},
  mounted() {},
  methods: {
    // get to food page on click method
    GetFood(id) {
      window.location = `/food/${id}`;
    },
  },
};
</script>
