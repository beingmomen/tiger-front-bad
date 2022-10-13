<template>
  <SettingsLayout title="championships" :breadcrumbs="breadcrumbs">
    <template #content>
      <b-col cols="12">
        <TablesTa title="championship" :headers="headers" :module="module" />
      </b-col>
    </template>
  </SettingsLayout>
</template>

<script>
export default {
  name: "championships",
  layout: "admin",
  async asyncData({ $axios, store, $toast }) {
    await $axios.$get(`/championships`).then((res) => {
      store.dispatch("panel/championships/getAllDataFromApi", res);
    });
    return {};
  },
  data() {
    return {
      module: "panel/championships",
      breadcrumbs: [
        {
          text: "championships",
          active: true,
          to: "/panel/championships",
        },
      ],
      headers: [
        { key: "name", label: "Name", sortable: true },
        { key: "activity.name", label: "Activity", sortable: true },
        {
          key: "date",
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
