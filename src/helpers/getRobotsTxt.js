export default (requestContext) =>
  `User-agent: *
Sitemap: https://${requestContext.hostname}/api/sitemap.xml
Host: https://${requestContext.hostname}
Allow: /
Disallow: /product/
Disallow: /cart
Disallow: /tracker

User-agent: Googlebot-Mobile
User-Agent: YahooSeeker/M1A1-R2D2
User-Agent: MSNBOT_Mobile
User-Agent: YandexMobileBot
Allow: /product/`