<template>
  <ActionsCreate title="player" :module="module">
    <template #create>
      <FormInputIcon label="Name" storeKey="name" :module="module">
        <template #icon>
          <user-icon size="1.5x" class="custom-class"></user-icon>
        </template>
      </FormInputIcon>

      <FormDatePicker label="Start Date" storeKey="startDate" :module="module">
        <template #icon>
          <calendar-icon size="1.5x" class="custom-class"></calendar-icon>
        </template>
      </FormDatePicker>

      <FormDatePicker label="Birth Day" storeKey="birth" :module="module">
        <template #icon>
          <calendar-icon size="1.5x" class="custom-class"></calendar-icon>
        </template>
      </FormDatePicker>

      <FormInputIcon label="National ID" storeKey="nationalId" :module="module">
        <template #icon>
          <user-icon size="1.5x" class="custom-class"></user-icon>
        </template>
      </FormInputIcon>

      <FormSelect
        label="Last Belt Name"
        labelSelect="name"
        storeKey="lastBeltName"
        listKey="beltsList"
        global
        :module="module"
      >
        <template #icon>
          <activity-icon size="1.5x" class="custom-class"></activity-icon>
        </template>
      </FormSelect>

      <FormDatePicker
        label="Last Belt Date"
        storeKey="lastBeltDate"
        :module="module"
      >
        <template #icon>
          <calendar-icon size="1.5x" class="custom-class"></calendar-icon>
        </template>
      </FormDatePicker>

      <FormSelect
        label="Championships"
        labelSelect="name"
        storeKey="championships"
        listKey="championshipsList"
        global
        :multiple="true"
        :module="module"
      >
        <template #icon>
          <activity-icon size="1.5x" class="custom-class"></activity-icon>
        </template>
      </FormSelect>

      <FormSelect
        label="Activity"
        labelSelect="name"
        storeKey="activity"
        listKey="activitiesList"
        global
        :module="module"
      >
        <template #icon>
          <activity-icon size="1.5x" class="custom-class"></activity-icon>
        </template>
      </FormSelect>

      <FormRepeator @repeat="repeat" @confirm="confirm(belts)">
        <template #repeated>
          <b-row v-for="(b, index) in belts" :key="index" ref="row">
            <b-col lg="6" md="6" sm="12" class="mb-1 custom-form">
              <b-form-group label="Belt Name">
                <b-input-group class="input-group-merge">
                  <b-input-group-prepend is-text class="h-35 w-13">
                    <activity-icon
                      size="1.5x"
                      class="custom-class"
                    ></activity-icon>
                  </b-input-group-prepend>
                  <v-select
                    class="h-35 w-87"
                    v-model="b.belt"
                    :reduce="(item) => item.id"
                    label="name"
                    :dir="dashDir"
                    :options="beltsList"
                    placeholder="Select"
                  ></v-select>
                </b-input-group>
              </b-form-group>
            </b-col>

            <b-col :lg="4" md="3" sm="12" class="mb-1 custom-form">
              <b-form-group label="Belt Date" label-for="vi-first-name">
                <b-input-group class="input-group-merge">
                  <b-input-group-prepend is-text>
                    <calendar-icon
                      size="1.5x"
                      class="custom-class"
                    ></calendar-icon>
                  </b-input-group-prepend>
                  <b-form-input
                    style="height: 35px"
                    id="vi-first-name"
                    placeholder="Date"
                    v-model="b.date"
                    type="date"
                  />
                </b-input-group>
              </b-form-group>
            </b-col>
            <!-- Remove Button -->
            <b-col lg="2" md="3" class="mb-50 text-end">
              <b-button
                variant="outline-danger"
                class="mt-0 mt-md-2"
                @click="removeItem(index)"
              >
                <x-icon size="1.5x" class="custom-class"></x-icon>

                <span>Delete</span>
              </b-button>
            </b-col>
            <b-col cols="12">
              <hr />
            </b-col>
          </b-row>
        </template>
      </FormRepeator>

      <FormFile label="Image" storeKey="image" :module="module">
        <template #icon>
          <image-icon size="1.5x" class="custom-class"></image-icon>
        </template>
      </FormFile>
    </template>
  </ActionsCreate>
</template>

<script>
import {
  UserIcon,
  MailIcon,
  LockIcon,
  ImageIcon,
  CalendarIcon,
  ActivityIcon,
  XIcon,
} from "vue-feather-icons";
export default {
  layout: "admin",
  async asyncData({ $axios, store, $toast }) {
    store.dispatch("panel/belts/resetData");
    await $axios
      .$get(`/activities`, {
        params: {
          limit: 1000000,
        },
      })
      .then((res) => {
        store.dispatch("global/getActivitiesFromApi", res.data.data);
      });
    await $axios
      .$get(`/belts`, {
        params: {
          limit: 1000000,
        },
      })
      .then((res) => {
        store.dispatch("global/getBeltsFromApi", res.data.data);
      });
    return {};
  },
  data() {
    return {
      module: "panel/players",
      belts: [{ belt: null, date: null }],
    };
  },
  computed: {
    beltsList() {
      return this.$store.getters[`global/beltsList`];
    },
  },
  methods: {
    confirm(data) {
      this.$store.commit(`${this.module}/belts`, data);
    },
    repeat() {
      this.belts = [...this.belts, { belt: null, date: null }];
    },
    removeItem(index) {
      this.belts.splice(index, 1);
    },
  },
  components: {
    UserIcon,
    MailIcon,
    LockIcon,
    ImageIcon,
    CalendarIcon,
    ActivityIcon,
    XIcon,
  },
  watch: {
    // belts: {
    //   handler: function (after) {
    //     this.$store.commit(`${this.module}/belts`, this.belts);
    //   },
    //   deep: true,
    // },
  },
};
</script>
