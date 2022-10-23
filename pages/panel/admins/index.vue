<template>
  <SettingsLayout :title="$t('sidebar.admins')" :breadcrumbs="breadcrumbs">
    <template #content>
      <b-col cols="12">
        <TablesTa
          :title="$t('buttons.admin')"
          :headers="headers"
          :module="module"
        />
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
          text: this.$t("sidebar.admins"),
          active: true,
          to: "/panel/admins",
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
