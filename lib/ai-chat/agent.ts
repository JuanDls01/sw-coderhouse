import { google } from "@ai-sdk/google";
import { ToolLoopAgent } from "ai";
import { STAR_WARS_SYSTEM_PROMPT } from "./SYSTEM_PROMPT";
import { swapiTools } from "./tools";

export const starWarsAgent = new ToolLoopAgent({
  model: google("gemini-3-flash-preview"),
  instructions: STAR_WARS_SYSTEM_PROMPT,
  tools: swapiTools,
  onFinish: ({ totalUsage }) => {
    console.log("[AGENT] Token usage:", {
      inputTokens: totalUsage.inputTokens,
      outputTokens: totalUsage.outputTokens,
      totalTokens: totalUsage.totalTokens,
    });
  },
});
