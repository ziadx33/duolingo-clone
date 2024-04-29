import {
  getSubject,
  getSubjects,
  getSubjectsIn,
} from "@/server/actions/subjects";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const subjects = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const subjects = await getSubjects();
    return subjects;
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
      const subjects = await getSubjectsIn(ids);
      return subjects;
    }),
});
