import OpenAI from "openai";
import { Pinecone } from "@pinecone-database/pinecone";
import "dotenv/config";
import fs from "fs";
import path from "path";

const openai = new OpenAI({

    apiKey: process.env.OPENAI_API_KEY

});

const pinecone = new Pinecone({

    apiKey: process.env.PINECONE_API_KEY

});

const index = pinecone.Index(process.env.INDEX_NAME);

// func embedding
async function embedText(text, id) {
    
    const embedding = await openai.embeddings.create({

        model: "text-embedding-3-small",
        input: text

    });

    await index.upsert([

        {

            id: id,
            values: embedding.data[0].embedding,
            metadata: {text}

        }

    ]);

    console.log("Uploaded: ", id);

}

async function uploadDocument() {
    
    const text = fs.readFileSync("law.txt", "utf8");
    await embedText(text, "malaysia-realestate-law");

}

uploadDocument();