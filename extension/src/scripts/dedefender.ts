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
  const anchorClone = linkElement.cloneNode(true) as HTMLAnchorElement
  anchorClone.setAttribute("dedefended", "true")
  linkElement.replaceWith(anchorClone)
}

const handleAnchor = (anchor: HTMLAnchorElement) => {
  dedefendLinkNode(anchor)
  removeMSLinkListener(anchor)
}

const links = findDefenderLinks()
links.forEach(anchor => handleAnchor(anchor))

const observer = new MutationObserver(mutations => {
  mutations
    .flatMap<Node>(mutation => {
      if (mutation.type == "childList") {
        return Array.from(mutation.addedNodes).filter(element => element.nodeName.toLowerCase() == "a")
      } else if (mutation.type == "attributes" && mutation.target.nodeName.toLowerCase() == "a") {
        return [mutation.target]
      }
      return []
    })
    .map(mutation => mutation as HTMLAnchorElement)
    .filter(anchor => anchor.getAttribute("dedefended") !== "true")
    .forEach(element => handleAnchor(element))
})
observer.observe(window.document.body, {childList: true, subtree: true})
