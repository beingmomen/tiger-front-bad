<template>
  <SettingsLayout :title="$t('sidebar.players')" :breadcrumbs="breadcrumbs">
    <template #content>
      <b-col cols="12">
        <TablesTa title="player" :headers="headers" :module="module" />
      </b-col>
    </template>
  </SettingsLayout>
</template>

<script>
export default {
  name: "players",
  layout: "admin",
  async asyncData({ $axios, store, $toast }) {
    await $axios.$get(`/players`).then((res) => {
      store.dispatch("panel/players/getAllDataFromApi", res);
    });
    return {};
  },
  data() {
    return {
      module: "panel/players",
      breadcrumbs: [
        {
          text: this.$t("sidebar.players"),
          active: true,
          to: this.localePath("/panel/players"),
        },
      ],
      headers: [
        {
          key: "avatar",
          label: "Photo",
          sortable: false,
          formatter: (value, key, item) => {
            let url = `${this.$config.NODE_URL_images}/players/${item.image}`;
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
        {
          key: "birth",
          label: "Birth Day",
          sortable: true,
          formatter: (value) => {
            return this.$moment(value).format("YYYY-MM-DD");
          },
        },
        { key: "nationalId", label: "National ID", sortable: true },
        { key: "lastBelt.belt.name", label: "Last Belt", sortable: true },
        { key: "activity.name", label: "activity", sortable: true },
        "actions",
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
