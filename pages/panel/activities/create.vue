<template>
  <SettingsLayout title="activities" :breadcrumbs="breadcrumbs">
    <template #content>
      <ActionsCreate title="activity" :module="module">
        <template #create>
          <FormInputIcon
            label="Name"
            storeKey="name"
            :module="module"
            lg="12"
            md="12"
          >
            <template #icon>
              <user-icon size="1.5x" class="custom-class"></user-icon>
            </template>
          </FormInputIcon>

          <FormFile label="Image" storeKey="image" :module="module">
            <template #icon>
              <mail-icon size="1.5x" class="custom-class"></mail-icon>
            </template>
          </FormFile>

          <FormFile label="Image Cover" storeKey="imageCover" :module="module">
            <template #icon>
              <mail-icon size="1.5x" class="custom-class"></mail-icon>
            </template>
          </FormFile>
        </template>
      </ActionsCreate>
    </template>
  </SettingsLayout>
</template>

<script>
import { UserIcon, MailIcon, LockIcon } from "vue-feather-icons";
import BCardCode from "~/@core/components/b-card-code/BCardCode.vue";
export default {
  layout: "admin",
  async asyncData({ $axios, store, $toast }) {
    store.dispatch("panel/belts/resetData");
    return {};
  },
  data() {
    return {
      module: "panel/activities",
      breadcrumbs: [
        {
          text: "activities",
          active: false,
          to: "/panel/activities",
        },
        {
          text: "create",
          active: true,
          to: "/panel/activities/create",
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
  },
};
</script>
