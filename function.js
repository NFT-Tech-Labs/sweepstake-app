/* eslint-disable no-undef */
import { https } from "firebase-functions";
import next from "next";
const isProd = process.env.NODE_ENV !== "development";

const server = next({
  dev: !isProd,
  conf: { distDir: ".next" },
});

const nextjsHandle = server.getRequestHandler();

exports.nextServer = https.onRequest((req, res) => {
  return server.prepare().then(() => nextjsHandle(req, res));
});
