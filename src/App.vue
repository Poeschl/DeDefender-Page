<template>
  <div>
    <NavBar class="mb-5"/>
    <main class="container">
      <div class="is-flex is-flex-direction-column">
        <TextBoxInput
          help="Here is the place for the copied link from Office365 or MS Teams."
          label="Defender Link"
          placeholder="Insert Defender Link here."
          value=""
          class="is-flex-grow-1"
          :autofocus="true"
          @update:value="linkChange"
        />
        <button
          class="button is-primary"
          :disabled="buttonDisabled"
          @click="goToClick"
        >
          <span>{{ buttonText }}</span>
          <span
            v-if="!buttonDisabled"
            class="icon is-small"
          >
            <FontAwesomeIcon
              icon="fa-solid fa-up-right-from-square"
            />
          </span>
        </button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import TextBoxInput from "@/components/TextBoxInput.vue";
import {computed, ref} from "vue";
import DeDefenderService from "@/service/DeDefenderService";

const dedefenderService = new DeDefenderService()

const redirectUrl = ref<string | null>(null)
const buttonDisabled = computed<boolean>(() => redirectUrl.value == null)
const buttonText = computed<string>(() => {
  if (redirectUrl.value !== null) {
    return `Goto ${redirectUrl.value}`
  } else {
    return "No defended url detected"
  }
})

const linkChange = (value: string) => {

  if (value.startsWith("http")) {
    const result = dedefenderService.dedefendUrl(value)

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



</script>
