import docTypes from "./docTypes";
import captureLevel from "./captureLevel";
import h5ModeConfig from "./h5ModeConfig";
import recognitionLevel from "./recognitionLevel";
import { realIdLevel, operationMode } from "./realId";

const BASE_URL = "https://sg-sandbox-api.zoloz.com";

const REAL_ID_INIT = "/api/v1/zoloz/realid/initialize";
const REAL_ID_RESULT = "/api/v1/zoloz/realid/checkresult";

const FACECAPTURE_INIT = "/api/v1/zoloz/facecapture/initialize";
const FACECAPTURE_RESULT = "/api/v1/zoloz/facecapture/checkresult";

const ID_RECOGNITION_OCR = "/api/v1/zoloz/idrecognition/recognize";
const ID_RECOGNITION_INIT = "/api/v1/zoloz/idrecognition/initialize";
const ID_RECOGNITION_RESULT = "/api/v1/zoloz/idrecognition/checkresult";

const CONNECT_ENROLL = "/api/v1/zoloz/connect/enroll";
const CONNECT_INIT = "/api/v1/zoloz/connect/initialize";
const CONNECT_RESULT = "/api/v1/zoloz/connect/checkresult";

export {
  BASE_URL,
  CONNECT_ENROLL,
  CONNECT_INIT,
  CONNECT_RESULT,
  REAL_ID_INIT,
  REAL_ID_RESULT,
  FACECAPTURE_INIT,
  FACECAPTURE_RESULT,
  ID_RECOGNITION_OCR,
  ID_RECOGNITION_INIT,
  ID_RECOGNITION_RESULT,
  captureLevel,
  docTypes,
  h5ModeConfig,
  recognitionLevel,
  realIdLevel,
  operationMode,
};
