import { BASE_URL, CONNECT_INIT, CONNECT_RESULT } from "../constants";
import createHeader from "./createHeader";

// https://docs.zoloz.com/zoloz/saas/apireference/connect

const ConnectAuth = () => {
  const init = async (metaInfo, sceneCode, serviceLevel) => {
    try {
      const url = CONNECT_INIT;
      const id = new Date().getTime();

      const content = {
        bizId: `bizid_${id}`,
        metaInfo: metaInfo,
        userId: `userid_${id}`,
        sceneCode: sceneCode,
        serviceLevel: serviceLevel,
      };

      const response = await fetch(BASE_URL + url, {
        method: "POST",
        body: JSON.stringify(content),
        headers: createHeader(url, content),
      });

      const data = await response.json();
      if (data.result.resultStatus === "S") {
        return data;
      }
      return { message: data.result.message, code: data.result.resultCode };
    } catch (error) {
      console.log(error);
    }
  };

  const result = async (transactionId) => {
    try {
      const url = CONNECT_RESULT;
      const id = new Date().getTime();

      const content = {
        bizId: `bizid_${id}`,
        transactionId: transactionId,
      };

      const response = await fetch(BASE_URL + url, {
        method: "POST",
        body: JSON.stringify(content),
        headers: createHeader(url, content),
      });

      const data = await response.json();
      if (data.result.resultStatus === "S") {
        return data;
      }
      return { message: data.result.message, code: data.result.resultCode };
    } catch (error) {
      console.log(error);
    }
  };

  return {
    init,
    result,
  };
};

export default ConnectAuth;
