//const { createProxyMiddleware } = require("http-proxy-middleware");
const proxy = require("http-proxy-middleware");
/*
const apiProxy = createProxyMiddleware({
  target: "http://localhost:3000",
  changeOrigin: true,
});
*/

module.exports = function (app) {
  //app.use(proxy("/api", { target: "http://localhost:5000" }));
  //  app.use(proxy("/api2", { target: "http://localhost:8081/" }));
};
