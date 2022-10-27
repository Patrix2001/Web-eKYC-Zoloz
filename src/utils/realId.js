import { BASE_URL, REAL_ID_INIT, REAL_ID_RESULT } from "../libraries";
import createHeader from "./createHeader";

const WEB_URL = process.env.WEB_URL;

const RealId = () => {
  const init = async (docType, serviceLevel, operationMode) => {
    try {
      const url = REAL_ID_INIT;
      const id = new Date().getTime();

      const content = {
        bizId: `bizid_${id}`,
        metaInfo: "MOB_H5",
        flowType: "H5_REALIDLITE_KYC",
        userId: `userid_${id}`,
        docType: docType,
        h5ModeConfig: {
          completeCallbackUrl: `${WEB_URL}`,
          interruptCallbackUrl: `${WEB_URL}`,
        },
        serviceLevel: serviceLevel,
        operationMode: operationMode
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
      const url = REAL_ID_RESULT;
      const id = new Date().getTime();

      const content = {
        bizId: `bizid_${id}`,
        transactionId: transactionId,
        isReturnImage: "Y",
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

export default RealId;
