<template>
  <div
    :class="`classes-class-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <!-- cover and teacher avatar cont  -->
    <div class="cover-cont">
      <img
        :src="this.class_data.cover"
        alt="cover"
        class="cover"
        @click="GoToClass(this.class_data._id)"
      />

      <img
        :src="this.class_data.teacher != null && this.class_data.teacher.avatar"
        alt="avatar"
        class="avatar"
        @click="GoTeacher(this.class_data.teacher._id)"
      />
    </div>
    <!-- cover and teacher avatar cont  -->

    <!-- info section  -->
    <div class="info">
      <h2>{{ this.class_data.title }}</h2>

      <p>📚📖📑 : {{ this.class_data.subject }}</p>
      <p>🏫🪜🎚️ : {{ this.class_data.class_level }}</p>
      <p v-if="this.class_data.home_works">
        🏚️💯🔝 : {{ this.class_data.home_works.length }}
      </p>
      <p v-if="this.class_data.students">
        👨‍🎓 : {{ this.class_data.students.length }}
      </p>
      <p>📆 : {{ this.class_data.created_at.split("T")[0] }}</p>
    </div>
    <!-- info section  -->

    <!-- buttons cont  -->
    <div class="buttons">
      <button class="update" @click="GoToUpdateClass">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.dash_classes_component.update
            : this.$store.state.Arabic.dash_classes_component.update
        }}
      </button>
      <button class="delete" @click="DeleteClass(class_data._id)">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.dash_classes_component.delete
            : this.$store.state.Arabic.dash_classes_component.delete
        }}
      </button>
      <!-- buttons cont  -->
    </div>
  </div>
</template>

<script>
export default {
  name: "class-component-in-dash",
  props: {
    class_data: Object,
  },
  data() {
    return {};
  },
  methods: {
    // go to class method
    GoToClass(id) {
      window.location = `/class/${id}`;
    },

    // go to teacher method
    GoTeacher(id) {
      window.location = `/teacher/${id}`;
    },

    // delete class method
    DeleteClass(id) {
      // open the delete class form
      this.$store.commit("OpenOrCloseDeleteClassForm");

      // set the class id to delete_class_form_status in store
      this.$store.state.class_id_for_delete = id;
    },

    // go to update class component
    GoToUpdateClass() {
      // set the class data to class_for_update in store
      this.$store.state.class_for_update = this.class_data;

      // update the choosed teacher in store to show it in teachers conatiner in update class componene
      this.$store.state.choosed_teacher = this.class_data.teacher;

      // update the active component to open the update class component
      this.$store.state.active_component_in_dash = "update-class";
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";

// darck English style
.classes-class-darck-English {
  width: 90%;
  height: auto;
  background: $card-darck;
  cursor: pointer;
  margin: 5%;
  border-radius: 10px;
  position: relative;
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
  direction: ltr;

  @media (min-width: $phone) {
    width: 40%;
    height: auto;
  }

  // class's cover and avatar cont style
  .cover-cont {
    width: 98%;
    height: auto;
    margin: 1%;
    position: relative;

    .cover {
      width: 100%;
      max-height: 300px;
      border-radius: 10px;
    }

    .avatar {
      width: 70px;
      height: 70px;
      border-radius: 5px;
      position: absolute;
      left: 10px;
      bottom: 15px;
      z-index: 20;
    }
  }
  // cover and avatar cont style

  // class's title style
  h2 {
    width: 98%;
    height: auto;
    color: $font-light;
    margin: 20px 1% 0% 1%;
  }

  p {
    width: auto;
    height: auto;
    color: $font-light;
    font-size: $x-small;
    margin: 5px 2%;
    padding: 3px;
    border-radius: 3px;
    background-color: $note-darck;
  }
}
// darck English style

// light English style
.classes-class-light-English {
  @extend .classes-class-darck-English;
  background: $card-light;

  // class's title style
  h2 {
    color: $font-darck;
  }

  p {
    color: $font-darck;
    background-color: $note_light;
  }
}
// darck English style

// darck Arabic style
.classes-class-darck-Arabic {
  width: 90%;
  height: auto;
  background: $card-darck;
  cursor: pointer;
  margin: 5%;
  border-radius: 10px;
  position: relative;
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
  direction: rtl;

  @media (min-width: $phone) {
    width: 40%;
    height: auto;
  }

  // class's cover and avatar cont style
  .cover-cont {
    width: 98%;
    height: auto;
    margin: 1%;
    position: relative;

    .cover {
      width: 100%;
      max-height: 300px;
      border-radius: 10px;
    }

    .avatar {
      width: 70px;
      height: 70px;
      border-radius: 5px;
      position: absolute;
      left: 10px;
      bottom: 15px;
      z-index: 20;
    }
  }
  // cover and avatar cont style

  // class's title style
  h2 {
    width: 98%;
    height: auto;
    color: $font-light;
    margin: 20px 1% 0% 1%;
  }

  p {
    width: auto;
    height: auto;
    color: $font-light;
    font-size: $x-small;
    margin: 5px 2%;
    padding: 3px;
    border-radius: 3px;
    background-color: $note-darck;
  }
}
// darck Arabic style

// light Arabic style
.classes-class-light-Arabic {
  @extend .classes-class-darck-Arabic;
  background: $card-light;

  // class's title style
  h2 {
    color: $font-darck;
  }

  p {
    color: $font-darck;
    background-color: $note_light;
  }
}
// darck Arabic style
</style>
