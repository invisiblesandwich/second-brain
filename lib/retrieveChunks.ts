import { prisma } from "./prisma";
import { getEmbedding } from "./embeddings";

export async function retrieveChunks(
  question: string,
  userId: string,
  limit = 5,
) {
  const questionEmbedding = await getEmbedding(question);
  const vectorString = `[${questionEmbedding.join(",")}]`;

  const results = await prisma.$queryRawUnsafe<
    { chunkText: string; noteId: string; title: string; similarity: number }[]
  >(
    `
    SELECT
      e."chunkText",
      e."itemId" AS "noteId",
      n."title",
      1 - (e.embedding <=> $1::vector) AS similarity
  FROM "Embedding" e
  JOIN "Note" n
    ON n.id = e."itemId"
  WHERE
      e."itemType" = 'NOTE'
      AND n."userId" = $2
  ORDER BY e.embedding <=> $1::vector
  LIMIT $3
    `,
    vectorString,
    userId,
    limit,
  );

  return results;
}
