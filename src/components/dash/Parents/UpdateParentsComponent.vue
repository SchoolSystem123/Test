<template>
  <div
    :class="`up-parent-${this.status}-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <AvatarFormComponentVue />
    <div class="header">
      <h3>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.update_parent.title
            : this.$store.state.Arabic.update_parent.title
        }}
      </h3>
    </div>

    <div class="form">
      <!-- avatar container  -->
      <div
        :class="`avatar-cont-${this.$store.state.theme}`"
        @click="this.$store.commit('Change_avatar_form_status')"
      >
        <img
          :src="
            this.$store.state.selectd_images.length > 0
              ? this.readerFile()
              : this.avatar
          "
          alt=""
        />
      </div>
      <!-- avatar container  -->

      <!-- name  -->
      <label for="name">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.update_parent.name
          : this.$store.state.Arabic.update_parent.name
      }}</label>

      <input type="text" placeholder="name" v-model="this.name" id="name" />
      <!-- name  -->

      <!-- password  -->
      <label for="password">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.update_parent.password
          : this.$store.state.Arabic.update_parent.password
      }}</label>

      <div class="password">
        <input
          :type="this.password_type"
          :placeholder="
            this.$store.state.language == 'English'
              ? this.$store.state.English.update_parent.password_placeholder
              : this.$store.state.Arabic.update_parent.password_placeholder
          "
          v-model="this.password"
          id="password"
        />
        <icon icon="eye" @click="ChangeInputType" />
      </div>
      <!-- password  -->

      <!-- Phone Number  -->
      <label for="phone">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.update_parent.phone_number
            : this.$store.state.Arabic.update_parent.phone_number
        }}
      </label>

      <input
        type="text"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.update_parent.phone_placeholder
            : this.$store.state.Arabic.update_parent.phone_placeholder
        "
        v-model="this.phone_number"
        id="phone"
      />
      <!-- Phone Number  -->

      <!-- gender  -->
      <label for="gender">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.update_parent.gender
            : this.$store.state.Arabic.update_parent.gender
        }}</label
      >

      <select name="" id="gender" v-model="gender">
        <option value="male">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.update_parent.male
              : this.$store.state.Arabic.create_admin.male
          }}
        </option>
        <option value="female">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.create_admin.female
              : this.$store.state.Arabic.create_admin.female
          }}
        </option>
      </select>
      <!-- gender  -->

      <label for="select-children">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.update_parent.children_title
            : this.$store.state.Arabic.update_parent.children_title
        }}
      </label>

      <div class="children">
        <icon icon="plus" @click="this.$store.commit('ChooseChildren')" />
        <div
          class="students-cont"
          v-if="this.$store.state.choosed_children.length > 0"
        >
          <div
            class="student"
            v-for="(student_data, index) in this.$store.state.choosed_children"
            :key="index"
          >
            <img
              :src="student_data.avatar"
              alt="avatar"
              @click="GetStudent(student_data._id)"
            />
            <div class="info" @click="GetStudent(student_data._id)">
              <h3>{{ student_data.name }}</h3>
            </div>

            <button @click="RemoveChild(student_data._id)">
              {{
                this.$store.state.language == "English"
                  ? this.$store.state.English.update_parent.remove_button
                  : this.$store.state.Arabic.update_parent.remove_button
              }}
            </button>
          </div>
        </div>
      </div>

      <!-- update button  -->
      <button @click="UpdateStudent">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.update_parent.button
            : this.$store.state.Arabic.update_parent.button
        }}
      </button>
      <!-- update button  -->
    </div>
  </div>
</template>

