<template>
  <span
    v-if="
      this.$store.state.user.user_type == 'admin' ||
      this.$store.state.home_work &&
      this.$store.state.home_work.created_by._id ==
      this.$store.state.user.user._id
    "
    :class="
      this.$store.state.home_work ? `del-hw-${this.$store.state.theme}-${this.$store.state.language}` : 'close'
    "
    @click="this.$store.commit('OpenOrCloseDeleteHW')"
  >
    <icon icon="trash" @click="deleteHW"/>
  </span>
</template>

<script>
import axios from 'axios';

export default {
  name: "delete-HW-shurtCut-btn",
  data() {
    return {
      api : "",
      editor : ""
    }
  },
  mounted() {
    if (this.$store.state.user.user_type == "super") {
      this.api = this.$store.state.APIs.home_works.super.delete;
      this.editor = "super_admin_id";
    } else if (this.$store.state.user.user_type == "admin") {
      this.api = this.$store.state.APIs.home_works.admin.delete
      this.editor = "admin_id";
    } else if (this.$store.state.user.user_type == "teacher") {
      this.api = this.$store.state.APIs.home_works.teacher.delete
      this.editor = "teacher_id";
    }
  },
  props: {
    home_work_id: String,
  },
  methods : {
    deleteHW () {
console.log(body)
console.log(headers)
console.log(this.api)
        // create headers
        const headers = {
          Authorization : `Bearer ${this.$store.user.token}`
        }

        // body 
        const body = {
          editor : this.$store.state.user.user._id ,
          home_work_id : this.$store.state.home_work._id
        }



      try {
        axios.delete(this.api , body , headers)
        .then((response) => {
          console.log(response)
        }).catch ((error) => {
          console.log(error)
        }) 

      } catch (error) {
        console.log(error)
      }
    },
  }
};
</script>
