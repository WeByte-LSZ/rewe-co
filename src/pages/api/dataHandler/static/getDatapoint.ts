import type { NextApiRequest, NextApiResponse } from 'next'
import { Data, Datapoint } from '@/types/Configuration'

type ResponseData = { data: Datapoint[] } | { err: string }

const data: Data = {
  "Austria": {
    "Collected": {
      "1999": 23,
      "2000": 4783,
      "2001": 78123,
      "2002": 73,
      "2003": 7891823,
      "2004": 787348,
      "2005": 971823,
      "2008": 478934,
      "2009": 178923,
      "2010": 178233,
      "2013": 193982739,
      "2014": 7123,
    }
  },
  "Germany": {
    "Collected": {
      "1999": 2345,
      "2000": 12345,
      "2001": 54321,
      "2002": 8765,
      "2003": 9876543,
      "2004": 876543,
      "2005": 543210,
      "2008": 987654,
      "2009": 765432,
      "2010": 654321,
      "2013": 123456789,
      "2014": 9876,
    }
  },
  "France": {
    "Collected": {
      "1999": 987,
      "2000": 8765,
      "2001": 34567,
      "2002": 876,
      "2003": 7654321,
      "2004": 87654,
      "2005": 456789,
      "2008": 76543,
      "2009": 654321,
      "2010": 543210,
      "2013": 987654321,
      "2014": 8765,
    }
  },
  "United States": {
    "Collected": {
      "1999": 12345,
      "2000": 54321,
      "2001": 87654,
      "2002": 123456,
      "2003": 87654321,
      "2004": 654321,
      "2005": 432109,
      "2008": 876543,
      "2009": 7654321,
      "2010": 6543210,
      "2013": 1234567890,
      "2014": 98765,
    }
  },
  "Canada": {
    "Collected": {
      "1999": 5678,
      "2000": 87654,
      "2001": 23456,
      "2002": 8765,
      "2003": 6543210,
      "2004": 76543,
      "2005": 987654,
      "2008": 876543,
      "2009": 7654321,
      "2010": 654321,
      "2013": 987654321,
      "2014": 87654,
    }
  },
  "United Kingdom": {
    "Collected": {
      "1999": 8765,
      "2000": 43210,
      "2001": 98765,
      "2002": 8765,
      "2003": 1234567,
      "2004": 87654,
      "2005": 765432,
      "2008": 654321,
      "2009": 543210,
      "2010": 432109,
      "2013": 876543210,
      "2014": 7654,
    }
  },
};


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.url === undefined) {
    return res.status(401).json({ err: "parameter error" });
  }
  const { searchParams } = new URL(req.url, `http://${req.headers.host}`)

  const key = searchParams.get("k")
  const category = searchParams.get("c")
  const startPoint = searchParams.get("start")
  const endPoint = searchParams.get("end")

  if (key == null || category == null || startPoint == null || endPoint == null) {
    return res.status(401).json({ err: "parameter error" });
  }

  const validKey = key as keyof typeof data;

  if (data[validKey] === undefined) {
    return res.status(401).json({ err: "Key not found in data" });
  } else {
    if (data[validKey][category] === undefined) {
      return res.status(401).json({ err: "Category not found in data[key]" });
    }
  }

  const dataset = data[validKey][category];
  const filteredData: Datapoint[] = [];

  for (const point in dataset) {
    const validPoint = point as keyof typeof dataset;
    if (validPoint >= startPoint && validPoint <= endPoint) {
      filteredData.push({
        [validPoint]: dataset[validPoint],
      });
    }
  }

  const responseData: ResponseData = { data: filteredData };
  return res.status(200).json(responseData);
}
