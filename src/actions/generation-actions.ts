import { db } from "@/drizzle/db";
import { generations } from "@/drizzle/schema";
import { eq, InferInsertModel } from "drizzle-orm";

export async function listUserGenerations(userId: string) {
  const generationsList = await db
    .select()
    .from(generations)
    .where(eq(generations.userId, userId));
  return generationsList;
}

type GenerationInputType = Omit<
  InferInsertModel<typeof generations>,
  "id" | "createdAt"
>;

export async function createGeneration(generation: GenerationInputType) {
  const [newGeneration] = await db.insert(generations).values(generation).returning()
  return newGeneration;
}
