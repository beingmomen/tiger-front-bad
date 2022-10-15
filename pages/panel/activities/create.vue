<template>
  <SettingsLayout :title="$t('sidebar.activities')" :breadcrumbs="breadcrumbs">
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
              <image-icon size="1.5x" class="custom-class"></image-icon>
            </template>
          </FormFile>

          <FormFile label="Image Cover" storeKey="imageCover" :module="module">
            <template #icon>
              <image-icon size="1.5x" class="custom-class"></image-icon>
            </template>
          </FormFile>
        </template>
      </ActionsCreate>
    </template>
  </SettingsLayout>
</template>

<script>
import { UserIcon, ImageIcon } from "vue-feather-icons";
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
          text: this.$t("sidebar.activities"),
          active: false,
          to: this.localePath("/panel/activities"),
        },
        {
          text: this.$t("cards.create"),
          active: true,
          to: this.localePath("/panel/activities/create"),
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
    ImageIcon,
  },
};
</script>
