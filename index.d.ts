interface SlugAIOptions {
    // slugify options
    replacement?: string;
    remove?: RegExp | string;
    lower?: boolean;
    strict?: boolean;
    locale?: string;
    trim?: boolean;
    // ai options
    ai?: boolean;
    model?: string;
    apikey?: string;
}

declare function slugai(text: string, options?: SlugAIOptions): Promise<string>;

export default slugai;
