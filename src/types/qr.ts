import { qrBody } from '@/validators/qr';
import { z } from "zod";

export type TQrBody=z.infer<typeof qrBody>
