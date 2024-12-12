import slugai from '../index.js';

describe('slugai', () => {
  test('basic slugify without AI', async () => {
    const result = await slugai('Hello World');
    expect(result).toBe('Hello-World');
  });

  test('slugify with lowercase', async () => {
    const result = await slugai('Hello World', { lower: true });
    expect(result).toBe('hello-world');
  });
});
