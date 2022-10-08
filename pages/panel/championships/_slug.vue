<template>
  <ActionsUpdate title="championship" :module="module" :id="id">
    <template #update>
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
  </ActionsUpdate>
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
    await $axios.$get(`/championships/${id}`).then((res) => {
      store.dispatch("panel/championships/showSingleData", res.data.data);
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
      module: "panel/championships",
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
