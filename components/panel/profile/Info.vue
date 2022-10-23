<template>
  <b-card>
    <b-row>
      <!-- User Info: Left col -->
      <b-col
        cols="12"
        xl="6"
        class="d-flex justify-content-between flex-column"
      >
        <!-- User Avatar & Action Buttons -->
        <div class="d-flex justify-content-start">
          <b-avatar
            :src="url"
            text="tgegjid dgfgdhj"
            :variant="`light-green`"
            size="104px"
            rounded
          />
          <div class="d-flex flex-column ml-1">
            <div class="mb-1">
              <h4 class="mb-0">{{ $auth.user.name }}</h4>
              <span class="card-text">{{ $auth.user.email }}</span>
            </div>
            <div class="d-flex flex-wrap">
              <b-button variant="primary" @click="$refs.refInputEl.click()">
                <input
                  ref="refInputEl"
                  type="file"
                  class="d-none"
                  @input="inputImageRenderer"
                />
                <span class="d-none d-sm-inline">Update</span>
                <feather-icon icon="EditIcon" class="d-inline d-sm-none" />
              </b-button>
            </div>
          </div>
        </div>
      </b-col>

      <!-- Right Col: Table -->
      <b-col cols="12" xl="6">
        <table class="mt-2 mt-xl-0 w-100">
          <tr>
            <th class="pb-50">
              <user-icon size="1.5x" class="custom-class mr-75"></user-icon>
              <span class="font-weight-bold">Username</span>
            </th>
            <td class="pb-50">{{ $auth.user.slug }}</td>
          </tr>
          <tr>
            <th class="pb-50">
              <star-icon size="1.5x" class="custom-class mr-75"></star-icon>
              <span class="font-weight-bold">Role</span>
            </th>
            <td class="pb-50 text-capitalize">{{ $auth.user.role }}</td>
          </tr>
          <tr>
            <th class="pb-50">
              <flag-icon size="1.5x" class="custom-class mr-75"></flag-icon>
              <span class="font-weight-bold">Country</span>
            </th>
            <td class="pb-50">country</td>
          </tr>
          <tr>
            <th>
              <phone-icon size="1.5x" class="custom-class mr-75"></phone-icon>
              <span class="font-weight-bold">Contact</span>
            </th>
            <td>contact</td>
          </tr>
        </table>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import {
  UserIcon,
  StarIcon,
  FlagIcon,
  PhoneIcon,
  XIcon,
  HomeIcon,
  UsersIcon,
  ShoppingCartIcon,
  ActivityIcon,
  UserCheckIcon,
} from "vue-feather-icons";
export default {
  computed: {
    url() {
      let url = `${this.$config.NODE_URL_images}/users/${this.$auth.user.photo}`;
      return url;
    },
  },
  components: {
    UserIcon,
    StarIcon,
    FlagIcon,
    PhoneIcon,
    XIcon,
    HomeIcon,
    UsersIcon,
    ShoppingCartIcon,
    ActivityIcon,
    UserCheckIcon,
  },
};
</script>

<style lang="scss" scoped>
</style>
