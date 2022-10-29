import { RealId } from "../../../helpers";

export default async function handler(req, res) {
  const { metaInfo, docType, serviceLevel, operationMode } = req.body;
  const data = await RealId().init(
    metaInfo,
    docType,
    serviceLevel,
    operationMode
  );
  return res.status(200).json(data);
}
