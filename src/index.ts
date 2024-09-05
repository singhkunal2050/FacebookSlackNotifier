import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { sendMessage } from "./utils/slack.js";
import configs from "./config/appConfigs.js";
import { verifyWebhook } from "./middlerwares/verifyToken.js";

const app = express();
app.use(bodyParser.json());

// Facebook Webhook verification
app.get("/webhook", verifyWebhook);

// Handle Facebook messages
app.post("/webhook", (req: Request, res: Response) => {
  console.log("Received message from Facebook:", req.body);
  console.log(req.body.entry);
  console.log(JSON.stringify(req.body.entry));

  if (req.body.object === "page") {
    sendMessage(JSON.stringify(req.body.entry));
    req.body.entry.forEach((entry: any) => {
      const message = entry.messaging[0].message.text;
      console.log("Processing message:", message);

      // Send message to Slack
      sendMessage(`New message on Facebook: ${message}`);
    });

    return res.status(200).send("EVENT_RECEIVED");
  }
  return res.sendStatus(404);
});

app.listen(configs.port, () => {
  console.log(`Server is running on port ${configs.port}`);
});
