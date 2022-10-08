<template>
  <b-card-code title="Update Moderator">
    <b-form class="vh-50" @submit.prevent="updateDataInDB">
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

        <CardsPreviewImage
          :module="module"
          storeKey="PreviewImage"
          path="moderators"
        />

        <!-- reset and submit -->
        <b-col cols="12" class="text-end">
          <b-button type="reset" variant="outline-secondary"> Reset </b-button>
          <b-button type="submit" variant="primary" class="mr-1">
            Update
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
  name: "slug",
  async asyncData({ $axios, store, $toast, params }) {
    const id = params.slug.split("-").at(-1);
    await $axios.$get(`/moderators/${id}`).then((res) => {
      store.dispatch("panel/moderators/showSingleData", res.data.data);
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
      module: "panel/moderators",
    };
  },
  methods: {
    updateDataInDB() {
      this.$store
        .dispatch(`${this.module}/updateDataInDB`, this.id)
        .then(() => {
          this.$toast.success("Updates Successfully");
          this.$store.dispatch(`${this.module}/resetData`);
          this.$router.push("/" + this.module);
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
