import { WebClient } from "@slack/web-api";
import configs from "../config/appConfigs.js";

const web = new WebClient(configs.slackToken);

const sendMessage = async (text: string): Promise<void> => {
  try {
    await web.chat.postMessage({
      channel: configs.slackChannelId,
      text,
    });
    console.log("Message sent to Slack channel");
  } catch (error) {
    console.error("Error sending message to Slack:", error);
  }
};

export { sendMessage };