<script>
import AvatarFormComponentVue from "@/components/global/forms/AvatarFormComponent.vue";
import axios from "axios";
export default {
  name: "update-student-component",
  data() {
    return {
      status: "close",
      // name
      name: this.$store.state.parent_for_update
        ? this.$store.state.parent_for_update.name
        : "",
      // password
      password: "",
      // phone number
      phone_number: this.$store.state.parent_for_update
        ? this.$store.state.parent_for_update.phone_number
        : "",
      // gender
      gender: this.$store.state.parent_for_update
        ? this.$store.state.parent_for_update.gender
        : "",
      // delete avatar
      delete_avatar: "",
      // password input type
      password_type: "password",
      // default avatar
      avatar: this.$store.state.parent_for_update.avatar,
      // form data
      formData: "",
    };
  },
  components: {
    AvatarFormComponentVue,
  },
  mounted() {
    setTimeout(() => {
      this.status = "open";
    }, 500);
  },
  methods: {
    // update student method
    async UpdateStudent() {
      this.formData = new FormData();

      // to start the loading animation
      this.$store.state.loading = "open";

      // create header
      const headers = {
        Authorization: `Bearer ${this.$store.state.user.token}`,
      };

      // check who want update the teacher account
      if (this.$store.state.user.user_type == "super") {
        // add the super admin id to form data
        this.formData.append("super_admin_id", this.$store.state.user.user._id);
      } else if (this.$store.state.user.user_type == "admin") {
        // add the admin id to form data
        this.formData.append("admin_id", this.$store.state.user.user._id);
      }

      // add the parent id to formData
      this.formData.append(
        "parent_id",
        this.$store.state.parent_for_update._id
      );

      // add the name to form data
      if (this.name != this.$store.state.parent_for_update.name) {
        this.formData.append("name", this.name);
      }

      // add the phone number to form data
      if (
        this.phone_number != this.$store.state.parent_for_update.phone_number
      ) {
        this.formData.append("phone_number", this.phone_number);
      }

      // add the gender to form data
      if (this.gender != this.$store.state.parent_for_update.gender) {
        this.formData.append("gender", this.gender);
      }

      // add the password to form data
      if (this.password != "") {
        this.formData.append("password", this.password);
      }

      // add the the new avatar to form data
      if (this.$store.state.selectd_images.length > 0) {
        for (const file of this.$store.state.selectd_images) {
          this.formData.append("avatar", file, file.name);
        }
      }

      // add the children array
      this.formData.append(
        "children",
        JSON.stringify(this.$store.state.choosed_children)
      );

      // add the delete avatar filed
      if (
        this.$store.state.delete_avatar == "true" ||
        this.$store.state.selectd_images.length > 0
      ) {
        // add the delete avatar state from store to formData
        this.formData.append("delete_avatar", this.$store.state.delete_avatar);
      }

      await axios
        .put(
          this.$store.state.user.user_type == "super"
            ? this.$store.state.APIs.parents.super.update
            : this.$store.state.APIs.parents.admin.update,
          this.formData,
          {
            headers,
          }
        )
        .then(() => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // to emptying the geted_student array in store
          this.$store.state.geted_student = "";

          // emptying the selecetd images array from store
          this.$store.state.selectd_images = [];

          // emptying the parent for update in store
          this.$store.state.parent_for_update = "";

          // open the parents component
          this.$store.state.active_component_in_dash = "parents";
        })
        .catch((error) => {
          // to emptying the geted_student array in store
          this.$store.state.geted_student = "";

          // to stop the loading animation
          this.$store.state.loading = "close";

          // open the error from
          this.$store.state.error_form_status = "open";

          // set the error message to error message in store
          this.$store.state.error_message = error.response.data.message;
        });
    },

    // change the input type on click the eye icon
    ChangeInputType() {
      this.password_type =
        this.password_type == "password" ? "text" : "password";
    },

    // remove the child
    RemoveChild(id) {
      // find and check to exists studnet in array
      const existingStudent = this.$store.state.choosed_children.find(
        (student) => student._id === id
      );

      if (existingStudent) {
        // Use filter to create a new array without the matching student
        const filteredChildren = this.$store.state.choosed_children.filter(
          (student) => student._id !== existingStudent._id
        );

        // Update the state with the filtered array
        this.$store.state.choosed_children = filteredChildren;
      }
    },

    // reader selecetd image
    readerFile() {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.avatar = e.target.result;
      };

      reader.readAsDataURL(this.$store.state.selectd_images[0]);

      // return the avatar to use the ass a path in avatar image
      return this.avatar;
    },

    // get to student
    GetStudent(id) {
      window.location = `/student/${id}`;
    },
  },
};
</script>

