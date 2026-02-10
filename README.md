# RoyaltyAI

A multi-model AI chat backend that allows users to chat with different AI models including Groq (Llama), StepFun, and GLM models.

## Features

- **Multiple AI Models**: Chat with Llama-70B, StepFun-v2, GLM-4, Nemotron-3-Nano, and Google Gemini 1.5 Pro models
- **RESTful API**: Clean Express.js API with TypeScript
- **Easy Model Selection**: Switch between models with a simple parameter
- **Error Handling**: Comprehensive error handling and validation

## Supported Models

1. **Llama-3.1-70B** (via Groq)
   - Model: `llama-3.1-70b-versatile`
   - Key: `llama`

2. **StepFun-v2** (via OpenRouter)
   - Model: `stepfun-ai/stepfun-v2`
   - Key: `stepfun`

3. **GLM-4** (via OpenRouter)
   - Model: `zhipuai/glm-4`
   - Key: `glm`

4. **Nemotron-3-Nano** (via OpenRouter)
   - Model: `nvidia/nemotron-3-nano-30b-a3b:free`
   - Key: `nemotron`

5. **Google Gemini Pro** (via Google AI)
   - Model: `gemini-pro`
   - Key: `gemini`

## Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd Backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

5. Edit the `.env` file and add your API keys:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   STEPFUN_API_KEY=your_stepfun_api_key_here
   GLM_API_KEY=your_glm_api_key_here
   PORT=5000
   ```

### Getting API Keys

- **Groq**: Get your API key from [Groq Console](https://console.groq.com/keys)
- **StepFun & GLM**: Get API keys from [OpenRouter](https://openrouter.ai/keys)

### Running the Application

1. Development mode (with hot reload):
   ```bash
   npm run dev
   ```

2. Build for production:
   ```bash
   npm run build
   ```

3. Start production server:
   ```bash
   npm start
   ```

The server will start on `http://localhost:5000` by default.

## API Usage

### Chat Endpoint

**POST** `/api/chat`

**Request Body:**
```json
{
  "message": "Hello, how are you?",
  "model": "llama"  // Optional: "llama", "stepfun", "glm", "nemotron", or "gemini" (defaults to "llama")
}
```

**Response:**
```json
{
  "reply": "Hello! I'm doing well, thank you for asking. How can I assist you today?"
}
```

### Example cURL Commands

```bash
# Chat with Llama model
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello!", "model": "llama"}'

# Chat with StepFun model
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello!", "model": "stepfun"}'

# Chat with GLM model
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello!", "model": "glm"}'
```

## Project Structure

```
Backend/
├── src/
│   ├── AI-Models/
│   │   └── models.ts        # AI model configurations
│   ├── controllers/
│   │   └── chatController.ts # Request handlers
│   ├── routes/
│   │   └── chatRoute.ts      # API routes
│   ├── services/
│   │   └── chatService.ts    # Business logic
│   └── index.ts              # Server entry point
├── .env.example              # Environment variables template
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── README.md                 # This file
```

## Error Handling

The API includes comprehensive error handling:

- **400 Bad Request**: Missing or invalid request parameters
- **500 Internal Server Error**: API key issues, model failures, or other server errors

All error responses include a descriptive error message.

## Development Notes

- The project uses TypeScript for type safety
- Express.js for the web server
- LangChain for AI model integration
- CORS is enabled for cross-origin requests
- Environment variables are used for sensitive data (API keys)