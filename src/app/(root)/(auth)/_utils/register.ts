"use server";

import { transporter } from "@/lib/emails";
import { generateVerificationToken } from "@/lib/tokens";
import { type RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/server/db/user";
import { api } from "@/trpc/server";
import { type z } from "zod";

type RegisterParamsType = z.infer<typeof RegisterSchema>;

export const register = async (
  { email, name, password }: RegisterParamsType,
  origin: string,
) => {
  const exists = await getUserByEmail(email);
  if (exists) throw "user already registered";
  await api.auth.user.create({
    email,
    name,
    password,
    currentSubjectId: "1",
  });
  const verificationCode = await generateVerificationToken(email);
  const confirmLink = `${origin}/verification-token?token=${verificationCode.token}`;
  await transporter.send({
    to: email,
    from: "hatemziad384@gmail.com",
    subject: "your code",
    html: `your verification link: <a href="${confirmLink}">Link</a>`,
  });
};
