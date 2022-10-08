<template>
  <b-card-code title="Create New User">
    <b-form class="vh-50" @submit.prevent>
      <b-row>
        <FormInputIcon label="Name" storeKey="name">
          <template #icon>
            <user-icon size="1.5x" class="custom-class"></user-icon>
          </template>
        </FormInputIcon>

        <FormInputIcon label="Email" storeKey="email" type="email">
          <template #icon>
            <mail-icon size="1.5x" class="custom-class"></mail-icon>
          </template>
        </FormInputIcon>

        <FormInputIcon label="Password" storeKey="password" type="password">
          <template #icon>
            <lock-icon size="1.5x" class="custom-class"></lock-icon>
          </template>
        </FormInputIcon>

        <FormInputIcon
          label="Confirm Password"
          storeKey="passwordConfirm"
          type="password"
        >
          <template #icon>
            <lock-icon size="1.5x" class="custom-class"></lock-icon>
          </template>
        </FormInputIcon>

        <!-- reset and submit -->
        <b-col cols="12" class="text-end">
          <b-button type="reset" variant="outline-secondary"> Reset </b-button>
          <b-button type="submit" variant="primary" class="mr-1">
            Submit
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

  components: {
    BCardCode,
    UserIcon,
    MailIcon,
    LockIcon,
  },
};
</script>
