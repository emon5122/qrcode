"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import generateQR from "@/lib/qr-generator";
import Image from "next/image";
import { useState } from "react";
const Home = () => {
    const [text, setText] = useState<string>("");
    const [qr, setQr] = useState<string>("");

    return (
        <main className="flex min-h-screen flex-col items-center gap-2 p-24">
            <div className="w-[300px] h-[300px] border-2 border-accent">
                {qr !== "" && (
                    <Image src={qr} alt="qr" width={300} height={300} />
                )}
            </div>
            <Label htmlFor="text">QR code Text</Label>
            <Input
                onChange={(e) => {
                    setText(e.target.value);
                }}
            />
            <Button
                onClick={async () => {
                    const res = await generateQR(text);
                    setQr(res);
                }}
            >
                Generate
            </Button>
        </main>
    );
};
export default Home;
