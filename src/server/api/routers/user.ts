import prisma from "@/server/db/prisma";
import { type User } from "@prisma/client";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { RegisterSchema } from "@/schemas";
import { UserModel } from "prisma/zod";
import { z } from "zod";
import { hash } from "bcrypt";
import { BCRYPT_SALT } from "@/lib/bcrypt";
import { getUserByEmail, getUserById, updateUserById } from "@/server/db/user";
import { getServerAuthSession } from "@/server/auth";

export const user = createTRPCRouter({
  create: publicProcedure
    .input(RegisterSchema.and(z.object({ currentSubjectId: z.string() })))
    .output(UserModel)
    .mutation(async (opts) => {
      const { email, password, name, currentSubjectId } = opts.input;
      try {
        const createdUser: User = await prisma.user.create({
          data: {
            email,
            name,
            password: await hash(password, BCRYPT_SALT),
            currentSubjectId,
          },
        });
        return createdUser;
      } catch (error) {
        throw error;
      }
    }),
  exist: publicProcedure.input(z.string()).query(async ({ input: email }) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      return !!user;
    } catch (error) {
      throw error;
    }
  }),
  get: {
    byEmail: publicProcedure
      .input(z.object({ email: z.string() }))
      .query(async ({ input }) => {
        const { email } = input;
        const user = await getUserByEmail(email);
        return user;
      }),
    byId: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }) => {
        const { id } = input;
        const user = await getUserById(id);
        return user;
      }),
  },
  update: publicProcedure
    .input(z.object({ id: z.string(), data: UserModel.partial() }))
    .mutation(async ({ input }) => {
      const { id, data } = input;
      const updated = updateUserById(id, data);
      return updated;
    }),
  subjects: {
    getAll: publicProcedure.query(async () => {
      const user = await getServerAuthSession();
      const subjects = await prisma.subject.findMany({
        where: {
          id: {
            in: user.user?.subjectIds || [],
          },
        },
      });
      return subjects;
    }),
    add: publicProcedure
      .input(z.object({ subjectId: z.string() }))
      .mutation(async ({ input }) => {
        const { subjectId } = input;
        try {
          const user = await getServerAuthSession();
          await prisma.user.update({
            where: {
              id: user.user?.id,
            },
            data: {
              subjectIds: {
                push: subjectId,
              },
            },
          });
        } catch (err) {
          throw err;
        }
      }),
    remove: publicProcedure
      .input(z.object({ subjectId: z.string() }))
      .mutation(async ({ input }) => {
        const { subjectId } = input;
        try {
          const user = await getServerAuthSession();
          await prisma.user.update({
            where: {
              id: user.user?.id,
            },
            data: {
              subjectIds: {
                set: user.user?.subjectIds.filter((id) => id !== subjectId),
              },
            },
          });
        } catch (err) {
          throw err;
        }
      }),
  },
});
