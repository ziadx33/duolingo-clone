import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import prisma from "@/server/db/prisma";
import { VerificationTokenModel } from "prisma/zod";
import { z } from "zod";
import { getUserByEmail, updateUserById } from "@/server/db/user";

async function getVerificationTokenByToken(token: string) {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        token,
      },
    });
    return verificationToken;
  } catch (error) {
    throw error;
  }
}

async function deleteVerificationCodeById(id: string) {
  try {
    const verificationToken = await prisma.verificationToken.delete({
      where: {
        id,
      },
    });
    return verificationToken;
  } catch (error) {
    throw error;
  }
}

export const verificationTokens = createTRPCRouter({
  get: {
    byEmail: publicProcedure
      .input(z.object({ email: z.string() }))
      .query(async ({ input }) => {
        const { email } = input;
        try {
          const verificationToken = await prisma.verificationToken.findFirst({
            where: {
              email,
            },
          });
          return verificationToken;
        } catch (error) {
          throw error;
        }
      }),
    byToken: publicProcedure
      .input(z.object({ token: z.string() }))
      .query(async ({ input }) => {
        const { token } = input;
        const verificationToken = await getVerificationTokenByToken(token);
        return verificationToken;
      }),
  },
  delete: {
    byId: publicProcedure
      .input(
        z.object({
          id: z.string(),
        }),
      )
      .mutation(async ({ input }) => {
        const { id } = input;
        const deleted = deleteVerificationCodeById(id);
        return deleted;
      }),
  },
  create: publicProcedure
    .input(VerificationTokenModel.omit({ id: true }))
    .mutation(async ({ input }) => {
      const { email, expires, token } = input;
      try {
        const verificationToken = await prisma.verificationToken.create({
          data: {
            email,
            expires,
            token,
          },
        });
        return verificationToken;
      } catch (error) {
        throw error;
      }
    }),
  verify: publicProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ input }) => {
      const { token } = input;
      const existingToken = await getVerificationTokenByToken(token);
      if (!existingToken) throw { error: "Token does not exist!" };

      const hasExpired = new Date(existingToken.expires) < new Date();

      if (hasExpired) throw { error: "Token has expired" };

      const existingUser = await getUserByEmail(existingToken.email);

      if (!existingUser) throw { error: "Email does not exist!" };

      await updateUserById(existingUser.id, {
        emailVerified: new Date(),
      });

      return { success: "email verified" };
    }),
});
