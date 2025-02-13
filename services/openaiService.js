const axios = require('axios');
const { OPENAI_API_KEY } = require('../config/index.js');

async function queryOpenAI(messages) {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: messages,
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error querying OpenAI:', error.response?.data || error.message);
        return 'Sorry, I couldn’t process your request.';
    }
}

module.exports = { queryOpenAI };
