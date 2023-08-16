<template>
  <div>
    <NavBar class="mb-5"/>
    <main class="container">
      <div class="is-flex is-justify-content-center is-flex-direction-column">
        <TextBoxInput
          help="Here is the place for the copied link from Office365 or MS Teams."
          label="Defender Link"
          placeholder="Insert Defender Link here."
          value=""
          class="is-flex-grow-1"
          @update:value="linkChange"
        />
        <button
          class="button is-primary"
          :disabled="buttonDisabled"
          @click="goToClick"
        >
          {{ buttonText }}
        </button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import TextBoxInput from "@/components/TextBoxInput.vue";
import {computed, ref} from "vue";

const redirectUrl = ref<string | null>(null)
const buttonDisabled = computed<boolean>(() => redirectUrl.value == null)
const buttonText = computed<string>(() => {
  if (redirectUrl.value !== null) {
    return `Goto ${redirectUrl.value}`
  } else {
    return "Insert URL first"
  }
})

const linkChange = (value: string) => {

  if (value.startsWith("http")) {
    const result = dedefendUrl(value)

    if (result.length > 0) {
      redirectUrl.value = result
    } else {
      redirectUrl.value = null
    }
  } else {
    redirectUrl.value = null
  }
}

const goToClick = () => {
  if (redirectUrl.value !== null) {
    window.open(redirectUrl.value, "_blank")
  }
}

const dedefendUrl = (url: string): string => {

  const originalUrl = getDecodedUrlFromParameter(url, "originalUrl")

  if (originalUrl.length > 0) {
    if (originalUrl.startsWith("https://eur01.safelinks.protection.outlook.com.mcas.ms")) {
      return getDecodedUrlFromParameter(originalUrl, "url")
    } else {
      return originalUrl
    }
    // clear a remaining McasTsid
  } else {
    return url
  }
}

const getDecodedUrlFromParameter = (url: string, parameter: string, defaultValue: string = ""): string => {
  const urlParams = new URLSearchParams(url)
  const paramValue = urlParams.get(parameter) || defaultValue
  return decodeURI(paramValue)
}

</script>
