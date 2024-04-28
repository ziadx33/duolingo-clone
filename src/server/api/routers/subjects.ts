import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import prisma from "@/server/db/prisma";

export const subjects = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    try {
      const subjects = await prisma.subject.findMany();
      return subjects;
    } catch (error) {
      throw error;
    }
  }),
});
