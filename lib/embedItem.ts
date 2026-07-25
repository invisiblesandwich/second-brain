import { prisma } from "./prisma"; // adjust to wherever your prisma client is exported
import { getEmbedding } from "./embeddings";
import { chunkText } from "./chunkText";

export async function embedItem(
  itemType: string,
  itemId: string,
  text: string,
) {
  await prisma.$executeRawUnsafe(
    `DELETE FROM "Embedding" WHERE "itemType" = $1 AND "itemId" = $2`,
    itemType,
    itemId,
  );

  const chunks = chunkText(text);

  for (const chunk of chunks) {
    const embedding = await getEmbedding(chunk);
    const vectorString = `[${embedding.join(",")}]`;

    await prisma.$executeRawUnsafe(
      `
      INSERT INTO "Embedding" (id, "chunkText", embedding, "itemType", "itemId")
      VALUES (gen_random_uuid()::text, $1, $2::vector, $3, $4)
    `,
      chunk,
      vectorString,
      itemType,
      itemId,
    );
  }
}