<style lang="scss">
@import "../../../Sass/varibels/variables";

// darck and light English style
.up-parent-open-darck-English {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 5% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;
  direction: ltr;

  // component header style
  .header {
    width: 100%;
    height: auto;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;

    h3 {
      color: $font-light;
    }
  }

  .form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    // blue avatar cont
    .avatar-cont-blue {
      width: 100px;
      height: 100px;
      border-radius: 5px;
      margin: 20px 0px 0px 0px;
      cursor: pointer;
      background: linear-gradient(to top, $first-blue, $second-blue);

      img {
        width: 90%;
        height: 90%;
        margin: 5%;
        border-radius: 5px;
      }
    }

    // orange avatar cont
    .avatar-cont-orange {
      @extend .avatar-cont-blue;
      background: linear-gradient(to top, $first-orange, $second-orange);
    }

    // pink avatar cont
    .avatar-cont-pink {
      @extend .avatar-cont-blue;
      background: linear-gradient(to top, $first-pink, $second-pink);
    }

    // green avatar cont
    .avatar-cont-green {
      @extend .avatar-cont-blue;
      background: linear-gradient(to top, $first-green, $second-green);
    }

    // input's labels
    label {
      width: 100%;
      height: auto;
      padding: 5px 0px;
      margin: 10px 0px;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
      color: $font-light;
    }

    // input style
    input {
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 5px;
      outline: none;
      padding: 0px 10px;
      margin: 10px 0px;
      background-color: $body-light;
    }

    // password's conatiner
    .password {
      width: 100%;
      height: 40px;
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: $body-light;
      padding: 0px 10px;

      input {
        width: 80%;
        height: 100%;
        outline: none;
        border: none;
        padding: 0px;
      }

      svg {
        transition-duration: 0.5s;
        cursor: pointer;
      }

      svg:hover {
        color: $blue;
      }
    }

    // gender and Permissions list style
    select {
      width: 100%;
      height: 40px;
      border: none;
      outline: none;
      border-radius: 5px;
      margin: 10px 0px;
      background-color: $body-light;
      padding: 0px 10px;
    }

    // children conatiner
    .children {
      width: 100%;
      height: 120px;
      overflow-y: scroll;
      margin: 20px 0px;
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      align-items: center;
      padding: 3px;
      border-radius: 5px;
      position: relative;
      background-color: $card-darck;

      // add icon
      svg {
        position: absolute;
        right: 5px;
        top: 5px;
        padding: 5px;
        background-color: $blue;
        color: $font-light;
        cursor: pointer;
        border-radius: 3px;

        @media (max-width: $phone) {
          right: 3px;
          top: 3px;
        }
      }

      .students-cont {
        width: 98%;
        height: auto;
        margin: 1%;
        border-radius: 10px;

        .student {
          width: 100%;
          height: 100px;
          margin: 5px 0px;
          border-radius: 5px;
          background-color: $body-darck;
          display: flex;
          align-items: center;

          img {
            width: 90px;
            height: 90px;
            border-radius: 5px;
            margin: 0px 5px;
          }

          .info {
            width: 75%;
            height: 100%;

            h3 {
              width: 100%;
              color: $font-light;
              margin: 10px 5px;
            }

            @media (max-width: $phone) {
              width: 50%;
            }
          }

          button {
            padding: 7px 15px;
            border: none;
            border-radius: 5px;
            outline: none;
            color: $font-light;
            cursor: pointer;
            background-color: $red;

            @media (max-width: $phone) {
              padding: 5px 10px;
              font-size: $xx-small;
            }
          }
        }
      }
    }

    .children::-webkit-scrollbar {
      width: 0px;
    }

    button {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      outline: none;
      color: $font-light;
      background-color: $green;
      cursor: pointer;
    }
  }
}

.up-parent-open-darck-English::-webkit-scrollbar {
  width: 0px;
}

