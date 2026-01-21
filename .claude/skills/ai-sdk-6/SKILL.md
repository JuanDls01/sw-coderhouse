---
name: ai-sdk-6
description: >
  Vercel AI SDK 6 patterns.
  Trigger: When building AI chat features - breaking changes from v5.
license: Apache-2.0
metadata:
  author: JuaniDls01
  version: "2.0"
---

## Package Versions

```json
{
  "ai": "^6.0.0",
  "@ai-sdk/react": "^3.0.0",
  "@ai-sdk/openai": "^3.0.0",
  "@ai-sdk/anthropic": "^3.0.0",
  "@ai-sdk/provider": "^3.0.0"
}
```

## Automated Migration

```bash
npx @ai-sdk/codemod v6
```

## Breaking Changes from AI SDK 5

### Agent Class

```typescript
// ❌ AI SDK 5
import { Experimental_Agent as Agent } from "ai";
const agent = new Agent({
  model: openai("gpt-4o"),
  system: "You are a helpful assistant.",
  tools: {
    /* ... */
  },
  stopWhen: stepCountIs(20),
});

// ✅ AI SDK 6
import { ToolLoopAgent } from "ai";
const agent = new ToolLoopAgent({
  model: openai("gpt-4o"),
  instructions: "You are a helpful assistant.", // renamed from system
  tools: {
    /* ... */
  },
  // stopWhen defaults to stepCountIs(20)
});
```

### Message Types

```typescript
// ❌ AI SDK 5
import { convertToCoreMessages, type CoreMessage } from "ai";
const coreMessages = convertToCoreMessages(messages);

// ✅ AI SDK 6
import { convertToModelMessages, type ModelMessage } from "ai";
const modelMessages = await convertToModelMessages(messages); // now async
```

### Structured Output (generateObject deprecated)

```typescript
// ❌ AI SDK 5
import { generateObject } from "ai";
const { object } = await generateObject({
  model: openai("gpt-4o"),
  schema: z.object({ recipe: z.object({ name: z.string() }) }),
  prompt: "Generate a lasagna recipe.",
});

// ✅ AI SDK 6
import { generateText, Output } from "ai";
const { output } = await generateText({
  model: openai("gpt-4o"),
  output: Output.object({
    schema: z.object({ recipe: z.object({ name: z.string() }) }),
  }),
  prompt: "Generate a lasagna recipe.",
});
```

### Streaming Structured Output

```typescript
// ❌ AI SDK 5
const { partialObjectStream } = streamObject({ /* ... */ });

// ✅ AI SDK 6
const { partialOutputStream } = streamText({
  output: Output.object({ schema: /* ... */ }),
  // ...
});
```

### Tool Schema Parameter

```typescript
// ❌ AI SDK 5
tool({
  parameters: z.object({ location: z.string() }),
  // ...
});

// ✅ AI SDK 6
tool({
  inputSchema: z.object({ location: z.string() }),
  // ...
});
```

### Tool Strict Mode (per-tool)

```typescript
// ❌ AI SDK 5 (global)
streamText({
  providerOptions: { openai: { strictJsonSchema: true } },
});

// ✅ AI SDK 6 (per-tool)
tool({
  inputSchema: z.object({ location: z.string() }),
  strict: true,
  execute: async ({ location }) => {
    /* ... */
  },
});
```

### Tool Output Transform

```typescript
// ❌ AI SDK 5
toModelOutput: (output) => {
  /* ... */
};

// ✅ AI SDK 6
toModelOutput: ({ output }) => {
  /* ... */
};
```

### Embedding Model

```typescript
// ❌ AI SDK 5
const model = openai.textEmbedding("text-embedding-3-small");

// ✅ AI SDK 6
const model = openai.embedding("text-embedding-3-small");
```

### Token Usage

```typescript
// ❌ AI SDK 5
usage.cachedInputTokens;
usage.reasoningTokens;

// ✅ AI SDK 6
usage.inputTokenDetails.cacheReadTokens;
usage.outputTokenDetails.reasoningTokens;
```

## Client Setup

```typescript
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";

export function Chat() {
  const [input, setInput] = useState("");

  const { messages, sendMessage, isLoading, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput("");
  };

  return (
    <div>
      <div>
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          Send
        </button>
      </form>

      {error && <div>Error: {error.message}</div>}
    </div>
  );
}
```

