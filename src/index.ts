import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { sendMessage } from "./utils/slack.js";
import configs from "./config/appConfigs.js";
import { verifyWebhook } from "./middlerwares/verifyToken.js";
import log from "./utils/logger.js";
import { MessageResponse } from "./types/index.js";

const app = express();
app.use(bodyParser.json());

// Facebook Webhook verification
app.get("/webhook", verifyWebhook);

// Handle Facebook messages
app.post("/webhook", (req: Request, res: Response) => {
  try {
    var signature = req.headers["x-hub-signature-256"];
    const messageBody = req.body as MessageResponse;
    console.log("Received message from Facebook:", req.body, signature);
    log.info(
      "Received message from Facebook:" + JSON.stringify(req.body) + signature
    );

    if (!signature) {
      console.warn(`Couldn't find "x-hub-signature-256" in headers.`);
      log.warn(`Couldn't find "x-hub-signature-256" in headers.`);
      return res.sendStatus(403);
    }

    console.log(JSON.stringify(req.body.entry));

    if (req.body.object === "page") {
      const message = req.body.entry[0].messaging[0]?.message?.text;
      sendMessage(`New message on Facebook: ${message}`);
      log.info(`New message on sent Facebook: ${message}`);
      return res.status(200).send("EVENT_RECEIVED");
    }
    return res.sendStatus(403);
  } catch (error) {
    console.error("Error handling Facebook message:", error);
    log.error("Error handling Facebook message:" + JSON.stringify(error));
    return res.status(500).send("SERVER_ERROR");
  }
});

app.listen(configs.port, () => {
  console.log(`Server is running on port ${configs.port}`);
});
