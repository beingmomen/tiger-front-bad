<template>
  <SettingsLayout title="admins" :breadcrumbs="breadcrumbs">
    <template #content>
      <b-col cols="12">
        <TablesTa title="admin" :headers="headers" :module="module" />
      </b-col>
    </template>
  </SettingsLayout>
</template>

<script>
export default {
  name: "admins",
  layout: "admin",
  async asyncData({ $axios, store, $toast }) {
    await $axios
      .$get(`/users`, {
        params: {
          role: "admin",
        },
      })
      .then((res) => {
        store.dispatch("panel/admins/getAllDataFromApi", res.data.data);
      });
    return {};
  },
  data() {
    return {
      module: "panel/admins",
      breadcrumbs: [
        {
          text: "admins",
          active: true,
          to: "/panel/admins",
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
        "actions",
      ],
    };
  },
  components: {},
};
</script>

<style lang="scss" scoped>
</style>
