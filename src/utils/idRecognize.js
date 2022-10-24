import {
  BASE_URL,
  ID_RECOGNITION_OCR,
  ID_RECOGNITION_INIT,
  ID_RECOGNITION_RESULT,
} from "../libraries";
import createHeader from "./createHeader";

const WEB_URL = process.env.WEB_URL;

const IdRecoginize = () => {
  const scan = async (docType, frontPageImage, backPageImage) => {
    try {
      const url = ID_RECOGNITION_OCR;
      const id = new Date().getTime();

      const content = {
        bizId: `bizid_${id}`,
        docType: docType,
        frontPageImage: frontPageImage,
      };

      if (backPageImage) {
        content["backPageImage"] = backPageImage;
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
  const init = async (docType) => {
    try {
      const url = ID_RECOGNITION_INIT;
      const id = new Date().getTime();

      const content = {
        bizId: `bizid_${id}`,
        metaInfo: "MOB_H5",
        userId: `userid_${id}`,
        docType: docType,
        h5ModeConfig: {
          completeCallbackUrl: `${WEB_URL}`,
          interruptCallbackUrl: `${WEB_URL}`,
        },
        serviceLevel: "IDRECOGNITION0002",
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
      const url = ID_RECOGNITION_RESULT;
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
    scan,
    init,
    result,
  };
};

export default IdRecoginize;
