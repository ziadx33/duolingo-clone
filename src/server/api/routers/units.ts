import { getUnitsBySubjectId } from "@/server/actions/units";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const units = createTRPCRouter({
  getUnitsBySubjectId: publicProcedure
    .input(
      z.object({
        subjectId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { subjectId } = input;
      const units = await getUnitsBySubjectId(subjectId);
      return units;
    }),
});
