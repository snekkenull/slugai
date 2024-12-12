import slugify from 'slugify';

/**
 * Generate a slug from the given string, optionally using AI to rewrite the content
 * @param {string} text - The text to convert to a slug
 * @param {Object} options - Configuration options
 * @returns {Promise<string>} The generated slug
 */
async function slugai(text, options = {}) {
  const defaults = {
    // slugify options
    replacement: '-',
    remove: undefined,
    lower: false,
    strict: false,
    locale: 'vi',
    trim: true,
    // ai options
    ai: false,
    model: 'gpt-4o',
    apikey: '',
    baseurl: 'api.openai.com'
  };

  const config = { ...defaults, ...options };
  const slugifyOptions = {
    replacement: config.replacement,
    remove: config.remove,
    lower: config.lower,
    strict: config.strict,
    locale: config.locale,
    trim: config.trim
  };

  let processedText = text;

  if (config.ai) {
    if (!config.apikey) {
      throw new Error('OpenAI API key is required when AI option is enabled');
    }

    try {
      const prompt = `Rewrite the following text in English while focusing on the main topic and key concepts. Keep it concise. 
        Do not provide any explanations or text apart from the rewrite.
        Original text (${config.locale}): "${text}"`;

      const response = await fetch(`https://${config.baseurl}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apikey}`
        },
        body: JSON.stringify({
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
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'AI processing failed');
      }

      const completion = await response.json();
      processedText = completion.choices[0].message.content.trim();
    } catch (error) {
      throw new Error(`AI processing failed: ${error.message}`);
    }
  }

  return slugify(processedText, slugifyOptions);
}

export default slugai;
