
<img src="https://socialify.git.ci/juniorSarh/RoyaltyAI/image?language=1&owner=1&name=1&stargazers=1&theme=Light" alt="RoyaltyAI" width="640" height="320" />

# RoyaltyAI

RoyaltyAI is a multi-model AI chat backend that allows users to interact with multiple AI models through a single RESTful API. It currently supports models provided by Groq, OpenRouter, and Google AI.

## Features

* **Multiple AI Models**: Chat with Llama 3.1 70B, StepFun-v2, GLM-4, Nemotron-3-Nano, and Google Gemini Pro.
* **RESTful API**: Clean and scalable Express.js API built with TypeScript.
* **Easy Model Selection**: Select the desired AI model using a simple request parameter.
* **Centralized AI Integration**: Manage multiple AI providers through a unified backend.
* **Error Handling**: Request validation and descriptive error responses.
* **CORS Support**: Enabled for cross-origin frontend applications.
* **Environment-Based Configuration**: API keys and configuration are managed through environment variables.

## Supported Models

| Model                 | Provider   | Model ID                              | API Key / Configuration | Selection Key |
| --------------------- | ---------- | ------------------------------------- | ----------------------- | ------------- |
| **Llama 3.1 70B**     | Groq       | `llama-3.1-70b-versatile`             | `GROQ_API_KEY`          | `llama`       |
| **StepFun-v2**        | OpenRouter | `stepfun-ai/stepfun-v2`               | `OPENROUTER_API_KEY`    | `stepfun`     |
| **GLM-4**             | OpenRouter | `zhipuai/glm-4`                       | `OPENROUTER_API_KEY`    | `glm`         |
| **Nemotron-3-Nano**   | OpenRouter | `nvidia/nemotron-3-nano-30b-a3b:free` | `OPENROUTER_API_KEY`    | `nemotron`    |
| **Google Gemini Pro** | Google AI  | `gemini-pro`                          | `GOOGLE_API_KEY`        | `gemini`      |

> **Note:** The exact model IDs and provider requirements depend on the implementation in `src/AI-Models/models.ts`. If the project uses different environment-variable names, update the examples below to match your implementation.

## Prerequisites

Before installing RoyaltyAI, make sure you have:

* [Node.js](https://nodejs.org/) v16 or higher
* npm or Yarn
* API keys for the AI providers you intend to use

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd <repository-name>
```

### 2. Navigate to the backend directory

```bash
cd Backend & cd Frontend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file from the provided example:

```bash
cp .env.example .env
```

Then update `.env` with your API keys:

```env
GROQ_API_KEY=your_groq_api_key_here
OPENROUTER_API_KEY=your_openrouter_api_key_here
GOOGLE_API_KEY=your_google_api_key_here
PORT=5000
```

Only configure the API keys required by the models you intend to use.

## Getting API Keys

* **Groq**: Get an API key from the [Groq Console](https://console.groq.com/keys?utm_source=chatgpt.com).
* **OpenRouter**: Get an API key from [OpenRouter Keys](https://openrouter.ai/keys?utm_source=chatgpt.com). This can be used for the StepFun, GLM, and Nemotron models when they are accessed through OpenRouter.
* **Google AI**: Obtain a Gemini API key through [Google AI Studio](https://aistudio.google.com/app/apikey?utm_source=chatgpt.com).

> **Security:** Never commit your `.env` file or expose your API keys in source control. Make sure `.env` is included in `.gitignore`.

## Running the Application

### Development

Start the development server with hot reload:

```bash
npm run dev
```

### Production Build

Compile the TypeScript source:

```bash
npm run build
```

### Start the Production Server

```bash
npm start
```

By default, the server runs on:

```text
http://localhost:5000
```

If a different port is configured in `.env`, use that port instead.

## API Usage

### Chat Endpoint

**POST** `/api/chat`

Send a message and optionally specify the AI model you want to use.

### Request Body

```json
{
  "message": "Hello, how are you?",
  "model": "llama"
}
```

The `model` parameter is optional. If omitted, the API defaults to `llama`.

Supported model keys:

```text
llama
stepfun
glm
nemotron
gemini
```

### Response

A successful request returns:

```json
{
  "reply": "Hello! I'm doing well, thank you for asking. How can I assist you today?"
}
```

## Example cURL Requests

### Llama

```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello!","model":"llama"}'
```

### StepFun

```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello!","model":"stepfun"}'
```

### GLM

```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello!","model":"glm"}'
```

### Nemotron

```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello!","model":"nemotron"}'
```

### Gemini

```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello!","model":"gemini"}'
```

## Project Structure

```text
Backend/
├── src/
│   ├── AI-Models/
│   │   └── models.ts             # AI model configurations
│   ├── controllers/
│   │   └── chatController.ts     # HTTP request handlers
│   ├── routes/
│   │   └── chatRoute.ts          # Chat API routes
│   ├── services/
│   │   └── chatService.ts        # AI integration and business logic
│   └── index.ts                  # Application entry point
├── .env.example                  # Environment variable template
├── package.json                  # Dependencies and npm scripts
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # Project documentation
```

## Error Handling

The API provides descriptive error responses for common failures.

### `400 Bad Request`

Returned when the request is invalid, for example when:

* The `message` field is missing.
* The `message` value is invalid.
* An unsupported model key is provided.

Example:

```json
{
  "error": "Invalid request"
}
```

### `500 Internal Server Error`

Returned when the server encounters an unexpected error, such as:

* Missing or invalid API credentials.
* AI provider errors.
* Model execution failures.
* Unexpected server-side errors.

Example:

```json
{
  "error": "Internal server error"
}
```

The exact error response format depends on the implementation in the controller and service layers.

## Development Notes

* **TypeScript** is used for static typing and improved maintainability.
* **Express.js** provides the REST API server.
* **LangChain** is used for AI model integration.
* **CORS** is enabled to allow requests from configured frontend applications.
* **Environment variables** are used to keep API credentials and configuration outside the source code.
* AI provider configuration is centralized in `src/AI-Models/models.ts`.

## API Design

The backend uses a unified chat interface, allowing the client to switch between supported models without changing the API endpoint.

For example:

```json
{
  "message": "Explain quantum computing in simple terms.",
  "model": "glm"
}
```

The same endpoint can then be used with another model:

```json
{
  "message": "Explain quantum computing in simple terms.",
  "model": "llama"
}
```

This approach keeps the frontend integration simple while allowing additional AI models to be added to the backend in the future.
