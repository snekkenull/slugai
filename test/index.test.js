const slugai = require('../index');

describe('slugai', () => {
  test('basic slugify without AI', async () => {
    const result = await slugai('Hello World');
    expect(result).toBe('Hello-World');
  });

  test('slugify with lowercase', async () => {
    const result = await slugai('Hello World', { lower: true });
    expect(result).toBe('hello-world');
  });

  test('slugify with Vietnamese text', async () => {
    const result = await slugai('Tôi yêu ẩm thực Việt Nam', { lower: true });
    expect(result).toBe('toi-yeu-am-thuc-viet-nam');
  });

  test('throws error when AI is enabled but no API key provided', async () => {
    await expect(slugai('test', { ai: true }))
      .rejects
      .toThrow('OpenAI API key is required when AI option is enabled');
  });
});