## UIMessage Structure

```typescript
interface UIMessage {
  id: string;
  role: "user" | "assistant" | "system";
  parts: MessagePart[];
}

type MessagePart =
  | { type: "text"; text: string }
  | { type: "image"; image: string }
  | { type: "tool-call"; toolCallId: string; toolName: string; args: unknown }
  | { type: "tool-result"; toolCallId: string; result: unknown };

function getMessageText(message: UIMessage): string {
  return message.parts
    .filter((part): part is { type: "text"; text: string } => part.type === "text")
    .map((part) => part.text)
    .join("");
}

function Message({ message }: { message: UIMessage }) {
  return (
    <div className={message.role === "user" ? "user" : "assistant"}>
      {message.parts.map((part, index) => {
        if (part.type === "text") {
          return <p key={index}>{part.text}</p>;
        }
        if (part.type === "image") {
          return <img key={index} src={part.image} alt="" />;
        }
        return null;
      })}
    </div>
  );
}
```

## ToolLoopAgent

```typescript
import { ToolLoopAgent, tool, InferAgentUIMessage } from "ai";
import { z } from "zod";

export const weatherAgent = new ToolLoopAgent({
  model: openai("gpt-4o"),
  instructions: "You are a helpful weather assistant.",
  tools: {
    weather: tool({
      description: "Get the weather in a location",
      inputSchema: z.object({
        location: z.string().describe("The location to get weather for"),
      }),
      execute: async ({ location }) => ({
        temperature: 72,
        condition: "sunny",
      }),
    }),
  },
});

export type WeatherAgentUIMessage = InferAgentUIMessage<typeof weatherAgent>;

// Usage
const result = await weatherAgent.generate({
  prompt: "What is the weather in San Francisco?",
});
```

### Agent with Typed Options

```typescript
const supportAgent = new ToolLoopAgent({
  model: openai("gpt-4o"),
  callOptionsSchema: z.object({
    userId: z.string(),
    accountType: z.enum(["free", "pro", "enterprise"]),
  }),
  prepareCall: ({ options, ...settings }) => ({
    ...settings,
    instructions: `You are a support agent.
- User Account: ${options.accountType}
- User ID: ${options.userId}`,
  }),
});

const result = await supportAgent.generate({
  prompt: "How do I upgrade?",
  options: { userId: "user_123", accountType: "free" },
});
```

### Agent with Structured Output

```typescript
const agent = new ToolLoopAgent({
  model: openai("gpt-4o"),
  tools: { weather: weatherTool },
  output: Output.object({
    schema: z.object({
      summary: z.string(),
      temperature: z.number(),
      recommendation: z.string(),
    }),
  }),
});

const { output } = await agent.generate({
  prompt: "What is the weather in SF and what should I wear?",
});
```

## Server-Side (Route Handler)

```typescript
// app/api/chat/route.ts
import { createAgentUIStreamResponse } from "ai";
import { weatherAgent } from "@/agents/weather-agent";

export async function POST(req: Request) {
  const { messages } = await req.json();

  return createAgentUIStreamResponse({
    agent: weatherAgent,
    uiMessages: messages,
  });
}
```

### Basic streamText Route

```typescript
// app/api/chat/route.ts
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai("gpt-4o"),
    messages,
  });

  return result.toDataStreamResponse();
}
```

## Tool Features

### Tool with Input Examples

```typescript
tool({
  description: "Get the weather in a location",
  inputSchema: z.object({
    location: z.string().describe("The location to get weather for"),
  }),
  inputExamples: [
    { input: { location: "San Francisco" } },
    { input: { location: "London" } },
  ],
  execute: async ({ location }) => {
    /* ... */
  },
});
```

### Tool with Approval

```typescript
const runCommand = tool({
  description: "Run a shell command",
  inputSchema: z.object({
    command: z.string().describe("The shell command to execute"),
  }),
  needsApproval: true, // always require approval
  execute: async ({ command }) => {
    /* ... */
  },
});

// Conditional approval
const runCommand = tool({
  description: "Run a shell command",
  inputSchema: z.object({
    command: z.string(),
  }),
  needsApproval: async ({ command }) => command.includes("rm -rf"),
  execute: async ({ command }) => {
    /* ... */
  },
});
```

