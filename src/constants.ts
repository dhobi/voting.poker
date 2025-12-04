export const isDev =
  typeof global === "undefined"
    ? import.meta.env?.DEV ?? false
    : process && process.env.NODE_ENV === "development";

export const siteHost = isDev
  ? typeof location !== "undefined"
    ? location.host
    : "localhost:3000"
  : process.env.HOSTNAME;

export const BASE_URL = isDev ? `http://${siteHost}` : `https://${siteHost}`;

export const ablyKey = process.env.ABLYKEY;

export const giphyKey = process.env.GIPHYKEY;
