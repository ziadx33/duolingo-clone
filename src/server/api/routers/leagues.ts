import {
  getLeague,
  getLeagueUsers,
  getLeagues,
} from "@/server/actions/leagues";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const leagues = createTRPCRouter({
  getLeague: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { id } = input;
      const league = await getLeague(id);
      return league;
    }),
  getLeagues: publicProcedure.query(async () => {
    const leagues = await getLeagues();
    return leagues;
  }),
  getLeagueUsers: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { id } = input;
      const users = await getLeagueUsers(id);
      return users;
    }),
});
