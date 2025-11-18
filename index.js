const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({

  apiKey: process.env.OPENAI_API_KEY

});

async function talkToGPT() {

  const response = await openai.chat.completions.create({

    model: "gpt-3.5-turbo",
    
    messages: [

      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Hello, macam mana untuk membeli hartanah di malaysia?" }

    ]

  });

  console.log(response.choices[0].message.content);

}

talkToGPT();
