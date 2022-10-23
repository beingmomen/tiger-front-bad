<template>
  <div>
    <!-- Alert: No item found -->
    <b-alert variant="danger" :show="userData === undefined">
      <h4 class="alert-heading">Error fetching user data</h4>
      <div class="alert-body">
        No user found with this user id. Check
        <b-link class="alert-link" :to="{ name: 'apps-users-list' }">
          User List
        </b-link>
        for other users.
      </div>
    </b-alert>

    <template v-if="userData">
      <!-- First Row -->
      <b-row>
        <b-col cols="12">
          <PanelProfileInfo :module="module" />
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="12">
          <PanelProfileUpdateInfo :module="module" @updateMe="updateMe" />
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="12">
          <PanelProfileUpdatePassword
            :module="module"
            @updatePass="updatePass"
          />
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="12" lg="6">
          <!-- <PanelProfileTimeLine /> -->
        </b-col>
      </b-row>

      <!-- <PanelProfileTable /> -->
    </template>
  </div>
</template>


<script>
export default {
  layout: "admin",
  name: "slug",
  async asyncData({ $axios, store, $toast, $auth }) {
    store.dispatch("panel/profile/getAllDataFromApi", $auth.user);
    return {};
  },
  data() {
    return {
      userData: true,
      module: "panel/profile",
    };
  },
  methods: {
    updateMe() {
      this.$store.dispatch(`${this.module}/updateMe`).then(() => {
        this.$store.dispatch(`${this.module}/me`);
        this.$nuxt.refresh();
        this.$toast.success("Updated Successfully");
      });
    },
    updatePass() {
      this.$store.dispatch(`${this.module}/updatePass`).then(() => {
        this.$nuxt.refresh();
        this.$toast.success("Updated Successfully");
        this.$store.dispatch(`${this.module}/resetSecret`);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
