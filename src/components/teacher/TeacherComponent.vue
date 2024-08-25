<template>
  <div :class="`teachers-${this.$store.state.mood}`">
    <img :src="this.teacher_data.avatar" alt="" />

    <div class="info">
      <h2>{{ this.teacher_data.name }}</h2>
      <p>⭐ : {{ this.teacher_data.rate }}</p>
      <p>📚📖📑 : {{ this.teacher_data.subject }}</p>
      <p>🏛️ : {{ this.teacher_data.classes.length }}</p>
      <p>
        ⚧️ : {{ this.teacher_data.gender }}
        {{ this.teacher_data.gender == "male" ? "🚹" : "🚺" }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "teacher-component",
  props: {
    teacher_data: Object,
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";

.teachers-darck {
  width: 100%;
  height: auto;
  cursor: pointer;
  display: flex;
  justify-content: start;
  align-items: center;
  position: relative;
  margin: 1%;
  @media (max-width: $phone) {
    width: 100%;
    height: auto;
  }

  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    @media (max-width: $phone) {
      width: 100px;
      height: 100px;
    }
  }

  .info {
    width: 90%;
    height: auto;
    // background-color: blue;
    margin-left: 20px;

    h2 {
      width: 100%;
      color: $font-light;
      margin: 10px 0px;
    }

    p {
      width: 100%;
      color: $font-light;
      font-size: $x-small;
      // background-color: red;
    }
  }
}

.teachers-light {
  @extend .teachers-darck;

  .info {
    h2 {
      color: $font-darck;
    }

    p {
      color: $font-darck;
    }
  }
}
</style>
