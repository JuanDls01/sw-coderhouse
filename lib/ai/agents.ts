import { google } from '@ai-sdk/google';
import { ImagePart, ModelMessage, ToolLoopAgent, generateText } from 'ai';
import { IMAGE_STYLE_PROMPTS, STAR_WARS_CHAT_SYSTEM_PROMPT, SwImageStyle } from './PROMPTS';
import { swapiTools } from './tools';

export const starWarsAgent = new ToolLoopAgent({
  model: google('gemini-3-flash-preview'),
  instructions: STAR_WARS_CHAT_SYSTEM_PROMPT,
  tools: swapiTools,
  onFinish: ({ totalUsage }) => {
    console.log('[AGENT] Token usage:', {
      inputTokens: totalUsage.inputTokens,
      outputTokens: totalUsage.outputTokens,
      totalTokens: totalUsage.totalTokens,
    });
  },
});

export const starWarsImageTransform = async ({
  image,
  style,
}: {
  image: ImagePart['image'];
  style: SwImageStyle;
}) => {
  const prompt = IMAGE_STYLE_PROMPTS[style] || IMAGE_STYLE_PROMPTS.jedi;
  const message: ModelMessage = {
    role: 'user',
    content: [
      { type: 'image', image },
      { type: 'text', text: prompt },
    ],
  };

  const result = await generateText({
    model: google('gemini-2.5-flash-image'),
    messages: [message],
  });

  const images = [];
  for (const file of result.files) {
    if (file.mediaType.startsWith('image/')) {
      images.push({
        base64: file.base64,
        mediaType: file.mediaType,
      });
    }
  }

  return { result, images };
};
