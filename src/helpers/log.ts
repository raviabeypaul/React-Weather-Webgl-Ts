const stringify = (arg: any) => JSON.stringify(arg, null, 2);

export const info = console.log;

export const error = console.error;

export const warn = console.warn;

export const log = (...args: any[]) => info(...args.map(stringify));

export const infoLog = async (message, data) => {
  info(message, stringify(data));
};

export const errorLog = async (message, data) => {
  error(message, stringify(data));
};

export const getLogLevelEmoji = async logType => {
  console.log("logType => ", logType);
  let emojiCode = "";

  if (logType == "ALERT") {
    emojiCode = ":red_circle: ";
  } else if (logType == "CRITICAL") {
    emojiCode = ":large_purple_circle: ";
  } else if (logType == "ERROR") {
    emojiCode = ":red_circle: ";
  } else if (logType == "WARNING") {
    emojiCode = ":large_orange_circle: ";
  } else if (logType == "NOTICE") {
    emojiCode = ":white_circle: ";
  } else if (logType == "INFO") {
    emojiCode = ":large_blue_circle: ";
  } else if (logType == "DEBUG") {
    emojiCode = ":large_green_circle: ";
  } else if (logType == "ACCOUNT-INFO") {
    emojiCode = ":large_yellow_circle: ";
  } else {
    emojiCode = ":red_circle: ";
  }

  return emojiCode;
};
