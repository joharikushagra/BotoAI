const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const slackRoutes = require('./routes/slack.js');
const { PORT } = require('./config/index.js');

const app = express();

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(()=>console.log('mongoose connected')).catch(err=>console.log(err.message))

// Middleware for raw body (Slack requires it)
app.use(
    bodyParser.json({
        verify: (req, res, buf) => {
            req.rawBody = buf.toString();
        },
    })
);

// Slack routes
app.use('/slack', slackRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
