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
              <b-input-group class="input-group-merge">
                <b-input-group-prepend is-text class="h-35 w-13">
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
            <b-form-group label="Belt Date">
              <b-input-group class="input-group-merge">
                <b-input-group-prepend is-text style="height: 35px">
                  <calendar-icon
                    size="1.5x"
                    class="custom-class"
                  ></calendar-icon>
                </b-input-group-prepend>
                <b-form-input
                  style="height: 35px"
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
          <b-col
            lg="1"
            md="1"
            sm="1"
            class="mb-50 d-flex justify-content-center align-items-center"
          >
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
