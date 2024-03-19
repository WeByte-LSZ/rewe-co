import { time } from 'console';
import type { NextApiRequest, NextApiResponse } from 'next'
import { join } from 'path';
import fs, { writeFileSync, readFileSync } from 'fs';

type ResponseData = { data: string } | { err: string }

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if(req.method !== 'DELETE') return res.status(405).json({ err: 'Method not allowed' });
  var timestamp = req.query.timestamp as string;
  if(timestamp == undefined)  return res.status(400).json({ err: "No timestamp provided" });

  const fileContent = readFileSync(join(process.cwd(), 'data.json'), 'utf8');
  let keys = Object.keys(JSON.parse(fileContent))
  if(!keys.includes(timestamp)) return res.status(404).json({ err: "Timestamp not found" });
  let data = JSON.parse(fileContent); delete data[timestamp];
  let newContent = JSON.stringify(data);
  res.status(200).json({ data: "Timestamp deleted" });
  fs.writeFileSync(join(process.cwd(), 'data.json'), newContent);
  return res.status(200).json({ data: "Timestamp deleted" });
}
