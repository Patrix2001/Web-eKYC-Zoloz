import {
  BASE_URL,
  ID_RECOGNITION_OCR,
  ID_RECOGNITION_INIT,
  ID_RECOGNITION_RESULT,
  h5ModeConfig
} from "../libraries";
import createHeader from "./createHeader";


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
  const init = async (metaInfo, docType, serviceLevel) => {
    try {
      const url = ID_RECOGNITION_INIT;
      const id = new Date().getTime();

      const content = {
        bizId: `bizid_${id}`,
        metaInfo: metaInfo,
        userId: `userid_${id}`,
        docType: docType,
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
