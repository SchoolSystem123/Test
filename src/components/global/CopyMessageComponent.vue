<template>
  <p :class="`copy-message-${this.$store.state.mood}-${this.$store.state.copy_message_status}`">
    📌 {{ this.$store.state.language == "English" 
    ? this.$store.state.copy_message.english
    : this.$store.state.copy_message.arabic }} 📌
  </p>
</template>

<script>
export default {
  name : "copy_message_component1"
}
</script>
