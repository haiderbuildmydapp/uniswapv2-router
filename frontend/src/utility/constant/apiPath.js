import env from "../../environment";
export const APIPath = {
  server: env.BACKEND_BASE_URL,
  moralisServer: "https://nbnob0befkpo.usemoralis.com:2053/server",

  //admin
  login: "login",
  logout: "blacklist-token",
  auth: "auth",
  updatePassword: "update-password",
  updateUsername: "update-username",

  //cmc
  priceConversion: "convert-price",

  getConfig: "get-config",
};
