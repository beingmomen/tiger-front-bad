<template>
  <SettingsLayout :title="$t('sidebar.admins')" :breadcrumbs="breadcrumbs">
    <template #content>
      <ActionsCreate :title="$t('cards.admin')" :module="module">
        <template #create>
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

          <FormPasswordInput
            :label="$t('inputs.password')"
            storeKey="password"
            :module="module"
          >
            <template #icon>
              <lock-icon size="1.5x" class="custom-class"></lock-icon>
            </template>
          </FormPasswordInput>

          <FormPasswordInput
            :label="$t('inputs.passwordConfirm')"
            storeKey="passwordConfirm"
            :module="module"
          >
            <template #icon>
              <lock-icon size="1.5x" class="custom-class"></lock-icon>
            </template>
          </FormPasswordInput>
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
          text: this.$t("cards.create"),
          active: true,
          to: this.localePath("/panel/admins/create"),
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