.up-parent-close-darck-English {
  @extend .up-parent-open-darck-English;
  opacity: 0;
  padding: 30% 5px 5px 5px;
}

.up-parent-open-light-English {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 5% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;
  direction: ltr;

  // component header style
  .header {
    width: 100%;
    height: auto;
    border: 1px solid;
    border-color: transparent transparent $border-darck transparent;

    h3 {
      color: $font-darck;
    }
  }

  .form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    // blue avatar cont
    .avatar-cont-blue {
      width: 100px;
      height: 100px;
      border-radius: 5px;
      margin: 20px 0px 0px 0px;
      cursor: pointer;
      background: linear-gradient(to top, $first-blue, $second-blue);

      img {
        width: 90%;
        height: 90%;
        margin: 5%;
        border-radius: 5px;
      }
    }

    // orange avatar cont
    .avatar-cont-orange {
      @extend .avatar-cont-blue;
      background: linear-gradient(to top, $first-orange, $second-orange);
    }

    // pink avatar cont
    .avatar-cont-pink {
      @extend .avatar-cont-blue;
      background: linear-gradient(to top, $first-pink, $second-pink);
    }

    // green avatar cont
    .avatar-cont-green {
      @extend .avatar-cont-blue;
      background: linear-gradient(to top, $first-green, $second-green);
    }

    // input's labels
    label {
      width: 100%;
      height: auto;
      padding: 5px 0px;
      margin: 10px 0px;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
      color: $font-darck;
    }

    // input style
    input {
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 5px;
      outline: none;
      padding: 0px 10px;
      margin: 10px 0px;
      background-color: $message-light;
    }

    // password's conatiner
    .password {
      width: 100%;
      height: 40px;
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: $message-light;
      padding: 0px 10px;

      input {
        width: 80%;
        height: 100%;
        outline: none;
        border: none;
        padding: 0px;
      }

      svg {
        transition-duration: 0.5s;
        cursor: pointer;
      }

      svg:hover {
        color: $blue;
      }
    }

    // gender and Permissions list style
    select {
      width: 100%;
      height: 40px;
      border: none;
      outline: none;
      border-radius: 5px;
      margin: 10px 0px;
      background-color: $message-light;
      padding: 0px 10px;
    }

    // children conatiner
    .children {
      width: 100%;
      height: 120px;
      overflow-y: scroll;
      margin: 20px 0px;
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      align-items: center;
      padding: 3px;
      border-radius: 5px;
      position: relative;
      background-color: $card-light;

      // add icon
      svg {
        position: absolute;
        right: 5px;
        top: 5px;
        padding: 5px;
        background-color: $blue;
        color: $font-light;
        cursor: pointer;
        border-radius: 3px;

        @media (max-width: $phone) {
          right: 3px;
          top: 3px;
        }
      }

      .students-cont {
        width: 98%;
        height: auto;
        margin: 1%;
        border-radius: 10px;

        .student {
          width: 100%;
          height: 100px;
          margin: 5px 0px;
          border-radius: 5px;
          background-color: $body-light;
          display: flex;
          align-items: center;

          img {
            width: 90px;
            height: 90px;
            border-radius: 5px;
            margin: 0px 5px;
          }

          .info {
            width: 75%;
            height: 100%;

            h3 {
              width: 100%;
              color: $font-darck;
              margin: 10px 5px;
            }

            @media (max-width: $phone) {
              width: 50%;
            }
          }

          button {
            padding: 7px 15px;
            border: none;
            border-radius: 5px;
            outline: none;
            color: $font-light;
            cursor: pointer;
            background-color: $red;

            @media (max-width: $phone) {
              padding: 5px 10px;
              font-size: $xx-small;
            }
          }
        }
      }
    }

    .children::-webkit-scrollbar {
      width: 0px;
    }

    button {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      outline: none;
      color: $font-light;
      background-color: $green;
      cursor: pointer;
    }
  }
}

.up-parent-open-light-English::-webkit-scrollbar {
  width: 0px;
}

.up-parent-close-light-English {
  @extend .up-parent-open-light-English;
  opacity: 0;
  padding: 30% 5px 5px 5px;
}
// darck and light English style

