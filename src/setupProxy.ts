import { createProxyMiddleware } from "http-proxy-middleware";

module.exports = function (app: any) {
  app.use(
    "/proxy",
    createProxyMiddleware({
      target: "http://server-hosting-m3u8-file-and-video-segments.com",
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        "^/proxy": "" // remove the "/proxy" prefix from the request URL
      }
    })
  );
};
