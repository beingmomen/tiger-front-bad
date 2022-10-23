<template>
  <ActionsAuth
    :img="img"
    :welcome="$t('register.welcome')"
    :please="$t('register.please')"
    :first="$t('register.already')"
    :second="$t('register.signIn')"
    :btn="$t('buttons.signUp')"
    :module="module"
    url="/login"
  >
    <template #auth>
      <FormInputIcon
        :label="$t('inputs.name')"
        storeKey="name"
        :module="module"
        lg="12"
        md="12"
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
        lg="12"
        md="12"
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
        lg="12"
        md="12"
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
        lg="12"
        md="12"
      >
        <template #icon>
          <phone-icon size="1.5x" class="custom-class"></phone-icon>
        </template>
      </FormInputIcon>

      <FormPasswordInput
        :label="$t('inputs.password')"
        storeKey="password"
        :module="module"
        lg="12"
        md="12"
      >
        <template #icon>
          <lock-icon size="1.5x" class="custom-class"></lock-icon>
        </template>
      </FormPasswordInput>

      <FormPasswordInput
        :label="$t('inputs.passwordConfirm')"
        storeKey="passwordConfirm"
        :module="module"
        lg="12"
        md="12"
      >
        <template #icon>
          <lock-icon size="1.5x" class="custom-class"></lock-icon>
        </template>
      </FormPasswordInput>
    </template>
  </ActionsAuth>
</template>

<script>
import {
  UserIcon,
  MailIcon,
  FlagIcon,
  PhoneIcon,
  LockIcon,
} from "vue-feather-icons";
export default {
  name: "register",
  layout: "auth",
  // async asyncData({ $axios, store, $toast }) {
  //   await $axios
  //     .$get(`https://countriesnow.space/api/v0.1/countries/info`, {
  //       params: {
  //         returns: "currency,flag,unicodeFlag,dialCode",
  //       },
  //     })
  //     .then((res) => {
  //       store.dispatch("global/getAllCountries", res.data);
  //     });
  //   return {};
  // },
  data() {
    return {
      module: "authentication/register",
      img: "register-v2-dark.svg",
      btnDisabled: false,
    };
  },
  components: {
    UserIcon,
    MailIcon,
    FlagIcon,
    PhoneIcon,
    LockIcon,
  },
};
</script>

<style lang="scss" scoped>
</style>
