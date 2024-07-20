<template>
  <div :class="`info-${this.$store.state.mood}`">
    <icon icon="circle-info" @click="ChangeStatus"/>
    <p :class="`${this.status}`">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo, dolorem iste! Tempora nam quisquam iste, rem consequuntur perspiciatis et assumenda impedit odio laudantium provident consectetur porro sit deserunt enim earum.</p>
  </div>
</template>

<script>
export default {
  name : "info-component",
  data () {
    return {
      status : "close"
    }
  },
  methods : {
    ChangeStatus () {
      this.status = this.status == "close" ? "open" : "close"
    }
  }
}
</script>
