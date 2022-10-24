import FaceCapture from "../../../utils/faceCapture";

export default async function handler(req, res) {
  const data = await FaceCapture().init();
  return res.status(200).json(data);
}
