"use server";

import prisma from "@/server/db/prisma";
import { type User } from "@prisma/client";

export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
}

export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
}

export async function updateUserById(id: string, data: Partial<User>) {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data,
    });
    return updatedUser;
  } catch (error) {
    throw error;
  }
}
