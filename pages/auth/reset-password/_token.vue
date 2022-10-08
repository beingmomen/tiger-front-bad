<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <!-- Brand logo-->
      <b-link class="brand-logo">
        <MainLogo />
        <MainTitle />
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col lg="8" class="d-none d-lg-flex align-items-center p-5">
        <div
          class="w-100 d-lg-flex align-items-center justify-content-center px-5"
        >
          <b-img
            :src="require('@/assets/images/pages/reset-password-v2.svg')"
            fluid
            alt="Register V2"
          />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Reset password-->
      <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <b-card-title title-tag="h2" class="font-weight-bold mb-1">
            Reset Password 🔒
          </b-card-title>
          <b-card-text class="mb-2">
            Your new password must be different from previously used passwords
          </b-card-text>

          <!-- form -->
          <validation-observer ref="form">
            <b-form
              class="auth-reset-password-form mt-2"
              @submit.prevent="validationForm"
            >
              <!-- password -->
              <b-form-group label="New Password" label-for="reset-password-new">
                <validation-provider
                  #default="{ errors }"
                  name="Password"
                  vid="Password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <b-form-input
                      id="reset-password-new"
                      v-model="reset.password"
                      :type="passwordFieldType"
                      :state="errors.length > 0 ? false : null"
                      class="form-control-merge"
                      name="reset-password-new"
                      placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <MainEyeIcon
                        :visibility="passwordFieldType"
                        @click.native="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- confirm password -->
              <b-form-group
                label-for="reset-password-confirm"
                label="Confirm Password"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Confirm Password"
                  rules="required|confirmed:Password"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <b-form-input
                      id="reset-password-confirm"
                      v-model="reset.passwordConfirm"
                      :type="passwordFieldType"
                      class="form-control-merge"
                      :state="errors.length > 0 ? false : null"
                      name="reset-password-confirm"
                      placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <MainEyeIcon
                        :visibility="passwordFieldType"
                        @click.native="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- submit button -->
              <b-button
                @click.prevent="resetPass"
                block
                type="submit"
                variant="primary"
                :disabled="btnDisabled"
              >
                Set New Password
              </b-button>
            </b-form>
          </validation-observer>

          <p class="text-center mt-2">
            <b-link to="/login">
              <chevron-left-icon
                size="1.5x"
                class="custom-class"
              ></chevron-left-icon>

              Back to login
            </b-link>
          </p>
        </b-col>
      </b-col>
      <!-- /Reset password-->
    </b-row>
  </div>
</template>

<script>
import { ChevronLeftIcon } from "vue-feather-icons";
export default {
  name: "reset-password",
  layout: "auth",
  data() {
    return {
      btnDisabled: false,
      reset: {
        password: "",
        passwordConfirm: "",
      },
    };
  },
  components: {
    ChevronLeftIcon,
  },
  methods: {
    resetPass() {
      this.$refs.form.validate().then((res) => {
        if (res) {
          this.btnDisabled = true;
          this.$axios
            .$patch(
              `/users/resetPassword/${this.$route.params.token}`,
              this.reset
            )
            .then((res) => {
              this.$toast.success(res.status);
              this.$router.push("/login");
            });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
