// Crawlers de IA y buscadores. «critico» = de búsqueda o agente: bloquearlos te saca de las respuestas.
// Los de entrenamiento (GPTBot, Google-Extended, CCBot…) NO deciden si apareces en ChatGPT o Perplexity.
export type CategoriaCrawler = "search" | "agent" | "training";

export interface Crawler {
  ua: string;
  empresa: string;
  categoria: CategoriaCrawler;
  critico: boolean;
  porque: string;
}

export const CRAWLERS_IA: Crawler[] = [
  { ua: "OAI-SearchBot", empresa: "OpenAI", categoria: "search", critico: true, porque: "Construye el índice de búsqueda de ChatGPT." },
  { ua: "ChatGPT-User", empresa: "OpenAI", categoria: "agent", critico: true, porque: "Visita tu web cuando alguien le pide a ChatGPT que la consulte." },
  { ua: "GPTBot", empresa: "OpenAI", categoria: "training", critico: false, porque: "Entrena modelos de OpenAI; bloquearlo no te saca de ChatGPT." },
  { ua: "PerplexityBot", empresa: "Perplexity", categoria: "search", critico: true, porque: "Indexa la web para las respuestas de Perplexity." },
  { ua: "Perplexity-User", empresa: "Perplexity", categoria: "agent", critico: true, porque: "Lee tu página cuando un usuario de Perplexity la abre." },
  { ua: "Claude-SearchBot", empresa: "Anthropic", categoria: "search", critico: true, porque: "Indexa la web para las búsquedas de Claude." },
  { ua: "Claude-User", empresa: "Anthropic", categoria: "agent", critico: true, porque: "Visita tu web cuando alguien se lo pide a Claude." },
  { ua: "ClaudeBot", empresa: "Anthropic", categoria: "training", critico: false, porque: "Entrena modelos de Anthropic." },
  { ua: "Googlebot", empresa: "Google", categoria: "search", critico: true, porque: "Indexa para Google y sus resúmenes con IA (AI Overviews)." },
  { ua: "Google-Extended", empresa: "Google", categoria: "training", critico: false, porque: "Controla el uso para entrenar Gemini; no afecta a Google Search." },
  { ua: "Bingbot", empresa: "Microsoft", categoria: "search", critico: true, porque: "Indexa para Bing y Copilot; ChatGPT también se apoya en Bing." },
  { ua: "Applebot", empresa: "Apple", categoria: "search", critico: true, porque: "Indexa para Siri y Spotlight." },
  { ua: "Applebot-Extended", empresa: "Apple", categoria: "training", critico: false, porque: "Controla el uso para entrenar la IA de Apple." },
  { ua: "DuckAssistBot", empresa: "DuckDuckGo", categoria: "search", critico: true, porque: "Respuestas con IA de DuckDuckGo." },
  { ua: "Meta-ExternalAgent", empresa: "Meta", categoria: "training", critico: false, porque: "Entrena modelos de Meta." },
  { ua: "Meta-ExternalFetcher", empresa: "Meta", categoria: "agent", critico: false, porque: "Recupera enlaces que comparten usuarios de Meta AI." },
  { ua: "Amazonbot", empresa: "Amazon", categoria: "search", critico: false, porque: "Indexa para Alexa y servicios de Amazon." },
  { ua: "MistralAI-User", empresa: "Mistral", categoria: "agent", critico: false, porque: "Consulta webs para Le Chat de Mistral." },
  { ua: "CCBot", empresa: "Common Crawl", categoria: "training", critico: false, porque: "Archivo público que usan muchos modelos para entrenar." },
  { ua: "Bytespider", empresa: "ByteDance", categoria: "training", critico: false, porque: "Entrena modelos de ByteDance." },
  { ua: "YouBot", empresa: "You.com", categoria: "search", critico: false, porque: "Buscador con IA You.com." },
];

export const CRAWLERS_CRITICOS = CRAWLERS_IA.filter((c) => c.critico);
