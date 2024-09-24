import fs from "fs";
import path from "path";

type LogType = "success" | "fail" | "info";

const createLogFileName = () => {
  const now = new Date();
  return `${now.getFullYear()}-${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}.log`;
};

const logFileName = createLogFileName();
const logFilePath = path.join(process.cwd(), "logs", logFileName);

export const logToFile = (message: string, logType: LogType = "info") => {
  const logMessage = `[${logType}] ${message}\n`;
  fs.appendFileSync(logFilePath, logMessage);
};
