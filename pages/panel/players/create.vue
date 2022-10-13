<template>
  <SettingsLayout title="players" :breadcrumbs="breadcrumbs">
    <template #content>
      <ActionsCreate title="player" :module="module">
        <template #create>
          <FormInputIcon label="Name" storeKey="name" :module="module">
            <template #icon>
              <user-icon size="1.5x" class="custom-class"></user-icon>
            </template>
          </FormInputIcon>

          <FormDatePicker
            label="Start Date"
            storeKey="startDate"
            :module="module"
          >
            <template #icon>
              <calendar-icon size="1.5x" class="custom-class"></calendar-icon>
            </template>
          </FormDatePicker>

          <FormDatePicker label="Birth Day" storeKey="birth" :module="module">
            <template #icon>
              <calendar-icon size="1.5x" class="custom-class"></calendar-icon>
            </template>
          </FormDatePicker>

          <FormInputIcon
            label="National ID"
            storeKey="nationalId"
            :module="module"
          >
            <template #icon>
              <user-icon size="1.5x" class="custom-class"></user-icon>
            </template>
          </FormInputIcon>

          <FormSelect
            label="Activity"
            labelSelect="name"
            storeKey="activity"
            listKey="activitiesList"
            global
            :change="true"
            :module="module"
          >
            <template #icon>
              <activity-icon size="1.5x" class="custom-class"></activity-icon>
            </template>
          </FormSelect>

          <FormSelect
            label="Championships"
            labelSelect="name"
            storeKey="championships"
            listKey="championshipsList"
            global
            :multiple="true"
            :module="module"
          >
            <template #icon>
              <activity-icon size="1.5x" class="custom-class"></activity-icon>
            </template>
          </FormSelect>

          <FormSelect
            label="Last Belt Name"
            labelSelect="name"
            storeKey="lastBeltName"
            listKey="beltsList"
            global
            :module="module"
          >
            <template #icon>
              <activity-icon size="1.5x" class="custom-class"></activity-icon>
            </template>
          </FormSelect>

          <FormDatePicker
            label="Last Belt Date"
            storeKey="lastBeltDate"
            :module="module"
          >
            <template #icon>
              <calendar-icon size="1.5x" class="custom-class"></calendar-icon>
            </template>
          </FormDatePicker>

          <FormFile
            lg="12"
            md="12"
            label="Image"
            storeKey="image"
            :module="module"
          >
            <template #icon>
              <image-icon size="1.5x" class="custom-class"></image-icon>
            </template>
          </FormFile>

          <PanelPlayersCreateFormRepeator :module="module" />
        </template>
      </ActionsCreate>
    </template>
  </SettingsLayout>
</template>

<script>
import {
  UserIcon,
  MailIcon,
  LockIcon,
  ImageIcon,
  CalendarIcon,
  ActivityIcon,
} from "vue-feather-icons";
export default {
  layout: "admin",
  name: "create",
  async asyncData({ $axios, store, $toast }) {
    store.dispatch("panel/players/resetData");
    await $axios
      .$get(`/activities`, {
        params: {
          limit: 1000000,
        },
      })
      .then((res) => {
        store.dispatch("global/getActivitiesFromApi", res.data.data);
      });
    await $axios
      .$get(`/belts`, {
        params: {
          limit: 1000000,
        },
      })
      .then((res) => {
        store.dispatch("global/getBeltsFromApi", res.data.data);
      });
    await $axios
      .$get(`/championships`, {
        params: {
          limit: 1000000,
        },
      })
      .then((res) => {
        store.dispatch("global/getChampionshipsFromApi", res.data.data);
      });
    return {};
  },
  data() {
    return {
      module: "panel/players",
      breadcrumbs: [
        {
          text: "players",
          active: false,
          to: "/panel/players",
        },
        {
          text: "create",
          active: true,
          to: "/panel/players/create",
        },
      ],
    };
  },
  computed: {
    beltsList() {
      return this.$store.getters[`global/beltsList`];
    },
  },

  components: {
    UserIcon,
    MailIcon,
    LockIcon,
    ImageIcon,
    CalendarIcon,
    ActivityIcon,
  },
};
</script>
