"use server";

import prisma from "@/server/db/prisma";

export async function test(userId: string) {
  const res = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name: "homiex3",
    },
  });
  return res;
}
