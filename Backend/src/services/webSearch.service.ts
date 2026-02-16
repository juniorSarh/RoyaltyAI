import fetch from "node-fetch";

interface TavilyResult {
  title?: string;
  content?: string;
  snippet?: string;
}

interface TavilyResponse {
  answer?: string;
  results?: TavilyResult[];
}

export const searchWeb = async (query: string) => {
  console.log("🔍 Web search called with query:", query);
  console.log("🔑 Using API key:", process.env.TAVILY_API_KEY ? "✅ Present" : "❌ Missing");
  console.log("🔑 API key value (first 10 chars):", process.env.TAVILY_API_KEY?.substring(0, 10) + "...");
  
  if (!process.env.TAVILY_API_KEY) {
    console.error("❌ TAVILY_API_KEY is missing from environment variables!");
    throw new Error("Tavily API key not configured");
  }
  
  const response = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TAVILY_API_KEY}`,
    },
    body: JSON.stringify({
      query,
      max_results: 3,
      recency: 365,
      include_answer: true,
    }),
  });

  console.log("📡 Response status:", response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("❌ Web search failed with status:", response.status);
    console.error("❌ Error response:", errorText);
    throw new Error(`Failed to fetch web data: ${response.status} ${errorText}`);
  }

  const data = await response.json() as TavilyResponse;
  console.log("📦 Raw response data:", JSON.stringify(data, null, 2));

  // Handle different response structures from Tavily API
  if (data.answer) {
    console.log("✅ Using direct answer:", data.answer);
    return data.answer;
  }

  // Try to extract content from results
  if (data.results && Array.isArray(data.results)) {
    const result = data.results
      .map((r: TavilyResult) => r.content || r.snippet || r.title || "")
      .filter(Boolean)
      .join("\n");
    console.log("✅ Using results array:", result);
    return result;
  }

  console.log("❌ No results found, returning empty string");
  // Fallback: return empty string if no results found
  return "";
};
