import { createAgentUIStreamResponse, UIMessage } from 'ai';
import { starWarsAgent } from '@/lib/ai-chat/agent';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  return createAgentUIStreamResponse({
    agent: starWarsAgent,
    uiMessages: messages,
  });
}
