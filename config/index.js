require('dotenv').config();

module.exports = {
    SLACK_BOT_TOKEN: process.env.SLACK_BOT_TOKEN,
    SLACK_SIGNING_SECRET: process.env.SLACK_SIGNING_SECRET,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT || 3000
};
