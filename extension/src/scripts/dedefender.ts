import DeDefenderService from "../../../src/service/DeDefenderService";

const dedefenderService = new DeDefenderService()

const findDefenderLinks = (): HTMLAnchorElement[] => {
  const anchorElements = Array.from(document.getElementsByTagName("a"))
  return anchorElements.filter(element => {
    if (element.href.length > 0) {
      const url = new URL(element.href)
      return url.host.endsWith("mcas-proxyweb.mcas.ms")
    } else {
      return false
    }
  })
}

const dedefendLinkNode = (linkElement: HTMLAnchorElement) => {
  const input = linkElement.href
  const unwrap = dedefenderService.dedefendUrl(input)
  linkElement.href = unwrap
  console.debug(`DeDefend: ${input} -> ${unwrap}`)
}

const links = findDefenderLinks()
links.forEach(anchor => dedefendLinkNode(anchor))

const observer = new MutationObserver(() => {
  const links = findDefenderLinks()
  links.forEach(anchor => dedefendLinkNode(anchor))
})
observer.observe(window.document.body, {attributes: true, attributeFilter: ["href"], childList: true, subtree: true})
