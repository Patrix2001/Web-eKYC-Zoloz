import { BASE_URL, FACECAPTURE_INIT, FACECAPTURE_RESULT } from "../libraries";
import createHeader from "./createHeader";

const WEB_URL = process.env.WEB_URL;
// https://docs.zoloz.com/zoloz/saas/apireference/facecapture-initialize

const FaceCapture = () => {
  const init = async (serviceLevel) => {
    try {
      const url = FACECAPTURE_INIT;
      const id = new Date().getTime();

      const content = {
        bizId: `bizid_${id}`,
        metaInfo: "MOB_H5",
        userId: `userid_${id}`,
        h5ModeConfig: {
          completeCallbackUrl: `${WEB_URL}`,
          interruptCallbackUrl: `${WEB_URL}`,
        },
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
      const url = FACECAPTURE_RESULT;
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

export default FaceCapture;
