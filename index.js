import express from "express";
import bodyParser from "body-parser";
import { sendMessage } from "./utils/slack.js";

const app = express();
app.use(bodyParser.json());

const VERIFY_TOKEN = "YOUR_VERIFY_TOKEN"; // Replace with your actual verification token

// Handle Facebook Webhook verification
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(403);
  }
});

// Handle Facebook messages
app.post("/webhook", (req, res) => {
  const body = req.body;

  if (body.object === "page") {
    body.entry.forEach((entry) => {
      const message = entry.messaging[0].message.text;
      console.log("Received message from Facebook:", message);

      // Send message to Slack
      sendMessage(`New message on Facebook: ${message}`);
    });

    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
