import { Request, Response } from "express";
import { chat } from "../services/chatService";

export const chatController = async (req: Request, res: Response) => {
  try {
    const { message, model } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const reply = await chat(message, model || "stepfun");

    res.json({ reply });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || "Chat failed" });
  }
};
