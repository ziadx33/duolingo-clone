import {
  getPracticesByUnitId,
  getPracticesByUnitIds,
} from "@/server/actions/practices";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const practices = createTRPCRouter({
  getPracticesByUnitId: publicProcedure
    .input(
      z.object({
        unitId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { unitId } = input;
      const practices = await getPracticesByUnitId(unitId);
      return practices;
    }),
  getPracticesByUnitIds: publicProcedure
    .input(
      z.object({
        unitIds: z.string().array(),
      }),
    )
    .query(async ({ input }) => {
      const { unitIds } = input;
      const practices = await getPracticesByUnitIds(unitIds);
      return practices;
    }),
});
