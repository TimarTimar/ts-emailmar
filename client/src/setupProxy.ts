import { Express } from "express";

const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app:Express) {
  app.use(
    ["/api", "/auth/google"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};