<template>
  <div
    :class="`class-home-${this.$store.state.mood}-${this.$store.state.language}`"
    @click="GetToClass(this.class_data._id)"
  >
    <!-- class cover -->
    <img :src="this.class_data.cover" alt="cover" />
    <!-- <img :src="this.class_data.cover" alt="cover" /> -->
    <!-- class cover -->

    <div class="info">
      <!-- class title  -->
      <h2>
        {{
          this.class_data.title.split("").length > 40
            ? this.class_data.title.slice(0, 40) + "..."
            : this.class_data.title
        }}
        ...
      </h2>

      <!-- students length  -->
      <p v-if="this.class_data.students">
        👨‍🎓 : {{ this.class_data.students.length }}
      </p>

      <!-- home works length  -->
      <p v-if="this.class_data.home_works">
        🏚️💯🔝 : {{ this.class_data.home_works.length }}
      </p>

      <!-- subject name  -->
      <p v-if="this.class_data.subject">
        📚📖📑 : {{ this.class_data.subject }}
      </p>

      <p v-if="this.class_data.class_level">
        🏫🪜🎚️ : {{ this.class_data.class_level }}
      </p>

      <p v-if="this.class_data.created_at">
        📆 : {{ this.class_data.created_at.split("T")[0] }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "class-component",
  props: {
    class_data: Object,
  },
  components: {},
  methods: {
    // get to class method
    GetToClass(id) {
      window.location = `/class/${id}`;
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";

// darck and light English style
.class-home-darck-English {
  width: 100%;
  height: 100%;
  direction: ltr;
  margin: 5px 0px;
  border-radius: 5px;
  padding: 3px;
  background-color: $body-darck;

  img {
    width: 100%;
    max-height: 80%;
    border-radius: 5px;
  }

  .info {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;

    h2 {
      width: 100%;
      height: auto;
      color: $font-light;
    }

    p {
      font-size: $xx-small;
      padding: 3px;
      border-radius: 3px;
      color: $font-light;
      background-color: $note-darck;
      margin: 3px;
    }
  }
}

.class-home-light-English {
  width: 100%;
  height: 100%;
  margin: 5px 0px;
  direction: ltr;
  padding: 3px;
  border-radius: 5px;
  background-color: $body-light;

  img {
    width: 100%;
    max-height: 80%;
    border-radius: 5px;
  }

  .info {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;

    h2 {
      width: 100%;
      height: auto;
      color: $font-darck;
    }

    p {
      font-size: $xx-small;
      padding: 3px;
      border-radius: 3px;
      color: $font-darck;
      background-color: $note-light;
      margin: 3px;
    }
  }
}
// darck and light English style

// darck and light English style
.class-home-darck-Arabic {
  @extend .class-home-darck-English;
  direction: rtl;
}

.class-home-light-Arabic {
  @extend .class-home-light-English;
  direction: rtl;
}
// darck and light English style
</style>
