<template>
  <SettingsLayout :title="$t('sidebar.admins')" :breadcrumbs="breadcrumbs">
    <template #content>
      <ActionsUpdate :title="$t('cards.admin')" :module="module" :id="id">
        <template #update>
          <FormInputIcon
            :label="$t('inputs.name')"
            storeKey="name"
            :module="module"
          >
            <template #icon>
              <user-icon size="1.5x" class="custom-class"></user-icon>
            </template>
          </FormInputIcon>

          <FormInputIcon
            :label="$t('inputs.email')"
            storeKey="email"
            type="email"
            :module="module"
          >
            <template #icon>
              <mail-icon size="1.5x" class="custom-class"></mail-icon>
            </template>
          </FormInputIcon>
        </template>
      </ActionsUpdate>
    </template>
  </SettingsLayout>
</template>

<script>
import { UserIcon, MailIcon, LockIcon } from "vue-feather-icons";
import BCardCode from "~/@core/components/b-card-code/BCardCode.vue";
export default {
  layout: "admin",
  name: "slug",
  async asyncData({ $axios, store, $toast, params }) {
    const id = params.slug.split("-").at(-1);
    await $axios.$get(`/users/${id}`).then((res) => {
      store.dispatch("panel/admins/showSingleData", res.data.data);
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
      module: "panel/admins",
      breadcrumbs: [
        {
          text: this.$t("sidebar.admins"),
          active: false,
          to: this.localePath("/panel/admins"),
        },
        {
          text: this.$t("cards.update"),
          active: true,
          to: this.localePath("/panel/admins/:slug"),
        },
      ],
    };
  },
  components: {
    BCardCode,
    UserIcon,
    MailIcon,
    LockIcon,
  },
};
</script>

<style lang="scss" scoped>
</style>
