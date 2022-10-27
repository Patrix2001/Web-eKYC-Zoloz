import { RealId } from "../../../utils";

export default async function handler(req, res) {
  const { state } = req.body;
  const data = await RealId().result(state);
  return res.status(200).json(data);
}
