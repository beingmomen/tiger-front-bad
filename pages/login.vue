<template>
  <ActionsAuth
    :img="img"
    :welcome="$t('login.welcome')"
    :please="$t('login.please')"
    :first="$t('login.new_platform')"
    :second="$t('login.new_account')"
    :btn="$t('buttons.login')"
    :module="module"
    url="/auth/register"
  >
    <template #auth>
      <FormInputIcon
        label="Email"
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

      <FormPasswordInput
        label="Password"
        storeKey="password"
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
import { MailIcon, LockIcon } from "vue-feather-icons";

export default {
  name: "login",
  layout: "auth",
  data() {
    return {
      module: "authentication/login",
      img: "login-v2.svg",
      btnDisabled: false,
    };
  },
  components: {
    MailIcon,
    LockIcon,
  },
};
</script>
