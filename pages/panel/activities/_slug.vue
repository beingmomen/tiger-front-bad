<template>
  <b-card-code title="Update User">
    <b-form class="vh-50" @submit.prevent="updateDataInDB">
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

        <CardsPreviewImage
          :module="module"
          storeKey="PreviewImage"
          path="activities"
        />
        <CardsPreviewImage
          :module="module"
          storeKey="PreviewImageCover"
          path="activities"
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
import { UserIcon, MailIcon, LockIcon } from "vue-feather-icons";
import BCardCode from "~/@core/components/b-card-code/BCardCode.vue";
export default {
  layout: "admin",
  name: "slug",
  async asyncData({ $axios, store, $toast, params }) {
    const id = params.slug.split("-").at(-1);
    await $axios.$get(`/activities/${id}`).then((res) => {
      store.dispatch("panel/activities/showSingleData", res.data.data);
    });

    return {
      id,
    };
  },
  data() {
    return {
      module: "panel/activities",
    };
  },
  methods: {
    updateDataInDB() {
      this.$store
        .dispatch(`${this.module}/updateDataInDB`, this.id)
        .then(() => {
          this.$toast.success("Updates Successfully");
          this.$store.dispatch(`${this.module}/resetData`);
          this.$router.push(
            this.$route.path.replace(`/${this.$route.params.slug}`, "")
          );
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
