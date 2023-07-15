import { qrBody } from "@/validators/qr"
import{ NextResponse, type NextRequest } from "next/server"
import QRCode from "qrcode";


export const POST = async(req:NextRequest)=>{
    const data = await req.json()
    const validatedData= qrBody.parse(data)
    const qr=await QRCode.toDataURL(validatedData.text,{margin:2});
    return NextResponse.json(qr, { status: 200 });
}