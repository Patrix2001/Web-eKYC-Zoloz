import { FaceCapture } from "../../../utils";

export default async function handler(req, res) {
  const { metaInfo, serviceLevel } = req.body;
  const data = await FaceCapture().init(metaInfo, serviceLevel);
  return res.status(200).json(data);
}
