import { readFileSync } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next'
import { join } from 'path';


type ResponseData = { data: string[] } | { err: string }

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const fileContent = readFileSync(join(process.cwd(), 'data.json'), 'utf8');

    let keys = Object.keys(JSON.parse(fileContent))

    return res.status(200).json({ data: keys });
  } catch (error) {
    return res.status(500).json({ err: "Error reading file" });
  }
}
