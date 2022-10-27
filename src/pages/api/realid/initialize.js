import { RealId } from "../../../utils";

export default async function handler(req, res) {
  const { docType, serviceLevel, operationMode } = req.body;
  const data = await RealId().init(docType, serviceLevel, operationMode);
  return res.status(200).json(data);
}
