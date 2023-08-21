export default class DeDefenderService {
  dedefendUrl = (url: string): string => {
    let originalUrl: URL;

    try {
      originalUrl = this.getDecodedUrlFromParameter(new URL(url), "originalUrl")
    } catch (e) {
      return ""
    }

    if (originalUrl.host.length > 0) {
      let realUrl: URL
      if (originalUrl.host.endsWith("safelinks.protection.outlook.com.mcas.ms")) {
        realUrl = this.getDecodedUrlFromParameter(originalUrl, "url")
        originalUrl.searchParams.forEach((value, key) => {
          if (key != "url")
            realUrl.searchParams.set(key, value)
        })
      } else {
        realUrl = originalUrl
      }

      realUrl.searchParams.delete("McasTsid")
      this.removeDefenderDomain(realUrl)

      return realUrl.toString()
    } else {
      return url
    }
  }

  private getDecodedUrlFromParameter = (url: URL, parameter: string, defaultValue: string = ""): URL => {
    const paramValue = url.searchParams.get(parameter) || defaultValue
    return new URL(paramValue)
  }
  private removeDefenderDomain = (url: URL) => {
    if (url.host.endsWith("mcas.ms")) {
      url.host = url.host.substring(0, url.host.indexOf(".mcas.ms"))
    }
  }
}
