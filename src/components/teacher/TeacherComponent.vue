<template>
  <div :class="`teachers-${this.$store.state.mood}`">
    <img :src="this.teacher_data.avatar" alt="">

    <div class="info">
      <h2>{{ this.teacher_data.name }}</h2>
      <p>⭐ : {{ this.teacher_data.rate }}</p>
      <p>📚📖📑 : {{ this.teacher_data.subject }}</p>
      <p>🏛️ : {{ this.teacher_data.classes.length }}</p>
      <p>⚧️ : {{ this.teacher_data.gender }} {{ this.teacher_data.gender == "male" ? '🚹' : '🚺' }}</p>
    </div>
  </div>
</template>


<script>
export default {
  name : "teacher-component",
  props : {
    teacher_data : Object
  }
}
</script>
