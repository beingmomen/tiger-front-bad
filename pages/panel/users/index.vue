<template>
  <SettingsLayout title="users" :breadcrumbs="breadcrumbs">
    <template #content>
      <b-col cols="12">
        <TablesTa
          title="user"
          :headers="headers"
          :module="module"
          :create="false"
          :update="false"
        />
      </b-col>
    </template>
  </SettingsLayout>
</template>

<script>
export default {
  name: "users",
  layout: "admin",
  async asyncData({ $axios, store, $toast }) {
    await $axios.$get(`/users`).then((res) => {
      store.dispatch("panel/users/getAllDataFromApi", res.data.data);
    });
    return {};
  },
  data() {
    return {
      module: "panel/users",
      breadcrumbs: [
        {
          text: "users",
          active: true,
          to: "/panel/users",
        },
      ],
      headers: [
        {
          key: "avatar",
          label: "Photo",
          sortable: false,
          formatter: (value, key, item) => {
            let url = `${this.$config.NODE_URL_images}/users/${item.photo}`;
            return url;
          },
        },
        { key: "name", label: "Name", sortable: true },
        { key: "email", label: "Email", sortable: false },
        { key: "role", label: "Role", sortable: true },
        "actions",
      ],
    };
  },
  components: {},
};
</script>

<style lang="scss" scoped>
</style>
