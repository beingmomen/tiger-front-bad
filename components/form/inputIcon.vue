<template>
  <b-col :lg="lg" :md="md" :sm="sm" class="mb-1 custom-form">
    <b-form-group
      :label-class="{ 'label-required': required }"
      :label="label"
      label-for="vi-first-name"
    >
      <b-input-group class="input-group-merge">
        <b-input-group-prepend is-text>
          <slot name="icon"></slot>
        </b-input-group-prepend>
        <b-form-input
          style="height: 35px"
          id="vi-first-name"
          :placeholder="label"
          v-model="getContent"
          :disabled="disabled"
          :type="type"
        />
      </b-input-group>
    </b-form-group>
  </b-col>
</template>

<script>
export default {
  props: {
    label: String,
    module: String,
    storeKey: String,
    required: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "text",
    },
    rule: {
      type: String,
      default: "required",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    lg: {
      type: String,
      default: "6",
    },
    md: {
      type: String,
      default: "6",
    },
    sm: {
      type: String,
      default: "12",
    },
  },
  computed: {
    getContent: {
      get: function () {
        return this.$store.getters[`${this.module}/${this.storeKey}`];
      },
      set(val) {
        this.$store.commit(`${this.module}/${this.storeKey}`, {
          key: this.storeKey,
          value: val,
        });
      },
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
