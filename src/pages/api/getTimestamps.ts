import { readFileSync } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next'
import { join } from 'path';


type ResponseData = { data: { id: string, name: string }[] } | { err: string }

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const fileContent = JSON.parse(readFileSync(join(process.cwd(), 'data.json'), 'utf8'));

    let keys = Object.keys(fileContent)

    let obj: { id: string, name: string }[] = []

    keys.forEach((e: string) => {
      obj.push({ id: e, name: fileContent[e].title })
    });

    return res.status(200).json({ data: obj });
  } catch (error) {
    return res.status(500).json({ err: "Error reading file" });
  }
}
