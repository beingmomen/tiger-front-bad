<template>
  <b-col lg="6" md="6" class="position-relative">
    <edit-icon
      @click="$emit('showRepeator')"
      size="1.5x"
      class="custom-class position-absolute"
      :class="dashDir == 'rtl' ? 'edit-time-line-rtl' : 'edit-time-line-ltr'"
    ></edit-icon>
    <b-card-code class="border border-2" :title="$t('cards.beltsTimeLine')">
      <app-timeline>
        <app-timeline-item
          v-for="(b, index) in getBelts"
          :key="index"
          :title="b.belt.name"
          :variant="b.belt.color"
        >
          <div
            class="
              d-flex
              flex-sm-row flex-column flex-wrap
              justify-content-between
              mb-1 mb-sm-0
            "
          >
            <h6>{{ b.belt.name }}</h6>
            <trash-icon
              @click="showMsgBoxTwo(b)"
              size="1.5x"
              class="custom-class text-danger"
            ></trash-icon>
          </div>
          <div
            class="
              d-flex
              flex-sm-row flex-column
              justify-content-between
              align-items-start
            "
          >
            <b-media>
              <template #aside>
                <small class="text-muted">{{
                  $moment(b.date).fromNow()
                }}</small>
              </template>
            </b-media>
          </div>
        </app-timeline-item>
      </app-timeline>
    </b-card-code>
  </b-col>
</template>

<script>
import AppTimeline from "~/@core/components/app-timeline/AppTimeline.vue";
import AppTimelineItem from "~/@core/components/app-timeline/AppTimelineItem.vue";
import { TrashIcon, EditIcon } from "vue-feather-icons";
import BCardCode from "~/@core/components/b-card-code/BCardCode.vue";
export default {
  props: {
    module: String,
  },
  data() {
    return {
      updateTimeLine: false,
    };
  },
  computed: {
    getBelts() {
      return this.$store.getters[`${this.module}/belts`];
    },
  },
  methods: {
    removeBelt(id) {
      console.warn("is", id);
    },
    showMsgBoxTwo(data) {
      this.$bvModal
        .msgBoxConfirm(`${this.$t("modals.delete_msg")}( ${data.belt.name} )`, {
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
            this.$store.dispatch(
              `${this.module}/removeBeltFromTimeLine`,
              data._id
            );
          }
        })
        .then(() => {});
    },
  },
  components: {
    AppTimeline,
    AppTimelineItem,
    TrashIcon,
    BCardCode,
    EditIcon,
  },
};
</script>

<style lang="scss" scoped>
.custom-class {
  cursor: pointer;
}
</style>
