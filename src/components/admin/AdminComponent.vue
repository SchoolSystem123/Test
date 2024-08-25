<template>
  <div
    :class="`admins-${this.$store.state.mood}`"
    :id="this.admin_data.is_supper_admin ? 'super' : 'admin'"
  >
    <img :src="this.admin_data.avatar" alt="" />

    <div class="info">
      <h2>{{ this.admin_data.name }}</h2>
      <p>
        ⚧️ : {{ this.admin_data.gender }}
        {{ this.admin_data.gender == "male" ? "🚹" : "🚺" }}
      </p>
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

.admins-darck {
  width: 100%;
  height: auto;
  cursor: pointer;
  display: flex;
  justify-content: start;
  align-items: center;
  position: relative;
  margin: 1%;
  padding: 10px;
  border-radius: 10px;
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

#super {
  @extend .admins-darck;
  background-color: $message-darck;
}

.admins-light {
  @extend .admins-darck;

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
