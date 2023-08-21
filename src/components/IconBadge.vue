<template>
  <a class="tags has-addons" :href="href">
    <span class="tag">{{ label }}</span>
    <span class="tag is-primary">
      <FontAwesomeIcon
        :icon="`fa-solid ${faIconClass}`"
      />
    </span>
  </a>
</template>

<script setup lang="ts">

defineProps<{
  label: string,
  faIconClass: string
  href: string
}
>()

</script>
