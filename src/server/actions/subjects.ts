"use server";

import { unstable_cache } from "next/cache";
import { cache } from "react";
import prisma from "../db/prisma";

export const getSubject = unstable_cache(
  cache(async (id: string) => {
    try {
      const subject = await prisma.subject.findUnique({
        where: {
          id,
        },
      });
      return subject;
    } catch (err) {
      throw err;
    }
  }),
  ["subjects"],
);
