import { Request, Response } from "express";
import { streamChat } from "../services/chatService";

export const chatController = async (req: Request, res: Response) => {
  try {
    const { message, model, history, stream } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (stream) {
      // Set headers for Server-Sent Events
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      await streamChat(
        message,
        model || "stepfun",
        history || [],
        (token: string) => {
          res.write(`data: ${token}\n\n`);
        }
      );

      res.write("data: [DONE]\n\n");
      res.end();
    } else {
      // Non-streaming fallback
      const { chat } = await import("../services/chatService");
      const reply = await chat(message, model || "stepfun", history);
      res.json({ reply });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || "Chat failed" });
  }
};
