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
        <div class="field is-grouped is-flex is-justify-content-center is-flex-direction-row">
          <div class="control">
            <IconBadge
              fa-icon-class="fa-brands fa-chrome"
              label="Download Chrome Extension"
              href="https://github.com/Poeschl/DeDefender/raw/gh-pages/DeDefender.crx"
            />
          </div>
          <div class="control">
            <IconBadge
              fa-icon-class="fa-brands fa-firefox"
              label="Download FireFox Addon"
              href="https://github.com/Poeschl/DeDefender/raw/gh-pages/DeDefender.xpi"
            />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import TextBoxInput from "@/components/TextBoxInput.vue";
import {computed, ref} from "vue";
import DeDefenderService from "@/service/DeDefenderService";
import IconBadge from "@/components/IconBadge.vue";

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

<style scoped lang="scss">
.field.is-grouped {
  margin-top: 3rem;
}
</style>
