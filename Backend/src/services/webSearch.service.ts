import fetch from "node-fetch";

interface TavilyResult {
  title?: string;
  content?: string;
  snippet?: string;
  url?: string;
  published_date?: string;
  score?: number;
}

interface TavilyResponse {
  answer?: string;
  results?: TavilyResult[];
  follow_up_questions?: string[];
}

export const searchWeb = async (query: string) => {
 // console.log("🔍 Web search called with query:", query);
 // console.log("🔑 Using API key:", process.env.TAVILY_API_KEY ? "✅ Present" : "❌ Missing");
 // console.log("🔑 API key value (first 10 chars):", process.env.TAVILY_API_KEY?.substring(0, 10) + "...");
  
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
      max_results: 5, // Increased for more comprehensive results
      recency: 30, // More recent data (30 days instead of 365)
      include_answer: true,
      include_raw_content: true,
      include_domains: [], // Search all domains for comprehensive results
      exclude_domains: [], // No exclusions for broader coverage
    }),
  });

  console.log("📡 Response status:", response.status);

  if (!response.ok) {
    const errorText = await response.text();
   // console.error("❌ Web search failed with status:", response.status);
   // console.error("❌ Error response:", errorText);
    throw new Error(`Failed to fetch web data: ${response.status} ${errorText}`);
  }

  const data = await response.json() as TavilyResponse;
  console.log("📦 Raw response data:", JSON.stringify(data, null, 2));

  // Build comprehensive real-time data from multiple sources
  let comprehensiveData = "";
  
  // 1. Use direct answer if available (most concise)
  if (data.answer) {
    console.log("✅ Using direct answer:", data.answer);
    comprehensiveData += `DIRECT ANSWER:\n${data.answer}\n\n`;
  }

  // 2. Extract detailed information from results
  if (data.results && Array.isArray(data.results)) {
    console.log("✅ Processing", data.results.length, "search results");
    
    comprehensiveData += "DETAILED SOURCES:\n";
    
    const processedResults = data.results
      .filter((r: TavilyResult) => r.content || r.snippet || r.title)
      .sort((a: TavilyResult, b: TavilyResult) => (b.score || 0) - (a.score || 0)) // Sort by relevance
      .slice(0, 5); // Top 5 most relevant results
    
    processedResults.forEach((result: TavilyResult, index: number) => {
      const source = result.url ? new URL(result.url).hostname : "Unknown Source";
      const date = result.published_date ? ` (${result.published_date})` : "";
      
      comprehensiveData += `\n${index + 1}. ${result.title || 'Untitled'}${date}\n`;
      comprehensiveData += `   Source: ${source}\n`;
      
      if (result.content && result.content.length > 100) {
        // Use full content if available and substantial
        comprehensiveData += `   Content: ${result.content.substring(0, 500)}${result.content.length > 500 ? '...' : ''}\n`;
      } else if (result.snippet) {
        // Fallback to snippet
        comprehensiveData += `   Summary: ${result.snippet}\n`;
      }
      
      if (result.url) {
        comprehensiveData += `   URL: ${result.url}\n`;
      }
      
      comprehensiveData += "\n";
    });
  }

  // 3. Include follow-up questions if available
  if (data.follow_up_questions && data.follow_up_questions.length > 0) {
    console.log("✅ Including follow-up questions:", data.follow_up_questions);
    comprehensiveData += "RELATED QUESTIONS:\n";
    data.follow_up_questions.forEach((question: string, index: number) => {
      comprehensiveData += `${index + 1}. ${question}\n`;
    });
  }

  console.log("✅ Comprehensive data assembled, length:", comprehensiveData.length);
  console.log("📄 Data preview:", comprehensiveData.substring(0, 300) + "...");
  
  if (!comprehensiveData.trim()) {
    console.log("❌ No comprehensive data could be assembled");
    return "";
  }

  return comprehensiveData;
};
