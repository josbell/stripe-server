import express, { Request, Response, NextFunction } from "express";
export const app = express();

app.use(express.json());

import cors from "cors";
app.use(cors({ origin: true }));

import { createStripeCheckoutSession } from "./checkout";
app.post(
  "/checkout/",
  runAsync(async ({ body }: Request, response: Response) => {
    response.send(await createStripeCheckoutSession(body.line_items));
  })
);

/**
 * Catch  async errors when awaiting promises
 */
function runAsync(callback: Function) {
  return (request: Request, response: Response, next: NextFunction) => {
    callback(request, response, next).catch(next);
  };
}
