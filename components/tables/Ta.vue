<template>
  <b-card-code no-body>
    <div v-if="getItems.length">
      <b-card-body>
        <div class="d-flex justify-content-end flex-wrap">
          <!-- sorting  -->
          <b-form-group
            v-if="sort"
            label="Sort"
            label-size="sm"
            label-align-sm="left"
            label-cols-sm="2"
            label-for="sortBySelect"
            class="mr-1 mb-md-0"
          >
            <b-input-group size="sm">
              <b-form-select
                id="sortBySelect"
                v-model="sortBy"
                :options="sortOptions"
              >
                <template #first>
                  <option value="">none</option>
                </template>
              </b-form-select>
              <b-form-select v-model="sortDesc" size="sm" :disabled="!sortBy">
                <option :value="false">Asc</option>
                <option :value="true">Desc</option>
              </b-form-select>
            </b-input-group>
          </b-form-group>

          <!-- filter -->
          <b-form-group v-if="search" class="mb-0">
            <b-input-group size="md">
              <b-form-input
                class="rounded-end"
                id="filterInput"
                v-model="filter"
                type="search"
                placeholder="Type to Search"
                @input="change"
              />
              <b-input-group-append>
                <b-button
                  class="search-btn-table rounded-end"
                  :disabled="!filter"
                  @click="searchData()"
                >
                  Search
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
          <b-button
            v-if="create"
            :to="$route.path + '/create'"
            class="ms-4"
            variant="primary"
          >
            <span class="text-nowrap text-capitalize">add {{ title }}</span>
          </b-button>
        </div>
      </b-card-body>

      <b-table
        striped
        hover
        responsive
        class="position-relative"
        :current-page="currentPage"
        :items="getItems"
        :fields="headers"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
      >
        <template #cell(avatar)="data">
          <b-avatar class="avatar-table" :src="data.value" />
        </template>
        <template #cell(cover)="data">
          <b-avatar class="avatar-table" :src="data.value" />
        </template>
        <template #cell(status)="data">
          <b-badge :variant="status[1][data.value]">
            {{ status[0][data.value] }}
          </b-badge>
        </template>

        <template #cell(actions)="data">
          <nuxt-link
            v-if="update"
            :to="`${$route.path}/${data.item.slug}-${data.item._id}`"
          >
            <edit-icon
              size="1.5x"
              class="custom-class text-primary"
            ></edit-icon>
          </nuxt-link>
          <trash-icon
            @click="showMsgBoxTwo(data)"
            size="1.5x"
            class="custom-clas mr-50 text-danger"
          ></trash-icon>
        </template>
      </b-table>

      <b-card-body class="d-flex justify-content-end flex-wrap pt-0">
        <!-- page length -->
        <b-form-group
          v-if="pageLength"
          label="Per Page"
          label-cols="6"
          label-align="left"
          label-size="sm"
          label-for="sortBySelect"
          class="text-nowrap mb-md-0 mr-1"
        >
          <b-form-select
            id="perPageSelect"
            v-model="perPage"
            size="sm"
            inline
            :options="pageOptions"
          />
        </b-form-group>

        <!-- pagination -->
        <div v-if="pagination">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalItems"
            :per-page="perPage"
            align="center"
            size="sm"
            class="my-0"
          />
        </div>
      </b-card-body>
    </div>
    <div
      v-else
      class="card align-items-center justify-content-center"
      style="height: calc(100vh - 260px)"
    >
      <lottie-player
        src="https://assets9.lottiefiles.com/packages/lf20_gvpcpv48.json"
        class="lottie-container"
        background="transparent"
        speed="1"
        style="width: 500px; height: 500px"
        loop
        autoplay
      ></lottie-player>
      <b-button
        v-if="create"
        :to="$route.path + '/create'"
        class="ms-4"
        variant="primary"
      >
        <span class="text-nowrap text-capitalize">add {{ title }}</span>
      </b-button>
    </div>
  </b-card-code>
</template>

<script>
import BCardCode from "~/@core/components/b-card-code/BCardCode.vue";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreVerticalIcon,
  EditIcon,
  TrashIcon,
} from "vue-feather-icons";
export default {
  props: {
    headers: Array,
    module: String,
    title: String,
    notId: {
      type: Boolean,
      default: true,
    },
    create: {
      type: Boolean,
      default: true,
    },
    update: {
      type: Boolean,
      default: true,
    },
    sort: {
      type: Boolean,
      default: false,
    },
    search: {
      type: Boolean,
      default: true,
    },
    pageLength: {
      type: Boolean,
      default: false,
    },
    pagination: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    BCardCode,
    ChevronLeftIcon,
    ChevronRightIcon,
    MoreVerticalIcon,
    EditIcon,
    TrashIcon,
  },
  data() {
    return {
      perPage: 10,
      pageOptions: [3, 5, 10],
      totalRows: 1,
      currentPage: 1,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },

      /* eslint-disable global-require */

      /* eslint-disable global-require */
      status: [
        {
          1: "Current",
          2: "Professional",
          3: "Rejected",
          4: "Resigned",
          5: "Applied",
        },
        {
          1: "light-primary",
          2: "light-success",
          3: "light-danger",
          4: "light-warning",
          5: "light-info",
        },
      ],
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => ({ text: f.label, value: f.key }));
    },
    getItems() {
      return this.$store.getters[`${this.module}/getAllData`];
    },
    totalItems() {
      return this.$store.getters[`${this.module}/getTotalItems`];
    },
  },
  methods: {
    showMsgBoxTwo(data) {
      this.$bvModal
        .msgBoxConfirm(`${this.$t("modals.delete_msg")}( ${data.item.name} )`, {
          title: this.$t("modals.delete_confirm"),
          size: "sm",
          okVariant: "primary",
          okTitle: this.$t("buttons.yes"),
          cancelTitle: this.$t("buttons.no"),
          cancelVariant: "outline-secondary",
          hideHeaderClose: false,
          centered: false,
        })
        .then((value) => {
          if (value) {
            this.$store
              .dispatch(`${this.module}/deleteFromDB`, data.item._id)
              .then((res) => {
                this.$nuxt.refresh();
                this.$toast.success("Deleted Successfully");
              });
          }
        })
        .then(() => {});
    },
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    searchData() {
      this.$store.dispatch(`${this.module}/getDataByQuery`, {
        page: this.currentPage,
        search: this.filter,
      });
    },
    change() {
      if (!this.filter) {
        this.searchData();
      }
    },
  },
  watch: {
    currentPage(newValue, oldValue) {
      this.$store.dispatch(`${this.module}/getDataByQuery`, {
        page: newValue,
        search: this.filter,
      });
    },
  },
};
</script>


<style lang="scss" scoped>
.filterInput {
  margin-top: 5px;
}
</style>
