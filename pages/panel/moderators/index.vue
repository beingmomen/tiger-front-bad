<template>
  <SettingsLayout :title="$t('sidebar.moderators')" :breadcrumbs="breadcrumbs">
    <template #content>
      <b-col cols="12">
        <TablesTa title="moderator" :headers="headers" :module="module" />
      </b-col>
    </template>
  </SettingsLayout>
</template>

<script>
export default {
  name: "moderators",
  layout: "admin",
  async asyncData({ $axios, store, $toast }) {
    await $axios.$get(`/moderators`).then((res) => {
      store.dispatch("panel/moderators/getAllDataFromApi", res);
    });
    return {};
  },
  data() {
    return {
      module: "panel/moderators",
      breadcrumbs: [
        {
          text: this.$t("sidebar.moderators"),
          active: true,
          to: this.localePath("/panel/moderators"),
        },
      ],
      headers: [
        {
          key: "avatar",
          label: "Photo",
          sortable: false,
          formatter: (value, key, item) => {
            let url = `${this.$config.NODE_URL_images}/moderators/${item.image}`;
            return url;
          },
        },
        { key: "name", label: "Name", sortable: true },
        {
          key: "startDate",
          label: "Start Date",
          sortable: true,
          formatter: (value) => {
            return this.$moment(value).format("YYYY-MM-DD");
          },
        },
        "actions",
      ],
    };
  },
  components: {},
};
</script>

<style lang="scss" scoped>
</style>
