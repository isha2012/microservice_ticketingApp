import express, { NextFunction, Request, Response } from "express";
import { connectDB } from "./db/connectDb";
import { app } from "./app";
// import { protect } from '@isha7876/common'
import { requireAuth } from '@isha7876/common/dist/common/src/middleware/require-auth'
import prometheusMiddleware from 'express-prometheus-middleware';

// const app = express();
app.use(async (req, res, next) => {
  console.log("function called");

  try {
      console.log("connecting db");
      
    await connectDB();
    next();
  } catch (error) {
    res.status(500).send("Database connection error");
  }
});

app.use(
      prometheusMiddleware({
        metricsPath: '/metrics', // The path where Prometheus will scrape metrics
        collectDefaultMetrics: true, // Collect default Node.js metrics
        requestDurationBuckets: [0.1, 0.5, 1, 1.5], // Customize buckets for response times
        extraMasks: [/..../g], // Optional: Define regex to mask paths for better aggregation
      })
    );

//@ts-ignore
// app.get('/authentication', protect, requireAuth, (req: Request, res: Response, next: NextFunction) => {
//       res.status(200).send("AUthenticated")
// })

app.listen(3000, async () => {
  //for kubernetes.
  // if(!process.env.JWT_KEY) {
  //       throw new Error("JWT KEY must be defined");
  // }
  await connectDB();
  console.log("Server is running on port 3000!!!!!!");
});
