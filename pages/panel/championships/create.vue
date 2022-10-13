<template>
  <SettingsLayout title="championships" :breadcrumbs="breadcrumbs">
    <template #content>
      <ActionsCreate title="championship" :module="module">
        <template #create>
          <FormInputIcon label="Name" storeKey="name" :module="module">
            <template #icon>
              <user-icon size="1.5x" class="custom-class"></user-icon>
            </template>
          </FormInputIcon>

          <FormDatePicker label="Date" storeKey="date" :module="module">
            <template #icon>
              <calendar-icon size="1.5x" class="custom-class"></calendar-icon>
            </template>
          </FormDatePicker>

          <FormSelect
            label="Activity"
            labelSelect="name"
            storeKey="activity"
            listKey="activitiesList"
            global
            :module="module"
          >
            <template #icon>
              <activity-icon size="1.5x" class="custom-class"></activity-icon>
            </template>
          </FormSelect>
        </template>
      </ActionsCreate>
    </template>
  </SettingsLayout>
</template>

<script>
import { UserIcon, CalendarIcon, ActivityIcon } from "vue-feather-icons";
export default {
  layout: "admin",
  async asyncData({ $axios, store, $toast }) {
    store.dispatch("panel/belts/resetData");
    await $axios
      .$get(`/activities`, {
        params: {
          limit: 1000000,
        },
      })
      .then((res) => {
        store.dispatch("global/getActivitiesFromApi", res.data.data);
      });
    return {};
  },
  data() {
    return {
      module: "panel/championships",
      breadcrumbs: [
        {
          text: "championships",
          active: false,
          to: "/panel/championships",
        },
        {
          text: "create",
          active: true,
          to: "/panel/championships/create",
        },
      ],
    };
  },
  methods: {},
  components: {
    UserIcon,
    CalendarIcon,
    ActivityIcon,
  },
};
</script>
