import * as z from "zod";
import * as imports from "../null";

export const SubjectModel = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string(),
});
