import IdRecoginize from "../../../utils/idRecognize";

export default async function handler(req, res) {
  const { docType } = req.body;
  const data = await IdRecoginize().init(docType);
  return res.status(200).json(data);
}
