# slugai

AI-powered slug generator with multilingual support. This package extends the functionality of `slugify` by adding AI-powered content rewriting capabilities using OpenAI API compatible models.

## Installation

```bash
npm install slugai
```

## Usage

```javascript
const slugai = require('slugai');

// Basic usage (without AI)
const slug = await slugai('Hello World');
// Output: hello-world

// With AI rewriting
const aiSlug = await slugai('Tôi yêu ẩm thực Việt Nam', {
  ai: true,
  locale: 'vi',
  apikey: 'your-openai-api-key'
});
// Output: vietnamese-cuisine-love

// Advanced options
const customSlug = await slugai('Your text here', {
  replacement: '-',    // replace spaces with replacement character
  remove: undefined,   // remove characters that match regex
  lower: false,       // convert to lower case
  strict: false,      // strip special characters except replacement
  locale: 'vi',       // language code of the locale to use
  trim: true,         // trim leading and trailing replacement chars
  ai: false,          // enable AI conversions
  model: "gpt-4o",     // the model used for AI conversions
  apikey: "sk-xxx",   // the apikey for LLM provider
  baseurl: "api.openai.com" // the baseurl of API provider
});
```

## Options

- `replacement` (string): Character to replace spaces with (default: '-')
- `remove` (regex): Characters to remove (default: undefined)
- `lower` (boolean): Convert to lower case (default: false)
- `strict` (boolean): Strip special characters except replacement (default: false)
- `locale` (string): Language code of the locale to use
- `trim` (boolean): Trim leading and trailing replacement chars (default: true)
- `ai` (boolean): Enable AI-powered content rewriting (default: false)
- `model` (string): OpenAI model to use (default: "gpt-4")
- `apikey` (string): OpenAI API key
- `baseurl` (string): API base URL (default: "api.openai.com")

## License

MIT
