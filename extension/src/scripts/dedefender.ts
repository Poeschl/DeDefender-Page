import DeDefenderService from "../../../src/service/DeDefenderService";
import browser from "webextension-polyfill";
import {Message} from "../models/Message";

const dedefenderService = new DeDefenderService()

const sendLinkToServiceWorker = (anchor: HTMLAnchorElement) => {
  browser.runtime.sendMessage({type: "storeData", data: anchor.href} as Message)
}

const getPageRootBody = (): HTMLElement => {
  //check for electron container
  const possibleIframeWrappers = document.getElementsByClassName("embedded-electron-webview")
  if (possibleIframeWrappers.length > 0) {
    const iframeWrapper = possibleIframeWrappers[0]
    if (iframeWrapper !== null && iframeWrapper.nodeName.toLowerCase() === "iframe") {
      // @ts-ignore: Object is possibly 'null'.
      return (iframeWrapper as HTMLIFrameElement).contentDocument.body
    } else {
      return window.document.body
    }
  } else {
    return window.document.body
  }
}

const findDefenderLinks = (): HTMLAnchorElement[] => {
  const anchorElements = Array.from(getPageRootBody().getElementsByTagName("a"))
  return anchorElements.filter(element => filterForValidLinks(element))
}

const filterForValidLinks = (anchor: HTMLAnchorElement): boolean => {
  if (anchor.href.length > 0) {
    const url = new URL(anchor.href)
    return url.host.endsWith("mcas-proxyweb.mcas.ms") && anchor.getAttribute("dedefended") !== "true" && anchor.target == "_blank"
  } else {
    return false
  }
}

const dedefendLinkNode = (linkElement: HTMLAnchorElement) => {
  if (!filterForValidLinks(linkElement)) {
    return
  }
  const input = linkElement.href
  const unwrap = dedefenderService.dedefendUrl(input)
  linkElement.href = unwrap
  console.debug(`DeDefend: ${input} -> ${unwrap}`)
}

const removeMSLinkListener = (linkElement: HTMLAnchorElement) => {
  // replace element with a clone to discard click handlers
  const anchorClone = linkElement.cloneNode(true) as HTMLAnchorElement
  anchorClone.setAttribute("dedefended", "true")
  linkElement.replaceWith(anchorClone)
}

const handleAnchor = (anchor: HTMLAnchorElement) => {
  dedefendLinkNode(anchor)
  removeMSLinkListener(anchor)
  sendLinkToServiceWorker(anchor)
}

const anchorObserverFunction = (mutations: MutationRecord[]) => {
  mutations
    .flatMap<Node>(mutation => {
      if (mutation.type == "childList") {
        return Array.from(mutation.addedNodes).filter(element => element.nodeName.toLowerCase() === "a")
      } else if (mutation.type == "attributes" && mutation.target.nodeName.toLowerCase() === "a") {
        return [mutation.target]
      }
      return []
    })
    .map(mutation => mutation as HTMLAnchorElement)
    .filter(anchor => filterForValidLinks(anchor))
    .forEach(element => {
      handleAnchor(element)
    })
  findDefenderLinks().forEach(anchor => {
    console.debug(`Detected leftover anchor "${anchor.href}"`)
    handleAnchor(anchor)
  })
}


const links = findDefenderLinks()
links.forEach(anchor => handleAnchor(anchor))

const observer = new MutationObserver(anchorObserverFunction)
console.debug(`Detected page root: ${JSON.stringify(getPageRootBody())}`)
observer.observe(getPageRootBody(), {attributes: true, attributeFilter: ["href"], childList: true, subtree: true})
