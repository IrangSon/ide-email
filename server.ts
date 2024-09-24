import { createServer } from "http";
import next from "next";
import * as path from "path";
import { parse } from "url";

const X_CORRELATION_ID = "x-correlation-id";

export const generateId = () => crypto.randomUUID();
const dir = path.join(__dirname);
const dev = process.env.NODE_ENV !== "production";
const hostname = "0.0.0.0";
const port = parseInt(process.env.PORT || "3000", 10);

const nextApp = next({ dev, dir, hostname, port });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  createServer((req, res) => {
    req.headers[X_CORRELATION_ID] = crypto.randomUUID();
    const parsedUrl = parse(req.url ?? "", true);
    handle(req, res, parsedUrl);
  }).listen(port);

  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? "development" : process.env.NODE_ENV
    }`
  );
});
