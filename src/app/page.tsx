"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TQrBody } from "@/types/qr";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { qrBody } from "@/validators/qr";
import { useMutation } from "@tanstack/react-query";
import { myAxios } from "@/lib/data-fetcher";
const Home = () => {
    const [qr, setQr] = useState<string>("");

    const form = useForm<TQrBody>({
        resolver: zodResolver(qrBody),
    });
    const qrMutation = useMutation({
        mutationFn: async (body: TQrBody) => {
            const res = await myAxios.post("qr", body);
            setQr(res.data);
        },
    });
    return (
        <main className="flex min-h-screen flex-col items-center gap-2 p-24">
            <div className="w-[300px] h-[300px] border-2 border-accent">
                {qr !== "" && (
                    <Image src={qr} alt="qr" width={300} height={300} />
                )}
            </div>
            <form
                onSubmit={form.handleSubmit((data) => {
                    qrMutation.mutate(data);
                    form.reset();
                })}
                className="flex flex-col gap-2"
            >
                <div className="flex flex-row justify-between">
                    <Label htmlFor="text">QR code Text</Label>
                    <Input type="text" {...form.register("text")} />
                </div>
                <Button className="flex justify-center" type="submit">
                    Generate
                </Button>
            </form>
        </main>
    );
};
export default Home;
