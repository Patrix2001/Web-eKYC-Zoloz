import { IdRecoginize } from "../../../utils";

export default async function handler(req, res) {
  const { docType, serviceLevel } = req.body;
  const data = await IdRecoginize().init(docType, serviceLevel);
  return res.status(200).json(data);
}
