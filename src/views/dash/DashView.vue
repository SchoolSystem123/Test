<template>
  <div :class="`dash-${this.$store.state.mood}-${this.$store.state.language}`">
    <!-- loading component  -->
    <LoadingComponentVue />
    <!-- loading component  -->

    <!-- loading component  -->
    <ErrorComponentVue />
    <!-- loading component  -->

    <!-- sidbar component  -->
    <SidBarComponentVue />
    <!-- sidbar component  -->

    <div :class="`sid-bar-${this.status}`">
      <icon :icon="this.icon_type" @click="OpenOrCloseSidBar" />
      <ul>
        <li><router-link to="/"> home </router-link></li>
        <li @click="ChangeComponent('admins')">Admins 🦸‍♂️</li>
        <li @click="ChangeComponent('teachers')">Teachers 👨‍🏫</li>
        <li @click="ChangeComponent('students')">Students 👨‍🎓</li>
        <li @click="ChangeComponent('parents')">Parents 👨‍👩‍👦‍👦</li>
        <li @click="ChangeComponent('classes')">Classes 🏫</li>
        <li @click="ChangeComponent('home-works')">Home Works ➕</li>
        <li @click="ChangeComponent('messages')">Messages 💬</li>

        <li
          @click="ChangeComponent('create-admin')"
          v-if="this.$store.state.user.user_type == 'super'"
        >
          Create Admin
        </li>

        <li
          @click="ChangeComponent('create-teacher')"
          v-if="
            this.$store.state.user.user_type == 'super' ||
            this.$store.state.user.user_type == 'admin'
          "
        >
          Create Teacher 👨‍🏫➕
        </li>

        <li
          @click="ChangeComponent('create-student')"
          v-if="
            this.$store.state.user.user_type == 'super' ||
            this.$store.state.user.user_type == 'admin'
          "
        >
          Create Student 👨‍🎓➕
        </li>

        <li
          @click="ChangeComponent('create-parent')"
          v-if="
            this.$store.state.user.user_type == 'super' ||
            this.$store.state.user.user_type == 'admin'
          "
        >
          Create Parent 👨‍👩‍👦‍👦➕
        </li>

        <li
          @click="ChangeComponent('create-class')"
          v-if="
            this.$store.state.user.user_type == 'super' ||
            this.$store.state.user.user_type == 'admin' ||
            this.$store.state.user.user_type == 'teacher'
          "
        >
          Create Class 🏫➕
        </li>

        <li
          @click="ChangeComponent('create-message')"
          v-if="
            this.$store.state.user.user_type == 'super' ||
            this.$store.state.user.user_type == 'admin'
          "
        >
          Create Message 💬➕
        </li>
      </ul>
    </div>

    <div :class="`section-${this.status}`">
      <!-- admins component -->
      <AdminsComponentVue
        v-if="this.$store.state.active_component_in_dash == 'admins'"
      />
      <!-- admins component -->

      <!-- teachers component -->
      <TeachersComponentVue
        v-if="this.$store.state.active_component_in_dash == 'teachers'"
      />
      <!-- teachers component -->

      <!-- students component -->
      <StudentsComponentVue
        v-if="this.$store.state.active_component_in_dash == 'students'"
      />
      <!-- students component -->

      <!-- parents component -->
      <ParentsComponentVue
        v-if="this.$store.state.active_component_in_dash == 'parents'"
      />
      <!-- parents component -->

      <!-- classes component -->
      <ClassesComponentVue
        v-if="this.$store.state.active_component_in_dash == 'classes'"
      />
      <!-- classes component -->

      <!-- Home Works component -->
      <HomeWorksComponentVue
        v-if="this.$store.state.active_component_in_dash == 'home-works'"
      />
      <!-- Home Works component -->

      <!-- Messages component -->
      <MessagesComponentVue
        v-if="this.$store.state.active_component_in_dash == 'messages'"
      />
      <!-- Messages component -->

      <!-- CreateAdmin component -->
      <CreateAdminComponentVue
        v-if="this.$store.state.active_component_in_dash == 'create-admin'"
      />
      <!-- CreateAdmin component -->

      <!-- UpdateAdmin component -->
      <UpdateAdminComponentVue
        v-if="this.$store.state.active_component_in_dash == 'update-admin'"
      />
      <!-- UpdateAdmin component -->

      <!-- delete admin component -->
      <VerifyDeleteAdminComponentVue />
      <!-- delete admin component -->

      <!-- create teacher component -->
      <CreateTeacherComponentVue
        v-if="this.$store.state.active_component_in_dash == 'create-teacher'"
      />
      <!-- create teacher component -->

      <!-- Update Teacher component -->
      <UpdateTeacherComponentVue
        v-if="this.$store.state.active_component_in_dash == 'update-teacher'"
      />
      <!-- Update Teacher component -->

      <!-- create student component -->
      <CreateStudentComponent
        v-if="this.$store.state.active_component_in_dash == 'create-student'"
      />
      <!-- create student component -->

      <!-- verify delete admin component -->
      <VerifyDeleteTeacherComponentVue />
      <!-- verify delete admin component -->

      <!-- verify delete student component -->
      <VerifyDeleteStudentComponent />
      <!-- verify delete student component -->

      <!-- update student component -->
      <UpdateStudentComponent
        v-if="this.$store.state.active_component_in_dash == 'update-student'"
      />
      <!-- update student component -->

      <!-- create parent component -->
      <CreateParentComponent
        v-if="this.$store.state.active_component_in_dash == 'create-parent'"
      />
      <!-- create parent component -->

      <!-- verify delete student component -->
      <VerifyDeleteParentComponent />
      <!-- verify delete student component -->

      <!-- update parent component -->
      <UpdateParentsComponent
        v-if="this.$store.state.active_component_in_dash == 'update-parent'"
      />
      <!-- update parent component -->

      <!-- choose child for parent component -->
      <ChooseChildrenComponent />
      <!-- choose child for parent component -->

      <!-- verify delete class component -->
      <VerifyDeleteClassComponent />
      <!-- verify delete class component -->

      <!-- update class component -->
      <UpdateClassComponent
        v-if="this.$store.state.active_component_in_dash == 'update-class'"
      />
      <!-- update class component -->

      <!-- choose teacher for parent component -->
      <ChooseTeacherComponent />
      <!-- choose teacher for parent component -->

      <!-- update class cover component -->
      <CoverFormComponent />
      <!-- update class cover component -->

      <!-- create class component -->
      <CreateClassComponent
        v-if="this.$store.state.active_component_in_dash == 'create-class'"
      />
      <!-- create class component -->

      <!-- create message component -->
      <CreateMessagesComponent
        v-if="this.$store.state.active_component_in_dash == 'create-message'"
      />
      <!-- create message component -->

      <!-- delete message component -->
      <VerifyDeleteMessageComponent />
      <!-- delete message component -->

      <!-- update message component -->
      <UpdateMessagesComponent
        v-if="this.$store.state.active_component_in_dash == 'update-message'"
      />
      <!-- update message component -->

      <!-- delete home work form component -->
      <VerifyDeleteHomeWorkComponent />
      <!-- delete home work form component -->

      <!-- update home work component -->
      <UpdateHomeWorkComponent
        v-if="this.$store.state.active_component_in_dash == 'update-home-work'"
      />
      <!-- update home work component -->
    </div>
  </div>
