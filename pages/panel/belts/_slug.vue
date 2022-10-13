<template>
  <SettingsLayout title="belts" :breadcrumbs="breadcrumbs">
    <template #content>
      <ActionsUpdate title="belt" :module="module" :id="id">
        <template #update>
          <FormInputIcon label="Name" storeKey="name" :module="module">
            <template #icon>
              <user-icon size="1.5x" class="custom-class"></user-icon>
            </template>
          </FormInputIcon>

          <FormInputIcon label="Color" storeKey="color" :module="module">
            <template #icon>
              <user-icon size="1.5x" class="custom-class"></user-icon>
            </template>
          </FormInputIcon>

          <FormSelect
            label="Activities"
            labelSelect="name"
            storeKey="activities"
            listKey="activitiesList"
            :multiple="true"
            global
            :module="module"
          >
            <template #icon>
              <activity-icon size="1.5x" class="custom-class"></activity-icon>
            </template>
          </FormSelect>
        </template>
      </ActionsUpdate>
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
  name: "slug",
  async asyncData({ $axios, store, $toast, params }) {
    const id = params.slug.split("-").at(-1);
    await $axios.$get(`/belts/${id}`).then((res) => {
      store.dispatch("panel/belts/showSingleData", res.data.data);
    });

    await $axios
      .$get(`/activities`, {
        params: {
          limit: 1000000,
        },
      })
      .then((res) => {
        store.dispatch("global/getActivitiesFromApi", res.data.data);
      });

    return {
      id,
    };
  },
  data() {
    return {
      module: "panel/belts",
      breadcrumbs: [
        {
          text: "belts",
          active: false,
          to: "/panel/belts",
        },
        {
          text: "update",
          active: true,
          to: "/panel/belts/:slug",
        },
      ],
    };
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
