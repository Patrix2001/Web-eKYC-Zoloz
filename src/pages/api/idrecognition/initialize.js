import { IdRecoginize } from "../../../helpers";

export default async function handler(req, res) {
  const { metaInfo, docType, serviceLevel } = req.body;
  const data = await IdRecoginize().init(metaInfo, docType, serviceLevel);
  return res.status(200).json(data);
}
