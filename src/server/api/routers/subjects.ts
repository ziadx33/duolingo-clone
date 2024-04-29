import { getSubject } from "@/server/actions/subjects";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import prisma from "@/server/db/prisma";
import { z } from "zod";

export const subjects = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    try {
      const subjects = await prisma.subject.findMany();
      return subjects;
    } catch (error) {
      throw error;
    }
  }),
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      const subject = await getSubject(id);
      return subject;
    }),
  getIn: publicProcedure
    .input(z.object({ ids: z.string().array() }))
    .query(async ({ input }) => {
      const { ids } = input;
      try {
        const subjects = await prisma.subject.findMany({
          where: {
            id: {
              in: ids,
            },
          },
        });
        return subjects;
      } catch (err) {
        throw err;
      }
    }),
});
