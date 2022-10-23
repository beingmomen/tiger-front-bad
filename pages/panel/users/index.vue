<template>
  <SettingsLayout :title="$t('sidebar.users')" :breadcrumbs="breadcrumbs">
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
    await $axios
      .$get(`/users`, {
        params: {
          role: "user",
        },
      })
      .then((res) => {
        store.dispatch("panel/users/getAllDataFromApi", res.data.data);
      });
    return {};
  },
  data() {
    return {
      module: "panel/users",
      breadcrumbs: [
        {
          text: this.$t("sidebar.users"),
          active: true,
          to: "/panel/users",
        },
      ],
      headers: [
        {
          key: "avatar",
          label: this.$t("tables.photo"),
          sortable: false,
          formatter: (value, key, item) => {
            let url = `${this.$config.NODE_URL_images}/users/${item.photo}`;
            return url;
          },
        },
        { key: "name", label: this.$t("tables.name"), sortable: true },
        { key: "email", label: this.$t("tables.email"), sortable: false },
        { key: "country", label: this.$t("tables.country"), sortable: false },
        { key: "phone", label: this.$t("tables.phone"), sortable: false },
        { key: "actions", label: this.$t("tables.actions"), sortable: false },
      ],
    };
  },
  components: {},
};
</script>

<style lang="scss" scoped>
</style>
