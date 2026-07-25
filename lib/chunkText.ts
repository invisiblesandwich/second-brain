export function chunkText(text: string, maxChars = 1000, overlap = 100): string[] {
  if (text.length <= maxChars) return [text];

  const chunks: string[] = [];
  let start = 0;

  while (start < text.length) {
    const end = Math.min(start + maxChars, text.length);
    chunks.push(text.slice(start, end));
    start += maxChars - overlap;
  }

  return chunks;
}