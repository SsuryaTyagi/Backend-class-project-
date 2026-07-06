require("dotenv/config");
const { tavily } = require("@tavily/core");

const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

const searchWeb = async ({ query }) => {
  try {
    const response = await tvly.search(query, {
      max_results: 5,
      topic: "general", // or "news" for recent events
      search_depth: "basic", // or "advanced" for deeper results
      include_images: true, // optional, default false
      include_image_descriptions: true,
    });

    if (!response.results || response.results.length === 0) {
      return "No search results found.";
    }

    return response.results
      .map((r) => `Title: ${r.title}\nURL: ${r.url}\nContent: ${r.content}`)
      .join("\n\n");
  } catch (error) {
    console.error("Error searching web:", error);
    throw new Error(`Failed to search: ${error.message}`);
  }
};

module.exports = { searchWeb };