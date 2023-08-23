import browser from "webextension-polyfill";
import {Message} from "../models/Message";

const dedefendedLinks = {}

browser.runtime.onMessage.addListener((message: Message, sender, sendResponse: (string) => void) => {
  console.info(`Retrieve: ${JSON.stringify(message)} from ${JSON.stringify(sender)}`)

  if (message.type === "retrieveData") {
    let links = dedefendedLinks[sender.tab?.id]

    if (links === null) {
      links = []
    }

    sendResponse({type: "respondData", data: JSON.stringify(links)})

  } else if (message.type === "storeData") {
    let existing = dedefendedLinks[sender.tab?.id]

    if (existing === null) {
      existing = []
    }

    existing.push(message.data)
    dedefendedLinks[sender.tab?.id] = existing
  }
})
