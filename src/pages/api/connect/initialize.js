import { ConnectAuth } from "../../../helpers";

export default async function handler(req, res) {
  const { metaInfo, sceneCode, serviceLevel } = req.body;
  const data = await ConnectAuth().init(metaInfo, sceneCode, serviceLevel);
  return res.status(200).json(data);
}
