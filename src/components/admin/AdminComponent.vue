<template>
  <div :class="`admins-${this.$store.state.mood}`" :id="this.admin_data.is_supper_admin ? 'super' : 'admin'">
    <img :src="this.admin_data.avatar" alt="">

    <div class="info">
      <h2>{{ this.admin_data.name }}</h2>
      <p>⚧️ : {{ this.admin_data.gender }} {{ this.admin_data.gender == "male" ? '🚹' : '🚺'}}</p>
    </div>
  </div>
</template>


<script>
export default {
  name : "teacher-component",
  props : {
    admin_data : Object
  }
}
</script>
