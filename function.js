/* eslint-disable no-undef */
const { https } = require("firebase-functions");
const { default: next } = require("next");
const isProd = process.env.NODE_ENV !== "development";

const server = next({
  dev: !isProd,
  conf: { distDir: ".next" },
});

const nextjsHandle = server.getRequestHandler();

exports.nextServer = https.onRequest((req, res) => {
  return server.prepare().then(() => nextjsHandle(req, res));
});
