<template>
  <div :class="`error-form-${this.$store.state.mood}-${this.$store.state.error_form_status}`">
    <div class="header">
      <h2>{{ this.$store.state.language == "English" 
        ? this.$store.state.English.error
        : this.$store.state.Arabic.error }}</h2>
      <icon icon="xmark" @click="this.$store.commit('ChangeErrorFormStatus')"/>
    </div>
    <p v-if="typeof this.$store.state.error_message == 'object'"> ❌ {{ this.$store.state.language == "English"
      ? this.$store.state.error_message.english
      : this.$store.state.error_message.arabic  }} 
      ❌ </p>

      <p v-else>
        {{ this.$store.state.language == "English" 
        ? "Internal Error ..." : "... خطأ عام"}}
      </p>
  </div>
</template>


<script>
export default {
  name : "error-form"
}
</script>