// darck and light Arabic style
.up-parent-open-darck-Arabic {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 5% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;
  direction: rtl;

  // component header style
  .header {
    width: 100%;
    height: auto;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;

    h3 {
      color: $font-light;
    }
  }

  .form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    // blue avatar cont
    .avatar-cont-blue {
      width: 100px;
      height: 100px;
      border-radius: 5px;
      margin: 20px 0px 0px 0px;
      cursor: pointer;
      background: linear-gradient(to top, $first-blue, $second-blue);

      img {
        width: 90%;
        height: 90%;
        margin: 5%;
        border-radius: 5px;
      }
    }

    // orange avatar cont
    .avatar-cont-orange {
      @extend .avatar-cont-blue;
      background: linear-gradient(to top, $first-orange, $second-orange);
    }

    // pink avatar cont
    .avatar-cont-pink {
      @extend .avatar-cont-blue;
      background: linear-gradient(to top, $first-pink, $second-pink);
    }

    // green avatar cont
    .avatar-cont-green {
      @extend .avatar-cont-blue;
      background: linear-gradient(to top, $first-green, $second-green);
    }

    // input's labels
    label {
      width: 100%;
      height: auto;
      padding: 5px 0px;
      margin: 10px 0px;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
      color: $font-light;
    }

    // input style
    input {
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 5px;
      outline: none;
      padding: 0px 10px;
      margin: 10px 0px;
      background-color: $body-light;
    }

    // password's conatiner
    .password {
      width: 100%;
      height: 40px;
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: $body-light;
      padding: 0px 10px;

      input {
        width: 80%;
        height: 100%;
        outline: none;
        border: none;
        padding: 0px;
      }

      svg {
        transition-duration: 0.5s;
        cursor: pointer;
      }

      svg:hover {
        color: $blue;
      }
    }

    // gender and Permissions list style
    select {
      width: 100%;
      height: 40px;
      border: none;
      outline: none;
      border-radius: 5px;
      margin: 10px 0px;
      background-color: $body-light;
      padding: 0px 10px;
    }

    // children conatiner
    .children {
      width: 100%;
      height: 120px;
      overflow-y: scroll;
      margin: 20px 0px;
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      align-items: center;
      padding: 3px;
      border-radius: 5px;
      position: relative;
      background-color: $card-darck;

      // add icon
      svg {
        position: absolute;
        right: 5px;
        top: 5px;
        padding: 5px;
        background-color: $blue;
        color: $font-light;
        cursor: pointer;
        border-radius: 3px;

        @media (max-width: $phone) {
          right: 3px;
          top: 3px;
        }
      }

      .students-cont {
        width: 98%;
        height: auto;
        margin: 1%;
        border-radius: 10px;

        .student {
          width: 100%;
          height: 100px;
          margin: 5px 0px;
          border-radius: 5px;
          background-color: $body-darck;
          display: flex;
          align-items: center;

          img {
            width: 90px;
            height: 90px;
            border-radius: 5px;
            margin: 0px 5px;
          }

          .info {
            width: 75%;
            height: 100%;

            h3 {
              width: 100%;
              color: $font-light;
              margin: 10px 5px;
            }

            @media (max-width: $phone) {
              width: 50%;
            }
          }

          button {
            padding: 7px 15px;
            border: none;
            border-radius: 5px;
            outline: none;
            color: $font-light;
            cursor: pointer;
            background-color: $red;

            @media (max-width: $phone) {
              padding: 5px 10px;
              font-size: $xx-small;
            }
          }
        }
      }
    }

    .children::-webkit-scrollbar {
      width: 0px;
    }

    button {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      outline: none;
      color: $font-light;
      background-color: $green;
      cursor: pointer;
    }
  }
}

.up-parent-open-darck-Arabic::-webkit-scrollbar {
  width: 0px;
}

.up-parent-close-darck-Arabic {
  @extend .up-parent-open-darck-Arabic;
  opacity: 0;
  padding: 30% 5px 5px 5px;
}

