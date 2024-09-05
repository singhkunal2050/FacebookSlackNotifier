import { Request, Response, NextFunction } from "express";
import configs from "../config/appConfigs.js";

export const verifyWebhook = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token && mode === "subscribe" && token === configs.verifyToken) {
    console.log("WEBHOOK_VERIFIED");
    return res.status(200).send(challenge);
  }

  res.sendStatus(403);
};
