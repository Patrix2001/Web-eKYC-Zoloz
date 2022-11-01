import { ConnectAuth } from "../../../helpers";

export default async function handler(req, res) {
  const { picture } = req.body;
  const data = await ConnectAuth().enroll(picture);
  return res.status(200).json(data);
}
