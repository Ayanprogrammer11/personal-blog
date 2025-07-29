import { readingTime } from "reading-time-estimator";
export function calculateReadingTime(content) {
  // Perfect for developer blogs with code blocks
  const stats = readingTime(content, {
    // Reading speeds for different content types
    wordsPerMinute: 200, // Regular text
    codeReadingSpeed: 80, // Code blocks (much slower)

    // Technical content adjustments
    includeStats: true,

    // Image/media time
    imageReadingTime: 0.08, // ~5 seconds per image

    // Code-specific settings
    codeBlockMultiplier: 1.5, // Code takes 50% longer to understand

    // Advanced options for dev content
    options: {
      // Detect and slow down for technical terms
      technicalContent: true,

      // Account for syntax highlighting complexity
      syntaxHighlighting: true,

      // Different speeds for inline vs block code
      inlineCodeSpeed: 150, // `code` snippets
      blockCodeSpeed: 80, // ```code blocks```

      // Account for different programming languages
      languageMultipliers: {
        javascript: 1.0,
        typescript: 1.1,
        python: 0.9,
        rust: 1.3,
        assembly: 1.8,
        sql: 1.1,
        bash: 1.2,
        yaml: 0.8,
        json: 0.7,
      },
    },
  });

  return {
    minutes: Math.ceil(stats.minutes),
    words: stats.words,
    codeBlocks: stats.codeBlocks || 0,
    images: stats.images || 0,
    text: `${Math.ceil(stats.minutes)} min read`,
  };
}
