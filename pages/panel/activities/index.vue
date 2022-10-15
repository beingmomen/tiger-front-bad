<template>
  <SettingsLayout :title="$t('sidebar.activities')" :breadcrumbs="breadcrumbs">
    <template #content>
      <b-col cols="12">
        <TablesTa title="activity" :headers="headers" :module="module" />
      </b-col>
    </template>
  </SettingsLayout>
</template>

<script>
export default {
  name: "activities",
  layout: "admin",
  async asyncData({ $axios, store, $toast }) {
    await $axios.$get(`/activities`).then((res) => {
      store.dispatch("panel/activities/getAllDataFromApi", res);
    });
    return {};
  },
  props: ["test"],
  data() {
    return {
      module: "panel/activities",
      breadcrumbs: [
        {
          text: this.$t("sidebar.activities"),
          active: true,
          to: this.localePath("/panel/activities"),
        },
      ],
      headers: [
        {
          key: "avatar",
          label: "Photo",
          sortable: false,
          formatter: (value, key, item) => {
            let url = `${this.$config.NODE_URL_images}/activities/${item.image}`;
            return url;
          },
        },
        {
          key: "cover",
          label: "Cover",
          sortable: false,
          formatter: (value, key, item) => {
            let url = `${this.$config.NODE_URL_images}/activities/${item.imageCover}`;
            return url;
          },
        },
        { key: "name", label: "Name", sortable: true },
        "actions",
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
