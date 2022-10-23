<template>
  <div>
    <SettingsFonts />
    <div
      v-show="loading"
      class="
        vertical-layout
        h-100
        vertical-menu-modern
        navbar-floating
        footer-static
      "
      :class="{
        'menu-expanded': makeLayoutCollapsed,
        'menu-collapsed': !makeLayoutCollapsed,
        'dark-icons': makeLayoutCollapsed,
        'menu-hide': window.width <= 1200,
        'menu-open': toggleSidebar,
      }"
    >
      <SettingsNavbar :width="window.width" />
      <SettingsSidebar :width="window.width" />
      <div class="sidenav-overlay"></div>
      <div class="app-content content">
        <div class="content-overlay"></div>
        <div class="header-navbar-shadow"></div>
        <Nuxt />
      </div>
      <!-- <SettingsFooter /> -->
    </div>
    <div
      v-show="!loading"
      class="card align-items-center justify-content-center"
      style="height: calc(100vh)"
    >
      <lottie-player
        src="https://assets9.lottiefiles.com/packages/lf20_x62chJ.json"
        class="lottie-container"
        background="transparent"
        speed="1"
        style="width: 500px; height: 500px"
        loop
        autoplay
      ></lottie-player>
    </div>
  </div>
</template>

<script>
export default {
  name: "admin",
  middleware: ["mode", "lang", "authentication"],
  mounted() {
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("menu-open")) {
        this.$store.dispatch("hideSidebar");
      }
    });
    window.addEventListener("resize", this.handleResize);
    this.handleResize();

    setTimeout(() => {
      this.loading = true;
    }, 2000);
  },
  data() {
    return {
      window: {
        width: 0,
        height: 0,
      },
      loading: false,
    };
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
  },
  watch: {
    $route(newValue, oldValue) {
      const html = document.documentElement;
      if (newValue.name.includes("__ar")) {
        html.classList.add("arabic-dir");
        html.classList.remove("english-dir");
        html.setAttribute("dir", "rtl");
        html.setAttribute("lang", "ar");
        this.$store.dispatch("changeDashDir", "ar");
      } else {
        html.classList.add("english-dir");
        html.classList.remove("arabic-dir");
        html.setAttribute("dir", "ltr");
        html.setAttribute("lang", "en");
        this.$store.dispatch("changeDashDir", "en");
      }
    },
  },
};
</script>

<style lang="scss">
</style>
