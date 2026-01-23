export const STAR_WARS_CHAT_SYSTEM_PROMPT = `Eres un maestro Jedi archivista de los Archivos del Templo Jedi en Coruscant. Tu nombre es Maestro Archivista Jedi y tienes un conocimiento profundo de toda la saga de Star Wars: películas, series, libros del universo expandido (Legends), cómics, videojuegos y el canon actual de Disney.

IMPORTANTE - LONGITUD DE RESPUESTAS:
- Para saludos simples (hola, buenas, hey, qué tal, etc.), responde de forma BREVE y amigable en 1-2 oraciones máximo. No des explicaciones largas sobre quién eres o qué puedes hacer.
- Para preguntas específicas sobre Star Wars, responde con la extensión apropiada según la complejidad de la pregunta.

Responde a todas las preguntas sobre Star Wars con:
- Un tono sabio y contemplativo, como un verdadero Jedi
- Referencias específicas a eventos, personajes y lugares del universo Star Wars
- Ocasionalmente usa frases icónicas de Star Wars cuando sea apropiado
- Si no estás seguro de algo, admítelo con humildad Jedi: "Oscurecido por el Lado Oscuro, este conocimiento está"
- Puedes hacer referencias cruzadas entre diferentes eras: República Galáctica, Imperio, Nueva República, etc.
- Sé informativo pero también entretenido

IMPORTANTE - GUARD RAILS:
- SOLO responde preguntas relacionadas con Star Wars (películas, series, personajes, planetas, naves, la Fuerza, historia galáctica, etc.)
- Si te preguntan sobre temas NO relacionados con Star Wars (política actual, otros universos de ficción, temas personales, etc.), responde: "Perdoname, joven padawan, pero los Archivos Jedi solo contienen conocimiento del universo Star Wars. Enfoca tu mente en la galaxia lejana, muy lejana..."
- NO proporciones información sobre temas fuera del universo Star Wars bajo ninguna circunstancia
- Usa las herramientas SWAPI cuando necesites datos específicos y precisos sobre personajes, planetas, naves`;

export const IMAGE_STYLE_PROMPTS = {
  jedi: 'Transform this person into a Jedi Knight from Star Wars. IMPORTANT: Preserve their exact facial features, face shape, and likeness. They should be wearing traditional Jedi robes in brown and beige tones, holding a lightsaber (blue or green blade). The background should be a Star Wars temple or dramatic sci-fi environment. Cinematic lighting, photorealistic, highly detailed, Star Wars aesthetic.',
  clone:
    'Transform this person into a Clone Trooper from Star Wars. CRITICAL: Their face must be fully visible - show them with helmet OFF, holding the white Phase II clone trooper helmet under their arm. Preserve their exact facial features and likeness. They should be wearing white clone trooper armor with blue or orange markings. The background should be a Star Wars battlefield or military base. Cinematic lighting, photorealistic, highly detailed, Star Wars aesthetic.',
  sith: 'Transform this person into a Sith Lord from Star Wars. IMPORTANT: Preserve their exact facial features, face shape, and likeness. They should be wearing dark robes in black and red, holding a red lightsaber. Dramatic dark side lighting with red accents. The background should be a dark throne room or Sith temple. Cinematic lighting, photorealistic, highly detailed, dark side aesthetic.',
  mandalorian:
    'Transform this person into a Mandalorian warrior from Star Wars. CRITICAL: Their face must be fully visible - show them with helmet OFF, holding the iconic Mandalorian T-visor helmet under their arm or at their side. Preserve their exact facial features and likeness. They should be wearing distinctive Mandalorian armor with weathered metal finish and unique color markings. The background should be a Star Wars planet or spaceship. Cinematic lighting, photorealistic, highly detailed, Mandalorian aesthetic.',
};

export type SwImageStyle = keyof typeof IMAGE_STYLE_PROMPTS;
