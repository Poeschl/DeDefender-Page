<template>
  <div class="field">
    <label class="label">{{ props.label }}</label>
    <div class="control">
      <textarea
        class="textarea is-small"
        :placeholder="props.placeholder"
        :value="value"
        :autofocus="props.autofocus"
        @input="updateValue(($event.target as HTMLInputElement).value)"
      />
    </div>
    <p
      v-if="props.help.length > 0"
      class="help"
    >
      {{ props.help }}
    </p>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const props = defineProps<{
  label: string,
  placeholder: string,
  value: any,
  help: string,
  autofocus: boolean
}>()

const emit = defineEmits<{
  (e: 'update:value', val: string): void
}>()

const value = ref(props.value)

const updateValue = (newValue: string) => {
  value.value = newValue
  emit('update:value', newValue)
}
</script>

<style scoped>

</style>
