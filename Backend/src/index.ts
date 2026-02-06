import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());

// Endpoint


// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(` RoyaltyAI Backend running on port ${PORT}`),
);
