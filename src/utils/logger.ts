import * as winston from "winston";

// Define log levels
const logLevels = {
  levels: {
    info: 0,
    warn: 1,
    error: 2,
  },
  colors: {
    info: "green",
    warn: "yellow",
    error: "red",
  },
};

// Create a Winston logger instance
const logger = winston.createLogger({
  level: "info",
  levels: logLevels.levels,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({ filename: "app.log" }),
  ],
});

// Apply colors to levels
winston.addColors(logLevels.colors);

// Define log level functions
const log = {
  info: (message: string) => logger.info(message),
  warn: (message: string) => logger.warn(message),
  error: (message: string) => logger.error(message),
};

export default log;
