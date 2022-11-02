import {
  BASE_URL,
  FACECAPTURE_INIT,
  FACECAPTURE_RESULT,
  h5ModeConfig,
} from "../constants";
import createHeader from "./createHeader";
import ConnectAuth from "./connectAuth";

// https://docs.zoloz.com/zoloz/saas/apireference/facecapture-initialize

const FaceCapture = () => {
  const init = async (metaInfo, serviceLevel) => {
    try {
      const url = FACECAPTURE_INIT;
      const id = new Date().getTime();

      const content = {
        bizId: `bizid_${id}`,
        metaInfo: metaInfo,
        userId: `userid_${id}`,
        serviceLevel: serviceLevel,
      };

      if (metaInfo === "MOB_H5") {
        //must add configuration mode H5
        content["h5ModeConfig"] = h5ModeConfig;
      }

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

      //Upload Image
      await ConnectAuth().enroll(`data:image/jpeg;base64,${data["extInfo"]["imageContent"]}`);

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
