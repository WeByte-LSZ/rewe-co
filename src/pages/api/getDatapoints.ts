import { join } from 'path';
import { readFileSync } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next'
import { Datapoint } from '@/types/Configuration'

type ResponseData = { data: Datapoint[] } | { err: string }

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.url === undefined) {
        return res.status(401).json({ err: "parameter error" });
    }
    const { searchParams } = new URL(req.url, `http://${req.headers.host}`)

    const f = searchParams.get("file")
    const startYear = parseInt(searchParams.get("start") || "", 10);
    const endYear = parseInt(searchParams.get("end") || "", 10);

    if (f == null || isNaN(startYear) || isNaN(endYear)) {
        return res.status(401).json({ err: "parameter error" });
    }

    const filePath = join(process.cwd(), 'data', f + ".json");
    console.log(filePath)

    try {
        const fileContent = readFileSync(filePath, 'utf8');
        const jsonData: Datapoint[] = JSON.parse(fileContent);


        const filteredData = jsonData.filter((datapoint: Datapoint) => {
            for (const yearString in datapoint) {
                if (Object.prototype.hasOwnProperty.call(datapoint, yearString)) {
                    const year = parseInt(yearString);
                    if (!isNaN(year) && year >= startYear && year <= endYear) {
                        return true; // Return true if the year falls within the range
                    }
                }
            }
        });

        return res.status(200).json({ data: filteredData });
    } catch (error) {
        return res.status(500).json({ err: "Error reading file" });
    }
}
