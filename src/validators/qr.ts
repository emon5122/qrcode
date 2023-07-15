import { z } from "zod";

export const qrBody = z.object({
    text: z.string()
})