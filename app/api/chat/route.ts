import { UIMessage } from "ai";
import { aiChat } from "@/lib/ai-chat/chat";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const response = await aiChat(messages);

  return response;
}
