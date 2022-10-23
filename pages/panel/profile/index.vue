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
          <PanelProfileInfo />
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="12" lg="6">
          <PanelProfileTimeLine />
        </b-col>
      </b-row>

      <PanelProfileTable />
    </template>
  </div>
</template>


<script>
export default {
  layout: "admin",
  name: "slug",
  data() {
    return {
      userData: true,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
