import { unstable_cache } from "next/cache";
import { cache } from "react";
import prisma from "../db/prisma";

export const getLeague = unstable_cache(
  cache(async (id: string) => {
    try {
      const league = await prisma.league.findUnique({ where: { id } });
      return league;
    } catch (err) {
      throw err;
    }
  }),
  ["league", "id"],
);

export const getLeagueUsers = unstable_cache(
  cache(async (id: string) => {
    try {
      const users = await prisma.league.findUnique({ where: { id } }).User();
      return users;
    } catch (err) {
      throw err;
    }
  }),
  ["league-users", "league-id"],
);
