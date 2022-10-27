import { FaceCapture } from "../../../utils";

export default async function handler(req, res) {
  const { serviceLevel } = req.body;
  const data = await FaceCapture().init(serviceLevel);
  return res.status(200).json(data);
}
