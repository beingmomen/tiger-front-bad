<template>
  <b-card-code
    class="border border-2 position-relative mt-2"
    :title="$t('sidebar.belts')"
  >
    <plus-square-icon
      @click="repeat"
      size="1.5x"
      class="custom-class plus-row position-absolute text-primary fs-3"
      :class="dashDir == 'rtl' ? 'plus-row-rtl' : 'plus-row-ltr'"
    ></plus-square-icon>

    <div>
      <b-form ref="form" class="repeater-form">
        <!-- Row Loop -->
        <b-row v-for="(b, index) in belts" :key="index" ref="row">
          <b-col lg="6" md="6" sm="12" class="mb-1 custom-form">
            <b-form-group label="Belt Name">
              <b-input-group
                class="input-group-merge"
                :class="
                  dashDir == 'rtl'
                    ? 'form-input-icon-rtl'
                    : 'form-input-icon-ltr'
                "
              >
                <b-input-group-prepend is-text class="h-35 w-13 select-prepend">
                  <font-awesome-icon icon="fa-solid fa-bacon" class="fa-xl" />
                </b-input-group-prepend>
                <v-select
                  class="h-35 w-87"
                  v-model="b.belt"
                  :reduce="(item) => item.id"
                  label="name"
                  :dir="dashDir"
                  :options="multipleBelts"
                  placeholder="Select"
                ></v-select>
              </b-input-group>
            </b-form-group>
          </b-col>

          <b-col :lg="5" md="5" sm="11" class="mb-1 custom-form">
            <b-form-group label="Belt Date" label-for="vi-first-name">
              <b-input-group
                class="input-group-merge"
                :class="
                  dashDir == 'rtl'
                    ? 'form-input-icon-rtl'
                    : 'form-input-icon-ltr'
                "
              >
                <b-input-group-prepend is-text style="height: 35px">
                  <calendar-icon
                    size="1.5x"
                    class="custom-class"
                  ></calendar-icon>
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
                    class="date-pick-btn"
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
          <b-col
            lg="1"
            md="1"
            sm="1"
            class="mb-50 d-flex justify-content-center align-items-center"
          >
            <!-- <b-button
              variant="outline-danger"
              class="mt-0 mt-md-2 d-flex align-items-center"
              @click="removeItem(index)"
            >
              <x-icon size="1.5x" class="custom-class"></x-icon>

              <span>Delete</span>
            </b-button> -->
            <trash-icon
              @click="removeItem(index)"
              size="1.5x"
              class="custom-class text-danger cursor-pointer"
            ></trash-icon>
          </b-col>
          <b-col cols="12">
            <hr />
          </b-col>
        </b-row>
      </b-form>
    </div>
    <!-- <div class="d-flex justify-content-between">
      <b-button
        class="d-flex align-items-center"
        variant="primary"
        @click="repeat"
      >
        <plus-icon size="1.5x" class="custom-class me-1"></plus-icon>
        <span>{{ $t("buttons.addBelt") }}</span>
      </b-button>
      <b-button
        class="d-flex align-items-center"
        variant="success"
        @click="confirm(belts)"
      >
        <check-icon size="1.5x" class="custom-class me-1"></check-icon>
        <span style="">{{ $t("buttons.confirm") }}</span>
      </b-button>
    </div> -->
  </b-card-code>
</template>

<script>
import {
  CalendarIcon,
  ActivityIcon,
  XIcon,
  PlusIcon,
  CheckIcon,
  TrashIcon,
  PlusSquareIcon,
} from "vue-feather-icons";
import BCardCode from "~/@core/components/b-card-code/BCardCode.vue";
export default {
  props: {
    module: String,
  },
  mounted() {
    this.multipleBelts = this.beltsList;
  },
  data() {
    return {
      belts: [{ belt: null, date: null }],
      multipleBelts: [],
      selectedBelts: [],
    };
  },
  computed: {
    beltsList() {
      return this.$store.getters[`global/beltsList`];
    },
  },
  methods: {
    // confirm(data) {
    //   this.$store.commit(`${this.module}/belts`, data);
    // },
    repeat() {
      this.belts = [...this.belts, { belt: null, date: null }];
    },
    removeItem(index) {
      if (this.belts.length > 1) {
        this.belts.splice(index, 1);
      }
    },
    onContext() {},
  },
  components: {
    CalendarIcon,
    ActivityIcon,
    XIcon,
    BCardCode,
    PlusIcon,
    CheckIcon,
    TrashIcon,
    PlusSquareIcon,
  },
  watch: {
    belts: {
      handler(newValue, oldValue) {
        // let selected = [];
        // newValue.forEach((b) => {
        //   selected = this.multipleBelts.filter((x) => x._id != b.belt);
        // });
        // console.warn("selected", selected);
        // this.multipleBelts = selected;
        // console.warn("this.multipleBelts", this.multipleBelts);
        let belts = JSON.parse(JSON.stringify(newValue));
        this.$store.commit(`${this.module}/belts`, belts);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