.up-parent-open-light-Arabic {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 5% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;
  direction: rtl;

  // component header style
  .header {
    width: 100%;
    height: auto;
    border: 1px solid;
    border-color: transparent transparent $border-darck transparent;

    h3 {
      color: $font-darck;
    }
  }

  .form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    // blue avatar cont
    .avatar-cont-blue {
      width: 100px;
      height: 100px;
      border-radius: 5px;
      margin: 20px 0px 0px 0px;
      cursor: pointer;
      background: linear-gradient(to top, $first-blue, $second-blue);

      img {
        width: 90%;
        height: 90%;
        margin: 5%;
        border-radius: 5px;
      }
    }

    // orange avatar cont
    .avatar-cont-orange {
      @extend .avatar-cont-blue;
      background: linear-gradient(to top, $first-orange, $second-orange);
    }

    // pink avatar cont
    .avatar-cont-pink {
      @extend .avatar-cont-blue;
      background: linear-gradient(to top, $first-pink, $second-pink);
    }

    // green avatar cont
    .avatar-cont-green {
      @extend .avatar-cont-blue;
      background: linear-gradient(to top, $first-green, $second-green);
    }

    // input's labels
    label {
      width: 100%;
      height: auto;
      padding: 5px 0px;
      margin: 10px 0px;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
      color: $font-darck;
    }

    // input style
    input {
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 5px;
      outline: none;
      padding: 0px 10px;
      margin: 10px 0px;
      background-color: $message-light;
    }

    // password's conatiner
    .password {
      width: 100%;
      height: 40px;
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: $message-light;
      padding: 0px 10px;

      input {
        width: 80%;
        height: 100%;
        outline: none;
        border: none;
        padding: 0px;
      }

      svg {
        transition-duration: 0.5s;
        cursor: pointer;
      }

      svg:hover {
        color: $blue;
      }
    }

    // gender and Permissions list style
    select {
      width: 100%;
      height: 40px;
      border: none;
      outline: none;
      border-radius: 5px;
      margin: 10px 0px;
      background-color: $message-light;
      padding: 0px 10px;
    }

    // children conatiner
    .children {
      width: 100%;
      height: 120px;
      overflow-y: scroll;
      margin: 20px 0px;
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      align-items: center;
      padding: 3px;
      border-radius: 5px;
      position: relative;
      background-color: $card-light;

      // add icon
      svg {
        position: absolute;
        right: 5px;
        top: 5px;
        padding: 5px;
        background-color: $blue;
        color: $font-light;
        cursor: pointer;
        border-radius: 3px;

        @media (max-width: $phone) {
          right: 3px;
          top: 3px;
        }
      }

      .students-cont {
        width: 98%;
        height: auto;
        margin: 1%;
        border-radius: 10px;

        .student {
          width: 100%;
          height: 100px;
          margin: 5px 0px;
          border-radius: 5px;
          background-color: $body-light;
          display: flex;
          align-items: center;

          img {
            width: 90px;
            height: 90px;
            border-radius: 5px;
            margin: 0px 5px;
          }

          .info {
            width: 75%;
            height: 100%;

            h3 {
              width: 100%;
              color: $font-darck;
              margin: 10px 5px;
            }

            @media (max-width: $phone) {
              width: 50%;
            }
          }

          button {
            padding: 7px 15px;
            border: none;
            border-radius: 5px;
            outline: none;
            color: $font-light;
            cursor: pointer;
            background-color: $red;

            @media (max-width: $phone) {
              padding: 5px 10px;
              font-size: $xx-small;
            }
          }
        }
      }
    }

    .children::-webkit-scrollbar {
      width: 0px;
    }

    button {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      outline: none;
      color: $font-light;
      background-color: $green;
      cursor: pointer;
    }
  }
}

.up-parent-open-light-Arabic::-webkit-scrollbar {
  width: 0px;
}

.up-parent-close-light-Arabic {
  @extend .up-parent-open-light-Arabic;
  opacity: 0;
  padding: 30% 5px 5px 5px;
}
// darck and light Arabic style
</style>
