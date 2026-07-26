import "dotenv/config";
import { HfInference, PROVIDERS } from "@huggingface/inference";

const client = new HfInference(process.env.HUGGING_FACE_TOKEN);

const EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2";

export async function getEmbedding(text: string): Promise<number[]> {
  const result = await client.featureExtraction({
    model: EMBEDDING_MODEL,
    inputs: text,
  });

  // featureExtraction can return number[] or number[][] depending on model/pooling
  const embedding = Array.isArray(result[0])
    ? (result as number[][])[0]
    : (result as number[]);

  return embedding;
}
