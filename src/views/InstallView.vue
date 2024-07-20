<template>
  <div
    :class="`install-page-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <!-- small nav component   -->
    <SmallNavComponentVue />
    <!-- small nav component   -->
    <!-- sid bar component   -->
    <SidBarComponentVue />
    <!-- sid bar component   -->
    <!-- loading animation component   -->
    <LoadingComponentVue />
    <!-- loading animation component   -->
    <div :class="this.open_cont == 'open' ? 'cont-open' : 'cont-close'">
      <div class="logo-cont">
        <!-- school logo  -->
        <img src="../assets/logo.png" alt="logo" />
        <h2>School</h2>
        <!-- school logo  -->
      </div>
      <!-- install message  -->
      <p class="message">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.install_page.message
            : this.$store.state.Arabic.install_page.message
        }}
      </p>
      <!-- install message  -->

      <!-- school logo  -->
      <button @click="install">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.install_page.btn_text
            : this.$store.state.Arabic.install_page.btn_text
        }}
      </button>

      <p class="notes">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.install_page.note
            : this.$store.state.Arabic.install_page.note
        }}
        {{ new Date().getFullYear() }}
      </p>
    </div>
  </div>
</template>

<script>
import SmallNavComponentVue from "@/components/global/nav/SmallNavComponent.vue";
import SidBarComponentVue from "@/components/global/SidBarComponent.vue";
import LoadingComponentVue from "@/components/global/LoadingComponent.vue";

export default {
  name: "install-app-page",
  data() {
    return {
      deferredPrompt: null,
      open_cont: "close",
    };
  },
  components: {
    SmallNavComponentVue,
    SidBarComponentVue,
    LoadingComponentVue,
  },
  mounted() {
    // to add smooth animation to page
    setTimeout(async () => {
      this.open_cont = "open";
    }, 500);
  },
  methods: {
    install() {
      window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        this.deferredPrompt = e;
      });

      if (this.deferredPrompt) {
        this.deferredPrompt.prompt();
      } else {
        // return message in alert if was any error width installation
        alert("App installation prompt not available");
      }
    },
  },
};
</script>