### Tool Output Transform

```typescript
const weatherTool = tool({
  description: "Get the weather",
  inputSchema: z.object({ location: z.string() }),
  execute: ({ location }) => ({
    temperature: 72 + Math.floor(Math.random() * 21) - 10,
  }),
  toModelOutput: async ({ input, output }) => ({
    type: "text",
    value: `Weather in ${input.location} is ${output.temperature}°F.`,
  }),
});
```

## With LangChain

```typescript
// app/api/chat/route.ts
import { toBaseMessages, toUIMessageStream } from "@ai-sdk/langchain";
import { createUIMessageStreamResponse } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const langchainMessages = await toBaseMessages(messages);
  const stream = await graph.stream({ messages: langchainMessages });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream(stream),
  });
}
```

## MCP (Model Context Protocol)

### HTTP Transport

```typescript
import { createMCPClient } from "@ai-sdk/mcp";

const mcpClient = await createMCPClient({
  transport: {
    type: "http",
    url: "https://your-server.com/mcp",
    headers: { Authorization: "Bearer my-api-key" },
  },
});

const tools = await mcpClient.tools();
```

### MCP Resources & Prompts

```typescript
const resources = await mcpClient.listResources();
const resourceData = await mcpClient.readResource({
  uri: "file:///example/document.txt",
});

const prompts = await mcpClient.experimental_listPrompts();
const prompt = await mcpClient.experimental_getPrompt({
  name: "code_review",
  arguments: { code: "function add(a, b) { return a + b; }" },
});
```

## Provider Tools

### Anthropic

```typescript
import { anthropic } from "@ai-sdk/anthropic";

const codeExecution = anthropic.tools.codeExecution_20250825();
const memory = anthropic.tools.memory_20250818({
  execute: async (action) => {
    /* ... */
  },
});
```

### OpenAI

```typescript
import { openai } from "@ai-sdk/openai";

const shell = openai.tools.shell({
  execute: async ({ action }) => {
    /* ... */
  },
});

const mcp = openai.tools.mcp({
  serverLabel: "my-mcp-server",
  serverUrl: "https://mcp.example.com/",
  allowedTools: ["tool1", "tool2"],
});
```

### Google

```typescript
import { google } from "@ai-sdk/google";

const googleMaps = google.tools.googleMaps();
const fileSearch = google.tools.fileSearch({
  fileSearchStoreNames: ["fileSearchStores/my-store-123"],
  topK: 10,
});
```

### xAI

```typescript
import { xai } from "@ai-sdk/xai";

const webSearch = xai.tools.webSearch({
  allowedDomains: ["wikipedia.org", "github.com"],
});
const codeExecution = xai.tools.codeExecution();
```

## Reranking

```typescript
import { rerank } from "ai";
import { cohere } from "@ai-sdk/cohere";

const documents = [
  "sunny day at the beach",
  "rainy afternoon in the city",
  "snowy night in the mountains",
];

const { ranking } = await rerank({
  model: cohere.reranking("rerank-v3.5"),
  documents,
  query: "talk about rain",
  topN: 2,
});
```

## DevTools

```bash
npx @ai-sdk/devtools
```

```typescript
import { wrapLanguageModel, gateway } from "ai";
import { devToolsMiddleware } from "@ai-sdk/devtools";

const devToolsEnabledModel = wrapLanguageModel({
  model: gateway("anthropic/claude-sonnet-4.5"),
  middleware: devToolsMiddleware(),
});
```

## Error Handling

```typescript
const { error, messages, sendMessage } = useChat({
  transport: new DefaultChatTransport({ api: "/api/chat" }),
  onError: (error) => {
    console.error("Chat error:", error);
    toast.error("Failed to send message");
  },
});

{error && (
  <div className="error">
    {error.message}
    <button onClick={() => sendMessage({ text: lastInput })}>
      Retry
    </button>
  </div>
)}
```

## Keywords

ai sdk, vercel ai, chat, streaming, langchain, openai, anthropic, llm, agents, tools, mcp
