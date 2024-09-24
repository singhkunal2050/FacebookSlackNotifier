# Slack-Facebook Integration Project

## Demo 

<!https://www.loom.com/share/93342a285e884831bc82cff51af22bd9(test)!>

## Project Objective

This project integrates Slack and Facebook, enabling automatic messaging in a Slack channel whenever a new message is received on a Facebook page. The integration is built using TypeScript, Express.js, and Slack's Web API.

## Features

- **Facebook Integration:** Listens for new messages on a Facebook page.
- **Slack Integration:** Automatically posts these messages to a specified Slack channel.
- **Secure Communication:** Ensures secure interaction between Facebook and Slack via a verification process.

## Project Setup

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (version 16.x or later)
- **npm** (globally installed)

### 1. Clone the Repository

`git clone git@github.com:singkunal2050/facebookslacknotifier.git`

### 2. Install Dependencies

`npm install`

### 3. Create Environment Configuration

Create a `src/configs.ts` file with the following content:

```javascript
const configs = {
  token: "your-slack-bot-token",
  channelId: "your-slack-channel-id",
  verifyToken: "your-facebook-verify-token",
};

export default configs;
```

Replace `'your-slack-bot-token'`, `'your-slack-channel-id'`, and `'your-facebook-verify-token'` with your actual values.

- ** Note: Use Environment Variables for these Sensitive Information **

```.env
SLACK_TOKEN=your-slack-token
SLACK_CHANNEL_ID=your-channel-id
VERIFY_TOKEN=your-verify-token
appPort=3000
```

### 4. Start the Development Server

`npm run dev`

This will start the server using `nodemon`.

### 5. Deploy the Application

`npm run serve`

This will serve the application using `node`.

## Project Structure

<!--
`` |-- src
|   |-- index.ts          # Main entry point
|   |-- configs.ts        # Configuration file for API tokens
|   |-- slack.ts          # Slack integration logic
|   `-- facebook.ts       # Facebook webhook handler (if any)
|
|-- package.json          # Project dependencies and scripts
|-- tsconfig.json         # TypeScript configuration
|-- README.md             # Project documentation `` -->

## Additional Details

- **OAuth Scopes Required:**

  - `channels:join`
  - `channels:read`
  - `chat:write`

- **Webhook Verification:** This project uses Facebook's webhook verification process. Ensure that your Facebook app's webhook is set up correctly to receive updates.
- **Troubleshooting:** If you encounter issues, ensure all environment variables are correctly set and that the Slack bot is invited to the correct channel.

- **Logging:** The project uses the `winston` library for logging. The log file is located at `/app.log`.
