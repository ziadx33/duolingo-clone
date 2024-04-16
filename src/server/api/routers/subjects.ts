import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { getSubjects } from "@/server/db/subjects";
import { type Subject } from "@prisma/client";

export const subjects = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    try {
      const subjects: Subject[] = await getSubjects();
      return subjects;
    } catch (error) {
      throw error;
    }
  }),
});
