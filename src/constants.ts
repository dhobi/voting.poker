export const isDev =
  typeof global === "undefined"
    ? import.meta.env?.DEV ?? false
    : process && process.env.NODE_ENV === "development";

export const siteHost = isDev
  ? typeof location !== "undefined"
    ? location.host
    : "localhost:3000"
  : 'voting.danielhobi.ch'; //process.env.HOSTNAME not given, used in frontend directly

export const BASE_URL = isDev ? `http://${siteHost}` : `https://${siteHost}`;

export const ablyKey = 'HwJv2w.DsN0YA:oTLUBQ1wv_4HEl-BGzyzmpHVY8b65_xpdEErHGjcMZM'; //process.env.ABLYKEY not given, used in frontend directly

export const giphyKey = 'ryZAHa7ppKnf7QJaIuxA5ws2BRPVNyMp'; //process.env.GIPHYKEY not given, used in frontend directly
