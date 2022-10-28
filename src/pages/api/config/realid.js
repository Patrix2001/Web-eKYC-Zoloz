import NextCors from 'nextjs-cors';
import data from "../../../../public/realid.json";

export default async function handler(req, res) {
    await NextCors(req, res, {
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200,
    });
    return res.status(200).json(data);
}
