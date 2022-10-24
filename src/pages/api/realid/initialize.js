import RealId from "../../../utils/realId";

export default async function handler(req, res) {
  const { docType } = req.body;
  const data = await RealId().init(docType);
  return res.status(200).json(data);
}
