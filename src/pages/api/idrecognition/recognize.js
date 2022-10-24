import IdRecoginize from "../../../utils/idRecognize";

export default async function handler(req, res) {
  const { docType, frontPageImage, backPageImage } = req.body;
  const data = await IdRecoginize().scan(docType, frontPageImage, backPageImage);
  return res.status(200).json(data);
}
