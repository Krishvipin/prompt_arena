import { z } from "zod";

export const RAG_CHUNK_STATUSES = [
  "clean",
  "untrusted",
  "quarantined",
] as const;

export const RagChunkStatusSchema = z.enum(RAG_CHUNK_STATUSES);
export type RagChunkStatus = z.infer<typeof RagChunkStatusSchema>;

export const RagChunkSchema = z.object({
  id: z.string(),
  content: z.string(),
  status: RagChunkStatusSchema,
});

export type RagChunk = z.infer<typeof RagChunkSchema>;
