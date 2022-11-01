import {
  BASE_URL,
  REAL_ID_INIT,
  REAL_ID_RESULT,
  h5ModeConfig,
} from "../constants";
import createHeader from "./createHeader";
import ConnectAuth from "./connectAuth";

const RealId = () => {
  const init = async (metaInfo, docType, serviceLevel, operationMode) => {
    try {
      const url = REAL_ID_INIT;
      const id = new Date().getTime();

      const content = {
        bizId: `bizid_${id}`,
        metaInfo: metaInfo,
        userId: `userid_${id}`,
        docType: docType,
        serviceLevel: serviceLevel,
        operationMode: operationMode,
      };

      if (metaInfo === "MOB_H5") {
        //must add configuration mode H5
        content["h5ModeConfig"] = h5ModeConfig;
        content["flowType"] = "H5_REALIDLITE_KYC";
      } else {
        content["flowType"] = "REALIDLITE_KYC";
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

      //Upload Image
      await ConnectAuth().enroll(data["extFaceInfo"]["faceImg"]);

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
