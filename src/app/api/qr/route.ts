import { qrBody, qrSettings } from "@/validators/qr"
import{ NextResponse, type NextRequest } from "next/server"
import QRCode from "qrcode";


export const POST = async(req:NextRequest)=>{
    const data = await req.json()
    const qrType = req.nextUrl.searchParams.get("qrType") || "text"
    const {text}= qrBody.parse(data)
    const settings = qrSettings.parse(data?.payload)
    const qr=await QRCode.toDataURL(text,{...settings,scale:10});
    return NextResponse.json(qr, { status: 200 });
}