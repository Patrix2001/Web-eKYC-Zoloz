import { RealId } from "../../../helpers";

export default async function handler(req, res) {
  const { state } = req.body;
  const data = await RealId().result(state);
  return res.status(200).json(data);
}
