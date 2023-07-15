import { qrBody, qrBodyURL, qrBodyVCard } from '@/validators/qr';
import { z } from "zod";

export type TQrBody=z.infer<typeof qrBody>
export type TQrBodyUrl=z.infer<typeof qrBodyURL>
export type TqrBodyVCard=z.infer<typeof qrBodyVCard>
