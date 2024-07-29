<template>
  <div
    :class="`sidbar-${this.$store.state.mood}-${this.$store.state.sidBar}-${this.$store.state.language}`"
  >
    <!-- close icon  -->
    <div class="close-icon" @click="this.$store.commit('changeSidBarStatus')">
      <icon icon="arrow-left" />
    </div>
    <!-- close icon  -->

    <!-- profile  -->
    <div class="profile">
      <img
        class="avatar"
        :src="this.$store.state.user ? this.$store.state.user.user.avatar : ''"
        alt=""
      />
      <!-- user name  -->
      <h4>
        {{ this.$store.state.user ? this.$store.state.user.user.name : null }}
      </h4>
      <!-- user name  -->

      <!-- user id  -->
      <CopyIdComponentVue />
      <!-- user id  -->
    </div>
    <!-- profile  -->

    <!-- pages title  -->
    <h3 class="title">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.language.pages
          : this.$store.state.Arabic.language.pages
      }}
    </h3>

    <!-- english links -->
    <ul>
      <li
        v-for="(link, index) in this.$store.state.language == 'English'
          ? this.$store.state.English.links
          : this.$store.state.Arabic.links"
        :key="index"
        :class="
          link.access == this.$store.state.user_type || link.access == 'public'
            ? 'show'
            : 'hidden'
        "
      >
        <router-link v-if="link.path" :to="`${link.path}`"
          >{{ link.title }}
          <icon icon="arrow-right" />
        </router-link>

        <a v-else :href="`${link.url}`">
          {{ link.title }}
          <icon icon="arrow-right" />
        </a>
      </li>
    </ul>

    <!-- arabic links -->
    <!-- <ul v-else-if="this.$store.state.language == 'Arabic'">
      <li
        v-for="(link, index) in this.$store.state.Arabic.links"
        :key="index"
        :class="
          link.access == this.$store.state.user_type || link.access == 'public'
            ? 'show'
            : 'hidden'
        "
      >
        <router-link :to="`${link.path}`"
          >{{ link.title }}
          <icon icon="arrow-right" />
        </router-link>
      </li>
    </ul> -->

    <h3 class="title">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.language.title
          : this.$store.state.Arabic.language.title
      }}
    </h3>

    <ul :class="`Language-${this.$store.state.language_list_state}`">
      <p @click="this.$store.commit('changelanguage_list_state')">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.language.english
            : this.$store.state.Arabic.language.arabic
        }}
        <icon icon="arrow-down" />
      </p>
      <li @click="changeLanguage('Arabic')">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.language.arabic
            : this.$store.state.Arabic.language.arabic
        }}
        <img src="../../assets/Arabic_icon.png" alt="" />
      </li>

      <li @click="changeLanguage('English')">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.language.english
            : this.$store.state.Arabic.language.english
        }}
        <img src="../../assets/English_icon.png" alt="" />
      </li>
    </ul>

    <h3 class="title">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.theme
          : this.$store.state.Arabic.theme
      }}
    </h3>
    <ul class="themes">
      <li class="blue" @click="selectTheme('blue')"></li>
      <li class="pink" @click="selectTheme('pink')"></li>
      <li class="orange" @click="selectTheme('orange')"></li>
      <li class="green" @click="selectTheme('green')"></li>
    </ul>

    <h3 class="title">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.mood
          : this.$store.state.Arabic.mood
      }}
    </h3>
    <div
      :class="`mood-cont-${this.$store.state.mood}`"
      @click="this.$store.commit('changeMood')"
    >
      <div class="mood-hand">
        <icon icon="moon" v-if="this.$store.state.mood == 'darck'" />
        <icon icon="sun" v-if="this.$store.state.mood == 'light'" />
      </div>
    </div>

    <button
      class="log-out"
      v-if="this.$store.state.user"
      @click="this.$store.dispatch('LogOut')"
    >
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.log_out
          : this.$store.state.Arabic.log_out
      }}
    </button>
  </div>
</template>

<script>
import CopyIdComponentVue from "./CopyIdComponent.vue";
export default {
  name: "sid-bar-component",
  data() {
    return {};
  },
  components: {
    CopyIdComponentVue,
  },
  methods: {
    selectTheme(theme) {
      // update theme value in store
      this.$store.state.theme = theme;

      // save the selected theme in Storage
      window.localStorage.setItem("theme", theme);
    },
    changeLanguage(language) {
      // update language value in store
      this.$store.state.language = language;

      // save the selected language in Storage
      window.localStorage.setItem("language", language);
    },
  },
};
</script>
