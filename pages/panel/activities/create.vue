<template>
  <b-card-code title="Create New User">
    <b-form class="vh-50" @submit.prevent="addDataToDB">
      <b-row>
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
