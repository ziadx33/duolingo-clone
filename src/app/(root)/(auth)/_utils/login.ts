"use server";

import { type LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/server/db/user";
import { compare } from "bcrypt";
import { type z } from "zod";

type RegisterParamsType = z.infer<typeof LoginSchema>;

export const login = async (
  { email, password }: RegisterParamsType,
  isCompare: boolean,
) => {
  try {
    const user = await getUserByEmail(email);
    if (!user?.emailVerified) {
      throw "email does not exist!";
    }
    const isCorrectPassword = isCompare
      ? compare(password, user.password)
      : password === user.password;
    if (!isCorrectPassword) {
      throw "wrong password!";
    }
  } catch (err) {
    throw new Error(err as string);
  }
};
