import { createServer } from "http";
import fs from "fs";
import next from "next";
import * as path from "path";
import { parse } from "url";
import { logToFile } from "./src/utils/logger";

const X_CORRELATION_ID = "x-correlation-id";

export const generateId = () => crypto.randomUUID();
const dir = path.join(__dirname);
const dev = process.env.NODE_ENV !== "production";
const hostname = "0.0.0.0";
const port = parseInt(process.env.PORT || "3000", 10);

const nextApp = next({ dev, dir, hostname, port });
const handle = nextApp.getRequestHandler();

if (!fs.existsSync(path.join(process.cwd(), "logs"))) {
  fs.mkdirSync(path.join(process.cwd(), "logs"));
}

nextApp.prepare().then(() => {
  createServer((req, res) => {
    req.headers[X_CORRELATION_ID] = crypto.randomUUID();
    const parsedUrl = parse(req.url ?? "", true);
    handle(req, res, parsedUrl);
  }).listen(port);

  logToFile("================new line==================");

  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? "development" : process.env.NODE_ENV
    }`
  );
});
