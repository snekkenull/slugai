const slugify = require('slugify');
const OpenAI = require('openai');

/**
 * Generate a slug from the given string, optionally using AI to rewrite the content
 * @param {string} text - The text to convert to a slug
 * @param {Object} options - Configuration options
 * @returns {Promise<string>} The generated slug
 */
async function slugai(text, options = {}) {
  const defaults = {
    replacement: '-',
    remove: undefined,
    lower: false,
    strict: false,
    locale: 'vi',
    trim: true,
    ai: false,
    model: 'gpt-4o',
    apikey: '',
    baseurl: 'api.openai.com'
  };

  const config = { ...defaults, ...options };

  let processedText = text;

  if (config.ai) {
    if (!config.apikey) {
      throw new Error('OpenAI API key is required when AI option is enabled');
    }

    try {
      const openai = new OpenAI({
        apiKey: config.apikey,
        baseURL: `https://${config.baseurl}/v1`
      });

      const prompt = `Rewrite the following text in English to be more SEO-friendly and semantic, 
        focusing on the main topic and key concepts. Keep it concise.
        Original text (${config.locale}): "${text}"`;

      const completion = await openai.chat.completions.create({
        model: config.model,
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that rewrites text to be more SEO-friendly and semantic."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 100
      });

      processedText = completion.choices[0].message.content.trim();
    } catch (error) {
      throw new Error(`AI processing failed: ${error.message}`);
    }
  }

  return slugify(processedText, {
    replacement: config.replacement,
    remove: config.remove,
    lower: config.lower,
    strict: config.strict,
    locale: config.locale,
    trim: config.trim
  });
}

module.exports = slugai;
