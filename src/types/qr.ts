import { qrBody, qrBodyURL, qrBodyVCard, qrSettings } from '@/validators/qr';
import { z } from "zod";

export type TQrBody=z.infer<typeof qrBody>
export type TQrBodyUrl=z.infer<typeof qrBodyURL>
export type TqrBodyVCard=z.infer<typeof qrBodyVCard>
export type TqrSettings = z.infer<typeof qrSettings>