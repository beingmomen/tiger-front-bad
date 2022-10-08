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
        <div class="content-wrapper">
          <CardsBreadcrumb :title="title" :breadcrumbs="breadcrumbs">
            <template v-slot:header>
              <home-icon size="1.5x" class="custom-class"></home-icon>
            </template>
          </CardsBreadcrumb>
          <div class="content-body">
            <b-row>
              <nuxt />
            </b-row>
          </div>
        </div>
      </div>
      <!-- <SettingsFooter /> -->
    </div>
    <div v-show="!loading" class="flower-spinner">
      <div class="dots-container">
        <div class="bigger-dot">
          <div class="smaller-dot"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HomeIcon } from "vue-feather-icons";
export default {
  name: "admin",
  middleware: ["mode", "lang", "authentication"],
  mounted() {
    let data = [];
    let filter = this.$route.path
      .split("/")
      .filter((el) => el !== "" && el !== "panel");

    filter.forEach((x, i) => {
      data.push({
        text: x,
        active: filter.length - 1 === i ? true : false,
      });
    });
    this.breadcrumbs = data;
    if (data.length) {
      this.title = data[0].text;
    } else {
      this.title = "panel";
    }

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
      breadcrumbs: [],
      title: "",
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
  components: {
    HomeIcon,
  },
  watch: {
    $route(newValue, oldValue) {
      let data = [];
      let filter = newValue.path
        .split("/")
        .filter((el) => el !== "" && el !== "panel");

      filter.forEach((x, i) => {
        data.push({
          text: x,
          active: filter.length - 1 === i ? true : false,
        });
      });
      this.breadcrumbs = data;
      if (data.length) {
        this.title = data[0].text;
      } else {
        this.title = "panel";
      }
    },
  },
};
</script>

<style lang="scss">
</style>