</template>

<script>
//? importing the components
import LoadingComponentVue from "@/components/global/LoadingComponent.vue";
import ErrorComponentVue from "@/components/global/ErrorComponent.vue";
import AdminsComponentVue from "@/components/dash/admins/AdminsComponent.vue";
import TeachersComponentVue from "@/components/dash/Teachers/TeachersComponent.vue";
import StudentsComponentVue from "@/components/dash/Students/StudentsComponent.vue";
import ParentsComponentVue from "@/components/dash/Parents/ParentsComponent.vue";
import ClassesComponentVue from "@/components/dash/Classes/ClassesComponent.vue";
import HomeWorksComponentVue from "@/components/dash/Home Works/HomeWorksComponent.vue";
import MessagesComponentVue from "@/components/dash/Messages/MessagesComponent.vue";
import CreateAdminComponentVue from "@/components/dash/admins/CreateAdminComponent.vue";
import VerifyDeleteAdminComponentVue from "@/components/global/forms/dash/VerifyDeleteAdminComponent.vue";
import SidBarComponentVue from "@/components/global/SidBarComponent.vue";
import UpdateAdminComponentVue from "@/components/dash/admins/UpdateAdminComponent.vue";
import CreateTeacherComponentVue from "@/components/dash/Teachers/CreateTeacherComponent.vue";
import UpdateTeacherComponentVue from "@/components/dash/Teachers/UpdateTeacherComponent.vue";
import VerifyDeleteTeacherComponentVue from "@/components/global/forms/dash/teacher/VerifyDeleteTeacherComponent.vue";
import CreateStudentComponent from "@/components/dash/Students/CreateStudentComponent.vue";
import UpdateStudentComponent from "@/components/dash/Students/UpdateStudentComponent.vue";
import VerifyDeleteStudentComponent from "@/components/global/forms/dash/student/VerifyDeleteStudentComponent.vue";
import VerifyDeleteParentComponent from "@/components/global/forms/dash/parent/VerifyDeleteParentComponent.vue";
import CreateParentComponent from "@/components/dash/Parents/CreateParentComponent.vue";
import UpdateParentsComponent from "@/components/dash/Parents/UpdateParentsComponent.vue";
import ChooseChildrenComponent from "@/components/global/forms/dash/parent/ChooseChildrenComponent.vue";
import VerifyDeleteClassComponent from "@/components/global/forms/dash/class/VerifyDeleteClassComponent.vue";
import UpdateClassComponent from "@/components/dash/Classes/UpdateClassComponent.vue";
import ChooseTeacherComponent from "@/components/global/forms/dash/class/ChooseTeacherComponent.vue";
import CoverFormComponent from "@/components/global/forms/dash/class/CoverFormComponent.vue";
import CreateClassComponent from "@/components/dash/Classes/CreateClassComponent.vue";
import CreateMessagesComponent from "@/components/dash/Messages/CreateMessagesComponent.vue";
import VerifyDeleteMessageComponent from "@/components/global/forms/dash/message/VerifyDeleteMessageComponent.vue";
import UpdateMessagesComponent from "@/components/dash/Messages/UpdateMessagesComponent.vue";
import VerifyDeleteHomeWorkComponent from "@/components/global/forms/dash/HomeWork/VerifyDeleteHomeWorkComponent.vue";
import UpdateHomeWorkComponent from "@/components/dash/Home Works/UpdateHomeWorkComponent.vue";

