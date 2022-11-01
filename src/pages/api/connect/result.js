import { ConnectAuth } from "../../../helpers";

export default async function handler(req, res) {
  const { state } = req.body;
  const data = await ConnectAuth().result(state);
  return res.status(200).json(data);
}
