import { IdRecoginize } from "../../../helpers";

export default async function handler(req, res) {
  const { state } = req.body;
  const data = await IdRecoginize().result(state);
  return res.status(200).json(data);
}
