"use server";

import { revalidatePath } from "next/cache";

export async function revalidateAPI(path: string) {
  revalidatePath(path);
}
