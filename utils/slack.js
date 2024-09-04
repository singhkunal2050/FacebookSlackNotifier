import { WebClient } from "@slack/web-api";
import configs from "../config/appConfigs.js";

const web = new WebClient(configs.slackToken);

async function sendMessage(text) {
  try {
    await web.chat.postMessage({
      channel: configs.slackChannelId,
      text: text,
    });
    console.log("Message sent to Slack channel");
  } catch (error) {
    console.error("Error sending message to Slack:", error);
  }
}

export { sendMessage };
