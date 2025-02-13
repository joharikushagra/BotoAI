const express = require('express');
const Message = require('../model/Message.js');
const { sendSlackMessage } = require('../services/slackService.js');
const { queryOpenAI } = require('../services/openaiService.js');


const router = express.Router();

router.post('/events', async (req, res) => {
    const { type, event } = req.body;
    // console.log({type, event})
    res.sendStatus(200)
    if (type === 'url_verification') {
        return res.json({ challenge: req.body.challenge });
    }

    
    else if (type === 'event_callback' && event.type === 'message' && !event.subtype) {
        const { user, text, channel, ts } = event;
        
        // Save the message in MongoDB
        const newMessage = new Message({
            user,
            text,
            timestamp: new Date(ts * 1000),
            channel,
        });
        await newMessage.save();
    
        if(event.bot_id === 'B08CT75KW95') return
        // Get the last 5 messages from the channel
        const recentMessages = await Message.find({ channel })
            .sort({ timestamp: -1 })
            .limit(5);

        const formattedMessages = recentMessages
            .reverse()
            .map((msg) => ({ role: 'user', content: msg.text }));

        // Query OpenAI for a response
        const response = await queryOpenAI(formattedMessages);

        // Send the response back to Slack
        await sendSlackMessage(channel, response);
    }

});

router.get('/health', async (req,res)=>{
    res.json({messsge:'Health confirmed'})
})

module.exports = router;
