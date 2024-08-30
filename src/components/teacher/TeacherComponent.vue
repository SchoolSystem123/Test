<template>
  <div
    :class="`teachers-home-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <img :src="this.teacher_data.avatar" alt="" />

    <div class="info">
      <h3>{{ this.teacher_data.name }}</h3>
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

// darck and light English style
.teachers-home-darck-English {
  width: 100%;
  height: 100px;
  cursor: pointer;
  display: flex;
  justify-content: start;
  align-items: center;
  position: relative;
  margin: 1%;
  background-color: $card-darck;
  border-radius: 10px;

  @media (max-width: $phone) {
    width: 100%;
  }

  img {
    width: 100px;
    height: 100px;
    border-radius: 10px;
    margin: 5px;

    @media (max-width: $phone) {
      width: 90px;
      height: 90px;
    }
  }

  .info {
    width: 90%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    margin-left: 20px;

    h3 {
      width: 100%;
      color: $font-light;
      margin: 5px 0px;
    }

    p {
      color: $font-light;
      font-size: $xx-small;
      padding: 3px;
      border-radius: 3px;
      margin: 3px;
      background-color: $note-darck;
    }
  }
}

.teachers-home-light-English {
  @extend .teachers-home-darck-English;
  background-color: $card-light;

  .info {
    width: 90%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    margin-left: 20px;

    h3 {
      width: 100%;
      color: $font-darck;
      margin: 5px 0px;
    }

    p {
      color: $font-darck;
      font-size: $xx-small;
      padding: 3px;
      border-radius: 3px;
      margin: 3px;
      background-color: $note-light;
    }
  }
}
// darck and light English style

// darck and light Arabic style
.teachers-home-darck-Arabic {
  @extend .teachers-home-darck-English;
  direction: rtl;
}

.teachers-home-light-Arabic {
  @extend .teachers-home-light-English;
  direction: rtl;
}
// darck and light Arabic style
</style>
