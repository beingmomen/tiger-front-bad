<template>
  <b-card-code title="Create New User">
    <b-form class="vh-50" @submit.prevent="addDataToDB">
      <b-row>
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

        <!-- reset and submit -->
        <b-col cols="12" class="text-end">
          <b-button type="reset" variant="outline-secondary"> Reset </b-button>
          <b-button type="submit" variant="primary" class="mr-1">
            Create
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-card-code>
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
