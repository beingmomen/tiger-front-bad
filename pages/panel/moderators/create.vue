<template>
  <SettingsLayout title="moderators" :breadcrumbs="breadcrumbs">
    <template #content>
      <ActionsCreate title="moderator" :module="module">
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

          <FormFile label="Image" storeKey="image" :module="module">
            <template #icon>
              <image-icon size="1.5x" class="custom-class"></image-icon>
            </template>
          </FormFile>

          <FormSelect
            label="Activities"
            labelSelect="name"
            storeKey="activities"
            listKey="activitiesList"
            global
            :multiple="true"
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
import {
  UserIcon,
  MailIcon,
  LockIcon,
  ImageIcon,
  CalendarIcon,
  ActivityIcon,
} from "vue-feather-icons";
import BCardCode from "~/@core/components/b-card-code/BCardCode.vue";
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
      module: "panel/moderators",
      breadcrumbs: [
        {
          text: "moderators",
          active: false,
          to: "/panel/moderators",
        },
        {
          text: "create",
          active: true,
          to: "/panel/moderators/create",
        },
      ],
    };
  },
  methods: {
    addDataToDB() {
      this.$store.dispatch(`${this.module}/addDataToDB`).then(() => {
        this.$toast.success("Created Successfully");
        this.$router.push(this.$route.path.replace("/create", ""));
        this.$store.dispatch(`${this.module}/resetData`);
      });
    },
  },
  components: {
    BCardCode,
    UserIcon,
    MailIcon,
    LockIcon,
    ImageIcon,
    CalendarIcon,
    ActivityIcon,
  },
};
</script>
