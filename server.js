import express from "express";
import cors from "cors";
import {ask} from "./ask.js";

const app = express();
app.use(cors());
app.use(express.json());

// api endpoint for answer
app.post("/ask", async (req, res) => {

    try {

        const { question } = req.body;

        if (!question) {

            return res.status(400).json({ error: "Question is required"});

        }

        // call ask RAG func
        const answer = await ask(question);

        res.json({answer});

    } catch (error) {

        console.error("Error in /ask", error);
        res.status(500).json({ error: "Server error"});

    }

});

// start server
app.listen(3000, () => {

    console.log("Backend running at localhost:3000");

});