import { z } from "zod";
import isMobilePhone from "validator/lib/isMobilePhone";
import isHexColor from "validator/lib/isHexColor";
export const qrBody = z.object({
    text: z.string()
})
export const qrBodyURL = z.object({
    text: z.string().url()
})
export const qrBodyVCard = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    contact:z.object({
        mobile:z.string().refine(isMobilePhone).optional(),
        phone: z.string().optional(),
        fax: z.string().optional()
    }).optional(),
    email: z.string().email().optional(),
    company:z.object({
        name: z.string().optional(),
        designation: z.string().optional(),
    }).optional(),
    address:z.object({
        street: z.string().optional(),
        city:z.string().optional(),
        zip: z.string().optional(),
        state: z.string().optional(),
        country: z.string().optional()
    }).optional(),
    website: z.string().url().optional()
})

export const qrSettings=z.object({
    margin: z.number().default(2),
    type: z.enum(["image/png", "image/jpeg","image/webp"]).default("image/png"),
    color: z.object({dark:z.string().default("#000"),light:z.string().default("#fff")})
})

export const qrBodyAndSettings = z.object({})