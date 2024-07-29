<template>
  <div
    :class="`message-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <!-- message title  -->
    <h3>{{ this.Message_data.title }}</h3>
    <!-- message title  -->

    <!-- message description  -->
    <div class="description">
      <u>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.messgae_component.description
            : this.$store.state.Arabic.messgae_component.description
        }}
      </u>
      {{ this.Message_data.description }}
    </div>
    <!-- message description  -->

    <!-- note component  -->
    <NoteComponentVue
      v-if="this.Message_data.note"
      :note="this.Message_data.note"
    />
    <!-- note component  -->

    <div class="notes">
      <!--  recipient  -->
      <p>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.messgae_component.recipient
            : this.$store.state.Arabic.messgae_component.recipient
        }}
        {{ this.Message_data.recipient }}
      </p>
      <!--  recipient  -->

      <!--  craeted at  -->
      <p v-if="this.Message_data.created_at">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.messgae_component.created_at
            : this.$store.state.Arabic.messgae_component.created_at
        }}
        {{ this.Message_data.created_at.split("T")[0] }}
      </p>
      <!--  craeted at  -->

      <!--  craeted by  -->
      <p @click="GetAuthor(this.Message_data.created_by._id)">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.messgae_component.created_by
            : this.$store.state.Arabic.messgae_component.created_by
        }}
        <img
          :src="this.Message_data.created_by.avatar"
          alt="avatar"
          class="author"
        />
        {{ this.Message_data.created_by.name }}
      </p>
      <!--  craeted by  -->
    </div>

    <!--  level  -->
    <div :class="`level-${this.Message_data.level}`"></div>
    <!--  level  -->
  </div>
</template>

<script>
//? importing compoenets
import NoteComponentVue from "./global/NoteComponent.vue";

export default {
  name: "message-component",
  data() {
    return {};
  },
  props: {
    Message_data: Object,
  },
  components: {
    NoteComponentVue,
  },
  methods: {
    // go to message author method
    GetAuthor(id) {
      window.location = `/admin/${id}`;
    },
  },
};
</script>
