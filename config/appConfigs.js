import dotenv from "dotenv";
dotenv.config();

const configs = {
  slackToken: process.env.slackToken,
  slackChannelId: process.env.slackChannelId,
  verifyToken: process.env.verifyToken,
};

export default configs;
