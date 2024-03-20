import { ReportStore, Report } from '@/types/Report';
import { readFileSync } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next'
import { join } from 'path';

type ResponseData = { data: Report } | { err: string }

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  let timestamp = req.query.timestamp as string;
  if (timestamp == undefined) return res.status(400).json({ err: "No timestamp provided" });

  try {
    const fileContent = readFileSync(join(process.cwd(), 'data.json'), 'utf8');

    let obj = JSON.parse(fileContent) as ReportStore

    // console.log("===========\n", timestamp, obj[timestamp], "=========\n")

    return res.status(200).json({ data: obj[timestamp] });
  } catch (error) {
    return res.status(500).json({ err: "Error reading file" });
  }
}
