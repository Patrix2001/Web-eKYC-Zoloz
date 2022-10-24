import moment from "moment";
import fs from "fs";
import path from "path";
import crypto from "node:crypto";

const createHeader = (url, body) => {
  const key = fs.readFileSync(
    path.join(process.cwd(), "./merchant_private_key.pem"),
    "utf8"
  );

  const timestamp = moment(new Date().getTime()).format(
    "YYYY-MM-DDTHH:mm:ssZZ"
  );
  const content = `POST ${url}\n${
    process.env.CLIENT_ID
  }.${timestamp}.${JSON.stringify(body)}`;

  //Format:: https://docs.zoloz.com/zoloz/saas/apireference/sign_validate#zZVxl
  const signature = crypto.sign("SHA256", content, key).toString("base64");

  return {
    "Content-Type": "application/json; charset=UTF-8",
    "Client-Id": process.env.CLIENT_ID,
    "Request-Time": timestamp,
    Signature: `algorithm=RSA256, signature=${encodeURIComponent(signature)}`,
  };
};

export default createHeader;
