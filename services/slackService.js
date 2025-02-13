const { WebClient } = require('@slack/web-api');
const { SLACK_BOT_TOKEN } = require('../config');

const slackClient = new WebClient(process.env.SLACK_BOT_TOKEN);

async function sendSlackMessage(channel, text) {
    try {
        await slackClient.chat.postMessage({
            channel,
            text,
        });
    } catch (error) {
        console.error('Error sending message to Slack:', error.response?.data || error.message);
    }
}

module.exports = { sendSlackMessage };
