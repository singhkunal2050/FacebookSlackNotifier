import dotenv from "dotenv";
dotenv.config();

const configs = {
  slackToken: process.env.slackToken as string,
  slackChannelId: process.env.slackChannelId as string,
  verifyToken: process.env.verifyToken as string,
  port: process.env.appPort || 3000,
};

export default configs;
