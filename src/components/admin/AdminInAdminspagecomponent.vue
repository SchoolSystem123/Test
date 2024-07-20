<template>
  <div
    :class="`admins-admin-${this.$store.state.mood}-${this.$store.state.language}-${this.view_style}`"
    @click="getToaAmin(this.admin_data._id)"
  >
    <!-- admin avatar  -->
    <img :src="this.admin_data.avatar" alt="" />
    <!-- admin avatar  -->

    <div class="info">
      <!-- admin name  -->
      <h3>{{ this.admin_data.name }}</h3>
      <!-- admin name  -->
      <!-- admin level  -->
      <p
        v-if="this.admin_data.is_admin == true"
        :class="this.admin_data.is_admin == true ? 'admin' : null"
      >
        🦸‍♂️ : Admin
      </p>
      <!-- admin level  -->
      <!-- admin level  -->
      <p
        v-if="this.admin_data.is_supper_admin == true"
        :class="this.admin_data.is_supper_admin == true ? 'super-admin' : null"
      >
        ⚡🦸‍♂️ : Super admin
      </p>
      <!-- admin level  -->
      <!-- admin gender  -->
      <p>
        ⚧️ : {{ this.admin_data.gender }}
        {{ this.admin_data.gender == "male" ? "🚹" : "🚺" }}
      </p>
      <!-- admin gender  -->
      <!-- admin joind at  -->
      <p>📆 : {{ this.admin_data.joind_at.split("T")[0] }}</p>
      <!-- admin joind at  -->
    </div>
  </div>
</template>

<script>
export default {
  name: "admin-in-admins-apge-component",
  data() {
    return {};
  },
  props: {
    admin_data: Object,
    view_style: String,
  },
  components: {},
  methods: {
    getToaAmin(id) {
      window.location = `/admin/${id}`;
    },
  },
};
</script>
