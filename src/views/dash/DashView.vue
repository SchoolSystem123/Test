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

    <div class="sid-bar">
      <ul>
        <li><router-link to="/"> home </router-link></li>
        <li @click="ChangeComponent('admins')">Admins</li>
        <li @click="ChangeComponent('teachers')">Teachers</li>
        <li @click="ChangeComponent('students')">Students</li>
        <li @click="ChangeComponent('parents')">Parents</li>
        <li @click="ChangeComponent('classes')">Classes</li>
        <li @click="ChangeComponent('homeWorks')">Home Works</li>
        <li @click="ChangeComponent('messages')">Messages</li>

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
          Create Teacher
        </li>
      </ul>
    </div>

    <div class="section">
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
        v-if="this.$store.state.active_component_in_dash == 'homeWorks'"
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

      <!-- verify delete admin component -->
      <VerifyDeleteTeacherComponentVue />
      <!-- verify delete admin component -->

      <!-- verify delete student component -->
      <VerifyDeleteStudentComponent />
      <!-- verify delete student component -->
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
import VerifyDeleteStudentComponent from "@/components/global/forms/dash/student/VerifyDeleteStudentComponent.vue";

export default {
  data() {
    return {};
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
    VerifyDeleteStudentComponent,
  },
  methods: {
    // change the component
    ChangeComponent(component) {
      this.$store.state.active_component_in_dash = component;
    },
  },
};
</script>
