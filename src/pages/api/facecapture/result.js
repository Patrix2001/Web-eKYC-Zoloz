import FaceCapture from "../../../utils/faceCapture";

export default async function handler(req, res) {
  const { state } = req.body;
  const data = await FaceCapture().result(state);
  return res.status(200).json(data);
}
