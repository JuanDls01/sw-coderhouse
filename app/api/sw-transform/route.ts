import { cookies } from 'next/headers';
import { starWarsImageTransform } from '@/lib/ai/agents';
import { IMAGE_STYLE_PROMPTS } from '@/lib/ai/PROMPTS';
import { TRANSFORM_CONFIG } from '@/utils/consts';
import { validateImageDataUrl } from '@/utils/image';

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();

    // Rate limiting check
    const attemptsStr = cookieStore.get(TRANSFORM_CONFIG.COOKIE_NAME)?.value;
    const attempts = attemptsStr ? parseInt(attemptsStr, 10) : 0;

    if (attempts >= TRANSFORM_CONFIG.MAX_ATTEMPTS) {
      return Response.json(
        { error: 'Has alcanzado el límite de transformaciones. Vuelve más tarde.' },
        { status: 429 },
      );
    }

    const { image, style } = await req.json();

    // Validate required fields
    if (!image || !style) {
      return Response.json({ error: 'Image and style are required' }, { status: 400 });
    }

    // Validate style
    if (!(style in IMAGE_STYLE_PROMPTS)) {
      return Response.json({ error: 'Invalid style' }, { status: 400 });
    }

    // Validate image
    const imageError = validateImageDataUrl(image);
    if (imageError) {
      return Response.json({ error: imageError }, { status: 400 });
    }

    const { result, images } = await starWarsImageTransform({ image, style });

    if (images.length === 0) {
      return Response.json({ error: 'No image was generated' }, { status: 500 });
    }

    // Increment attempts on successful generation
    const response = Response.json({
      image: images[0],
      text: result.text,
      usage: result.usage,
      remainingAttempts: TRANSFORM_CONFIG.MAX_ATTEMPTS - (attempts + 1),
    });

    cookieStore.set(TRANSFORM_CONFIG.COOKIE_NAME, String(attempts + 1), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: TRANSFORM_CONFIG.COOKIE_MAX_AGE_SECONDS,
    });

    return response;
  } catch (error) {
    console.error('[AGENT] Error transforming image:', error);
    return Response.json({ error: 'Failed to transform image' }, { status: 500 });
  }
}
