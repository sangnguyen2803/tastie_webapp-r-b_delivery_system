const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/v1/api/auth", {
      target: "http://157.230.243.92:3007/",
    })
  );
  app.use(
    createProxyMiddleware("/v1/api/provider", {
      target: "http://157.230.243.92:3008/",
    })
  );
  app.use(
    createProxyMiddleware("/v1/api/tastie/provider", {
      target: "http://157.230.243.92:3008/",
    })
  );
  app.use(
    createProxyMiddleware("/v1/api/tastie", {
      target: "http://157.230.243.92:3007/",
    })
  );
  app.use(
    createProxyMiddleware("/upload", {
      target: "http://157.230.243.92:3777/",
    })
  );

  // app.use(
  //   createProxyMiddleware("/socket.io", {
  //     target: "http://localhost:3015/",
  //   })
  // );
};
