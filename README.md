# **Slack Chatbot with MongoDB and OpenAI Integration**

This Slack chatbot listens for questions tagged with the bot in a Slack channel, sends them to OpenAI for processing, and replies to the user with a response. It stores all messages in MongoDB and ensures only relevant questions are processed.


## **Features**

- Listens to questions in Slack where the bot is tagged.
- Queries OpenAI's API with the current message and the last 5 messages in the channel for context.
- Replies directly in the Slack channel with OpenAI's response.
- Stores all messages in MongoDB for future reference.


## **Prerequisites**

- MongoDB (local or cloud, e.g., MongoDB Atlas)
- A Slack App with Bot permissions
- An OpenAI API key


## **Setup Instructions**

### 1. **Clone the Repository**

```bash
git clone https://github.com/your-username/slack-chatbot.git
cd slack-chatbot
```

### 2. **Install Dependencies**

```bash
npm install
```

### 3. **Configure Environment Variables**

Create a `.env` file in the root of your project with the following variables:

```env
# Slack credentials
SLACK_SIGNING_SECRET=your_slack_signing_secret
SLACK_BOT_TOKEN=your_slack_bot_token
BOT_USER_ID=your_bot_user_id # Replace with your bot's Slack user ID

# OpenAI credentials
OPENAI_API_KEY=your_openai_api_key

# MongoDB connection
MONGO_URI=mongodb://localhost:27017/BotoAI
```

#### **How to Find the Slack Credentials:**
1. Go to [Slack API](https://api.slack.com/apps) and create a new app.
2. Add the following bot scopes:
   - `chat:write`
   - `chat:write.public`
   - `im:history`
   - `channels:history`
3. Install the app to your workspace and copy the Bot Token.
4. Generate a Signing Secret from the **Basic Information** section.


### 4. **Run the Application**

Start the server:

```bash
npm start
```

The server will run on `http://localhost:3000`.


### 5. **Expose the Server to Slack**

If you’re running this locally, use a tool like [ngrok](https://ngrok.com/) to expose your server to the internet.

```bash
ngrok http 3000
```

Copy the public URL provided by ngrok and update your Slack app's Event Subscriptions:

1. Go to your app's settings on the [Slack API Dashboard](https://api.slack.com/apps).
2. Enable **Event Subscriptions** and set the request URL:
   ```
   https://your-ngrok-url/events
   ```
3. Add the following **bot events**:
   - `message.channels`
   - `message.im`


## **Folder Structure**

```
slack-chatbot/
├── config/
│   ├── index.js            # Environment variable configuration
├── model/
│   ├── Message.js          # MongoDB schema for storing messages
├── routes/
│   ├── events.js           # Handles Slack events and bot logic
├── services/
│   ├── openaiService.js    # Handles OpenAI API interactions
│   ├── slackService.js     # Sends messages back to Slack
├── app.js                  # Main server setup
├── package.json            # Node.js dependencies and scripts
├── README.md               # Project documentation
├── .env                    # Environment variables
```


## **How It Works**

1. **Event Subscription**:
   - Slack sends events to the `/events` endpoint.

2. **Message Handling**:
   - The bot saves the message in MongoDB.
   - Retrieves the last 5 messages from the channel for context.
   - Sends the message history to OpenAI for processing.
   - Responds with OpenAI’s reply in the same Slack channel.


## **Credits**

- **Slack API**: For event subscriptions and messaging.
- **OpenAI**: For generating responses.
- **MongoDB**: For message persistence.

