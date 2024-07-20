<template>
  <div :id="`note-${this.$store.state.language}-cont`">
    <icon icon="question" @click="ChangeStatus"/>
    <span :id="`${this.status}`">📝 : {{ this.note }}</span>
  </div>
</template>

<script>
export default {
  props : {
    note : String
  },
  data () {
    return {
      status : "close"
    }
  },
  methods : {
    ChangeStatus () {
      console.log(this.status)
      this.status = this.status == "close" ? "open" : "close"
    }
  },
}
</script>
