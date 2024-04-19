import { api } from "@/trpc/server";
import { v4 as uuidv4 } from "uuid";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await api.auth.verificationTokens.get.byEmail({
    email,
  });

  if (existingToken) {
    await api.auth.verificationTokens.delete.byId({ id: existingToken.id });
  }

  const verificationToken = await api.auth.verificationTokens.create({
    email,
    token,
    expires,
  });

  return verificationToken;
};
