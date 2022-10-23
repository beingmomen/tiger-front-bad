<template>
  <b-card title="Update Information">
    <b-form class="vh-50" @submit.prevent="$emit('updateMe')">
      <b-row>
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

        <FormSelect
          :label="$t('inputs.country')"
          labelSelect="name"
          storeKey="country"
          listKey="countriesList"
          global
          :img="true"
          :notId="true"
          :module="module"
        >
          <template #icon>
            <flag-icon size="1.5x" class="custom-class"></flag-icon>
          </template>
        </FormSelect>

        <FormInputIcon
          :label="$t('inputs.phone')"
          storeKey="phone"
          type="tel"
          :module="module"
        >
          <template #icon>
            <phone-icon size="1.5x" class="custom-class"></phone-icon>
          </template>
        </FormInputIcon>

        <b-col cols="12" class="text-end">
          <b-button type="reset" variant="outline-secondary">
            {{ $t("buttons.reset") }}
          </b-button>
          <b-button type="submit" variant="primary" class="ms-1">
            {{ $t("buttons.update") }}
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-card>
</template>

<script>
import { UserIcon, MailIcon, FlagIcon, PhoneIcon } from "vue-feather-icons";
export default {
  props: {
    module: String,
  },
  components: {
    UserIcon,
    MailIcon,
    FlagIcon,
    PhoneIcon,
  },
};
</script>

<style lang="scss" scoped>
</style>
