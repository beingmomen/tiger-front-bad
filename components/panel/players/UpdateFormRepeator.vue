<template>
  <b-col lg="6" md="6">
    <b-card-code class="border border-2" title="Repeating Forms">
      <div>
        <b-form ref="form" class="repeater-form">
          <!-- Row Loop -->
          <b-row v-for="(b, index) in belts" :key="index" ref="row">
            <b-col lg="12" md="12" sm="12" class="mb-1 custom-form">
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

            <b-col :lg="10" md="9" sm="12" class="mb-1 custom-form">
              <b-form-group label="Belt Date" label-for="vi-first-name">
                <b-input-group
                  class="input-group-merge"
                  :class="{ 'flex-row-reverse': dashDir == 'rtl' }"
                >
                  <b-input-group-prepend is-text>
                    <slot name="icon"></slot>
                  </b-input-group-prepend>
                  <b-form-input
                    style="height: 35px"
                    id="example-input"
                    v-model="b.date"
                    type="text"
                    placeholder="YYYY-MM-DD"
                    autocomplete="off"
                    show-decade-nav
                  />
                  <b-input-group-append style="height: 35px">
                    <b-form-datepicker
                      v-model="b.date"
                      show-decade-nav
                      button-only
                      right
                      locale="en-US"
                      aria-controls="example-input"
                      @context="onContext"
                    />
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
            <!-- Remove Button -->
            <b-col lg="2" md="3" class="mb-50 text-end">
              <b-button
                variant="outline-danger"
                class="mt-0 mt-md-2 d-flex align-items-center"
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
        </b-form>
      </div>
      <div class="d-flex justify-content-between">
        <b-button
          class="d-flex align-items-center"
          variant="primary"
          @click="repeat"
          :disabled="disabledRepeate"
        >
          <plus-icon size="1.5x" class="custom-class"></plus-icon>
          <span>Add New</span>
        </b-button>
        <b-button
          class="d-flex align-items-center"
          variant="success"
          @click="confirm(belts)"
        >
          <check-icon size="1.5x" class="custom-class"></check-icon>
          <span>Confirm</span>
        </b-button>
      </div>
    </b-card-code>
  </b-col>
</template>

<script>
import {
  CalendarIcon,
  ActivityIcon,
  XIcon,
  PlusIcon,
  CheckIcon,
} from "vue-feather-icons";
import BCardCode from "~/@core/components/b-card-code/BCardCode.vue";
export default {
  props: {
    module: String,
  },
  data() {
    return {
      belts: [{ belt: null, date: null }],
      disabledRepeate: false,
    };
  },
  methods: {
    confirm(data) {
      this.disabledRepeate = true;
      this.$store.commit(
        `${this.module}/belts`,
        data[0].belt ? { data, confirm: true } : { data: [], confirm: true }
      );
    },
    repeat() {
      this.belts = [...this.belts, { belt: null, date: null }];
    },
    removeItem(index) {
      this.belts.splice(index, 1);
    },
    onContext() {},
  },
  computed: {
    beltsList() {
      return this.$store.getters[`global/beltsList`];
    },
  },
  components: {
    BCardCode,
    CalendarIcon,
    ActivityIcon,
    XIcon,
    PlusIcon,
    CheckIcon,
  },
};
</script>

<style lang="scss" scoped>
</style>
