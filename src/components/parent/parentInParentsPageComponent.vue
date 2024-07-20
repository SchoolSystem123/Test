<template>
  <div
    :class="`parents-parent-${this.$store.state.mood}-${this.$store.state.language}-${this.view_style}`"
    @click="getToaAmin(this.parent_data._id)"
  >
    <!-- admin avatar  -->
    <img :src="this.parent_data.avatar" alt="avatar" />
    <!-- admin avatar  -->

    <div class="info">
      <!-- admin name  -->
      <h3>{{ this.parent_data.name }}</h3>
      <!-- admin name  -->

      <!-- parent gender  -->
      <p>
        ⚧️ : {{ this.parent_data.gender }}
        {{ this.parent_data.gender == "male" ? "🚹" : "🚺" }}
      </p>
      <!-- parent gender  -->

      <!-- parent's children  -->
      <p>
        👶🧒👱‍♂️ : {{ this.parent_data.children.length }}
      </p>
      <!-- parent's children  -->

      <p v-if="this.parent_data.created_at">📆 : {{ this.parent_data.created_at.split("T")[0] }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "parent-in-parents-apge-component",
  data() {
    return {};
  },
  props: {
    parent_data: Object,
    view_style: String,
  },
  components: {},
  methods: {
    getToaAmin(id) {
      window.location = `/parent/${id}`;
    },
  },
};
</script>
