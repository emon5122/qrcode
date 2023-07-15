import { z } from "zod";
import isMobilePhone from "validator/lib/isMobilePhone";
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