import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: string;
  timestamp: string;
  uptime: number;
};

/**
 * Health check API endpoint
 * GET /api/health
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    res.status(200).json({
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

