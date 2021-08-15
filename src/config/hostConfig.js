const configObj = {
  apiProtocol: process.env.NODE_ENV === "production" ? "https" : "http",
  portname: process.env.NODE_ENV === "production" ? "" : "3005",
  baseApiPort: process.env.NODE_ENV === "production" ? "" : ":3000",
  origin: process.env.NODE_ENV === "production" ? "" : "http://localhost:3010/",
  apiBaseUrl:
    process.env.NODE_ENV === "production"
     // ? `http://34.206.89.164:3000` /*live server client `http://18.221.19.48:3000` */
      ? `http://18.221.19.48:3000` /*live server client `http://18.221.19.48:3000` */
      : "http://localhost:3000"
};
module.exports = configObj;
