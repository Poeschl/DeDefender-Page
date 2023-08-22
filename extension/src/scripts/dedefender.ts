import DeDefenderService from "../../../src/service/DeDefenderService";

const dedefenderService = new DeDefenderService()

const findDefenderLinks = (): HTMLAnchorElement[] => {
  const anchorElements = Array.from(document.getElementsByTagName("a"))
  return anchorElements.filter(element => filterForValidLinks(element))
}

const filterForValidLinks = (anchor: HTMLAnchorElement): boolean => {
  if (anchor.href.length > 0) {
    const url = new URL(anchor.href)
    return url.host.endsWith("mcas-proxyweb.mcas.ms")
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
  const anchorClone = linkElement.cloneNode(true)
  linkElement.replaceWith(anchorClone)
}

const links = findDefenderLinks()
links.forEach(anchor => dedefendLinkNode(anchor))

const observer = new MutationObserver(mutations => {
  mutations
    .filter(mutation => mutation.target.nodeName.toLowerCase() == "a")
    .map(mutation => mutation.target as HTMLAnchorElement)
    .forEach(element => {
      dedefendLinkNode(element)
      removeMSLinkListener(element)
    })
})
observer.observe(window.document.body, {attributes: true, childList: true, subtree: true})
