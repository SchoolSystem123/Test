<template>
  <div
    :class="`search-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <p>
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.admins_page.search_admin_name
          : this.$store.state.Arabic.admins_page.search_admin_name
      }}
    </p>
    <div class="cont">
      <input
        type="text"
        v-model="this.name"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.admins_page.placeholder
            : this.$store.state.Arabic.admins_page.placeholder
        "
      />
      <icon icon="search" @click="getAdminsByName" />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "search-component",
  data() {
    return {
      // class title
      name: "",
      // classes limit
      limit: 500,
    };
  },
  methods: {
    async getAdminsByName() {
      // to start loading animation
      this.$store.state.loading = "open";

      axios
        .get(this.$store.state.APIs.admins.get_all, {
          params: {
            name: this.name,
          },
        })
        .then((response) => {
          // check if the response has any admin
          if (response.data.admins_data.length > 0) {
            // set the admins data from response to admins array in store
            this.$store.state.admins = response.data.admins_data;
          } else {
            // open the error message form
            this.$store.state.error_form_status = "open";

            // set the error message to error message var ni store
            this.$store.state.error_message = {
              english: "Sorry, no admin with this name was found",
              arabic: "عذرا لا يوجد مدير بهذا الاسم",
            };
          }

          // to stop the loading animation
          this.$store.state.loading = "close";
        })
        .catch((error) => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // to set the reqeust's error message to error message var in store
          this.$store.state.error_message = error.response.data.message;

          // to open the error form
          this.$store.state.error_form_status = "open";
        });
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";

// darck english style
.search-darck-English {
  width: 90%;
  height: 40px;
  margin: 5% 10% 15% 5%;
  direction: ltr;

  // search by title section
  p {
    width: 100%;
    color: $font-light;
  }

  .cont {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    background-color: $message-darck;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 5% 10% 5% 0%;

    input {
      width: 80%;
      height: 100%;
      background-color: $message-darck;
      border: none;
      outline: none;
      color: $font-light;
    }

    svg {
      color: $font-light;
      cursor: pointer;
    }
  }
}
// darck english style

// light english style
.search-light-English {
  @extend .search-darck-English;
  width: 90%;
  height: 40px;
  margin: 5% 10% 5% 5%;

  p {
    color: $font-darck;
  }

  .cont {
    margin: 5% 10% 10% 0%;
    background-color: $message-light;
    input {
      background-color: $message-light;
      color: $font-darck;
    }

    svg {
      color: $font-darck;
    }
  }
}
// light english style

// darck english style
.search-darck-Arabic {
  @extend .search-darck-English;
  width: 90%;
  height: 40px;
  margin: 5% 10% 15% 5%;
  direction: rtl;

  p {
    margin-right: -5%;
  }

  .cont {
    margin: 5% -5% 5% 10%;
  }
}
// darck english style

// light english style
.search-light-Arabic {
  @extend .search-darck-Arabic;
  width: 90%;
  height: 40px;
  margin: 5% 10% 5% 5%;

  // search section title
  p {
    color: $font-darck;
  }

  .cont {
    background-color: $message-light;
    input {
      background-color: $message-light;
      color: $font-darck;
    }

    svg {
      color: $font-darck;
    }
  }
}
// light english style
</style>
