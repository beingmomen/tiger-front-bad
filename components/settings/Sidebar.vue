<template>
  <div
    class="main-menu menu-fixed menu-accordion menu-shadow menu-light"
    :class="{
      expanded: makeLayoutCollapsed || true,
      expanded: hover,
    }"
    @mouseenter="hoverSidebar"
    @mouseleave="hoverSidebar"
  >
    <div class="navbar-header expanded">
      <ul class="nav navbar-nav flex-row">
        <li class="nav-item mr-auto mb-3">
          <nuxt-link
            :to="localePath('/panel')"
            class="navbar-brand router-link-active mt-0"
          >
            <span class="brand-logo" style="width: 60px">
              <MainLogo class="mw-100" />
            </span>
            <MainTitle />
          </nuxt-link>
        </li>
        <li class="nav-item nav-toggle">
          <nuxt-link
            @click.native="hideSidebar"
            to=""
            class="nav-link modern-nav-toggle"
          >
            <x-icon
              v-if="width <= 1200"
              size="1.5x"
              class="custom-class"
            ></x-icon>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div class="shadow-bottom"></div>
    <div
      class="ps-container main-menu-content scroll-area ps ps--active-y mt-2"
    >
      <ul class="navigation navigation-main">
        <MainSidebarLink :name="$t(`sidebar.dashboard`)" route="/panel">
          <template #icon>
            <home-icon size="1.5x" class="custom-class"></home-icon>
          </template>
        </MainSidebarLink>
        <MainSidebarBreakLink />
        <MainSidebarLink :name="$t(`sidebar.users`)" route="/panel/users">
          <template #icon>
            <user-icon size="1.5x" class="custom-class"></user-icon>
          </template>
        </MainSidebarLink>
        <MainSidebarLink
          :name="$t(`sidebar.activities`)"
          route="/panel/activities"
        >
          <template #icon>
            <activity-icon size="1.5x" class="custom-class"></activity-icon>
          </template>
        </MainSidebarLink>
        <MainSidebarLink
          :name="$t(`sidebar.moderators`)"
          route="/panel/moderators"
        >
          <template #icon>
            <user-check-icon size="1.5x" class="custom-class"></user-check-icon>
          </template>
        </MainSidebarLink>
        <MainSidebarLink
          :name="$t(`sidebar.championships`)"
          route="/panel/championships"
        >
          <template #icon>
            <img
              style="width: 20px; height: 20px; margin-inline-end: 15.4px"
              :src="require('@/assets/images/icons/player.png')"
              alt=""
            />
          </template>
        </MainSidebarLink>
        <MainSidebarLink :name="$t(`sidebar.belts`)" route="/panel/belts">
          <template #icon>
            <img
              style="width: 20px; height: 20px; margin-inline-end: 15.4px"
              :src="require('@/assets/images/icons/player.png')"
              alt=""
            />
          </template>
        </MainSidebarLink>
        <MainSidebarLink :name="$t(`sidebar.players`)" route="/panel/players">
          <template #icon>
            <img
              style="width: 20px; height: 20px; margin-inline-end: 15.4px"
              :src="require('@/assets/images/icons/player.png')"
              alt=""
            />
          </template>
        </MainSidebarLink>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  XIcon,
  HomeIcon,
  UserIcon,
  ShoppingCartIcon,
  ActivityIcon,
  UserCheckIcon,
} from "vue-feather-icons";
export default {
  props: ["width"],
  data() {
    return {
      hover: false,
      isOpen: false,
    };
  },
  computed: {
    returnDashboardChild() {
      let arr = [
        { name: this.$t("sidebar.settings"), route: "/panel/eCommerce" },
        { name: this.$t("sidebar.pages"), route: "/panel/analytics" },
      ];
      return arr;
    },
  },
  components: {
    XIcon,
    HomeIcon,
    UserIcon,
    ShoppingCartIcon,
    ActivityIcon,
    UserCheckIcon,
  },
  methods: {
    hideSidebar() {
      this.$store.dispatch("hideSidebar");
    },
    hoverSidebar() {
      if (this.width > 1200) {
        this.hover = this.hover ? false : true;
      }
    },
  },
};
</script>

<style lang="scss">
</style>