export default {
  data() {
    return {
      // icon type
      icon_type: "arrow-right",
      // sid bar status
      status: "close",
    };
  },
  mounted() {
    window.addEventListener("load", () => {
      if (
        !this.$store.state.user.user ||
        (!this.$store.state.user.user_type == "admin" &&
          !this.$store.state.user.user_type == "super" &&
          !this.$store.state.user.user_type == "teacher")
      ) {
        window.location = "/login";
      }
    });
  },
  components: {
    SidBarComponentVue,
    LoadingComponentVue,
    ErrorComponentVue,
    AdminsComponentVue,
    TeachersComponentVue,
    StudentsComponentVue,
    ParentsComponentVue,
    ClassesComponentVue,
    HomeWorksComponentVue,
    MessagesComponentVue,
    CreateAdminComponentVue,
    VerifyDeleteAdminComponentVue,
    UpdateAdminComponentVue,
    UpdateTeacherComponentVue,
    VerifyDeleteTeacherComponentVue,
    CreateTeacherComponentVue,
    CreateStudentComponent,
    UpdateStudentComponent,
    VerifyDeleteStudentComponent,
    VerifyDeleteParentComponent,
    CreateParentComponent,
    UpdateParentsComponent,
    ChooseChildrenComponent,
    VerifyDeleteClassComponent,
    UpdateClassComponent,
    ChooseTeacherComponent,
    CoverFormComponent,
    CreateClassComponent,
    CreateMessagesComponent,
    VerifyDeleteMessageComponent,
    UpdateMessagesComponent,
    VerifyDeleteHomeWorkComponent,
    UpdateHomeWorkComponent,
  },
  methods: {
    // change the component
    ChangeComponent(component) {
      this.$store.state.active_component_in_dash = component;
    },

    // open or close the sidBar
    OpenOrCloseSidBar() {
      // change the isd bar status
      this.status = this.status == "close" ? "open" : "close";
      // to change the icon type
      this.icon_type =
        this.icon_type == "arrow-right" ? "arrow-left" : "arrow-right";
      // to open or close the sid bar
      this.$store.commit("ChangeDashSidBarStatus");
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";
// darck adn light English style
.dash-darck-English {
  width: 100%;
  min-height: 100vh;
  background-color: $body-darck;
  display: flex;
  direction: ltr;

  .sid-bar-open {
    width: 20%;
    height: 96vh;
    margin: 2vh 10px;
    background-color: $card-darck;
    border-radius: 10px;
    position: relative;
    transition-duration: 0.5s;
    // overflow-y:scroll ;

    @media (max-width: $phone) {
      width: 40%;
    }

    svg {
      padding: 10px;
      border-radius: 50%;
      background-color: $message-darck;
      color: $font-light;
      cursor: pointer;
      position: absolute;
      right: -15px;
      top: 20px;
    }

    // home link (svg)
    a {
      text-decoration: none;
      width: 100%;
      height: 100%;
      color: $font-light;
      display: flex;
      justify-content: start;
      align-items: center;
    }

    ul {
      width: 100%;
      height: 100%;
      overflow: hidden;
      overflow-y: scroll;

      li {
        width: 96%;
        height: 40px;
        margin: 10px 2%;
        display: flex;
        justify-content: start;
        align-items: center;
        padding: 0px 10px;
        border-radius: 5px;
        color: $font-light;
        cursor: pointer;
        transition-duration: 0.5s;
        @media (max-width: $phone) {
          font-size: $x-small;
        }
      }

      li:hover {
        background-color: $note-darck;
      }
    }

    ul::-webkit-scrollbar {
      width: 0px;
    }
  }

  .sid-bar-close {
    @extend .sid-bar-open;
    width: 0%;
  }

  .section-open {
    width: 80%;
    height: 100vh;
    transition-duration: 0.5s;
  }

  .section-close {
    width: 100%;
    height: 100vh;
    transition-duration: 0.5s;
  }
}

.dash-light-English {
  width: 100%;
  min-height: 100vh;
  background-color: $body-light;
  display: flex;
  direction: ltr;

  .sid-bar-open {
    width: 20%;
    height: 96vh;
    margin: 2vh 10px;
    background-color: $card-light;
    border-radius: 10px;
    position: relative;
    transition-duration: 0.5s;

    @media (max-width: $phone) {
      width: 40%;
    }

    svg {
      padding: 10px;
      border-radius: 50%;
      background-color: $message-light;
      color: $font-darck;
      cursor: pointer;
      position: absolute;
      right: -15px;
      top: 20px;
    }

    // home link (svg)
    a {
      text-decoration: none;
      width: 100%;
      height: 100%;
      color: $font-darck;
      display: flex;
      justify-content: start;
      align-items: center;
    }

    ul {
      width: 100%;
      height: 100%;
      overflow: hidden;
      overflow-y: scroll;

      li {
        width: 96%;
        height: 40px;
        margin: 10px 2%;
        display: flex;
        justify-content: start;
        align-items: center;
        padding: 0px 10px;
        border-radius: 5px;
        color: $font-darck;
        cursor: pointer;
        transition-duration: 0.5s;

        @media (max-width: $phone) {
          font-size: $x-small;
        }
      }

      li:hover {
        background-color: $note-light;
      }
    }

    ul::-webkit-scrollbar {
      width: 0px;
    }
  }

  .sid-bar-close {
    @extend .sid-bar-open;
    width: 0%;
  }

  .section-open {
    width: 80%;
    height: 100vh;
    transition-duration: 0.5s;
  }

  .section-close {
    width: 100%;
    height: 100vh;
    transition-duration: 0.5s;
  }
}
// darck adn light English style

// darck adn light Arabic style
.dash-darck-Arabic {
  @extend .dash-darck-English;
}

.dash-light-Arabic {
  @extend .dash-light-English;
}
// darck adn light Arabic style

// @import "../../component/global/forms/dash/class/coverForm";
// @import "../../component/dash/admins/admins";
// @import "../../component/dash/admins/adminInDash";
// @import "../../component/dash/admins/createAdmin";
// @import "../../component/global/forms/dash/verifyDeleteUser";
// @import "../../component/dash/admins/updateAdmin";
// @import "../../component/dash/classes/updateClass";
// @import "../../component/dash/classes/createClass";

// @import "../../component/dash/teachers/createTeacher";
// @import "../../component/dash/teachers/teacherInDash";
// @import "../../component/dash/teachers/updateTeacher";

// @import "../../component/dash/students/createStudent";
// @import "../../component/dash/students/studentInDash";
// @import "../../component/dash/students/updateStudent";

// @import "../../component/dash/parents/createParents";
// @import "../../component/dash/parents/parentInDash";
// @import "../../component/dash/parents/updateParent";

// @import "../../component/dash/classes/classInDash";
// @import "../../component/dash/classes/classes";

// @import "../../component/dash/messages/messages" ;
// @import "../../component/dash/messages/message" ;
// @import "../../component/dash/messages/createMessage" ;
// @import "../../component/dash/messages/updateMessage" ;
// @import "../../component/dash/parents/parentInDash";
// @import "../../component/dash/parents/updateParent";

// @import "../../component/global/forms/dash/parents/chooseChildren";
// @import "../../component/global/forms/dash/class/chooseTeacher";
</style>
