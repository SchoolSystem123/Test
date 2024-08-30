<template>
  <div
    :class="`admins-home-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <img :src="this.admin_data.avatar" alt="" />

    <div class="info">
      <h3>{{ this.admin_data.name }}</h3>
      <!-- gender  -->
      <p>
        ⚧️ : {{ this.admin_data.gender }}
        {{ this.admin_data.gender == "male" ? "🚹" : "🚺" }}
      </p>
      <!-- gender  -->
    </div>
  </div>
</template>

<script>
export default {
  name: "teacher-component",
  props: {
    admin_data: Object,
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";

// darck and light English style
.admins-home-darck-English {
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

.admins-home-light-English {
  @extend .admins-home-darck-English;
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
.admins-home-darck-Arabic {
  @extend .admins-home-darck-English;
  direction: rtl;
}

.admins-home-light-Arabic {
  @extend .admins-home-light-English;
  direction: rtl;
}
// darck and light Arabic style
</style>
