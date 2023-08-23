<template>
  <h3>You dedefended {{ count }} links</h3>
  <ul>
    <li
      v-for="link in list"
      :key="link"
    >
      {{ link }}
    </li>
  </ul>
</template>

<script setup lang="ts">

import browser from "webextension-polyfill";
import {onMounted, ref} from "vue";
import {Message} from "../models/Message";

const count = ref<number>(0)
const list = ref<string[]>([])

onMounted(() => {
  browser.runtime.sendMessage({type: "retrieveData", data: ""} as Message)
    .then((response: Message) => {
      const linkList: string[] = JSON.parse(response.data)
      count.value = linkList.length
      list.value = linkList
    })
})
</script>

<style>

</style>
