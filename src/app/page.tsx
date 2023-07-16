"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { CirclePicker } from "react-color";

import { myAxios } from "@/lib/data-fetcher";
import { imageValidator } from "@/validators/qr";
import { TQrBody, TqrSettings } from "@/types/qr";

import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QRCodeDisplay from "@/components/QrCodeDisplay";
import TextQr from "@/components/forms/TextQr";
import VCardQr from "@/components/forms/VCardQr";
import UrlQr from "@/components/forms/UrlQr";
import { qrCodeBackgroundColors, qrCodeInsideColors } from "@/lib/colors";

const Home = () => {
    
    const [qr, setQr] = useState<string>("");
    const [margin, setMargin] = useState<number>(2);
    const [logo, setLogo] = useState<unknown>("");
    const [darkColor, setDarkColor] = useState<string>("#000");
    const [lightColor, setLightColor] = useState<string>("#fff");

    const qrMutation = useMutation({
        mutationFn: async (body: TQrBody) => {
            const payload: TqrSettings = {
                margin: margin,
                color: { dark: darkColor, light: lightColor },
            };
            const res = await myAxios.post("qr?type=vCard", {
                text: body.text,
                payload,
            });
            setQr(res.data);
        },
    });
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.currentTarget?.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const validatedImage = imageValidator.safeParse(
                    event.target?.result
                );
                if (validatedImage.success) {
                    setLogo(validatedImage.data);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col justify-between gap-10 p-24">
            <section className="flex justify-center w-full">
                <QRCodeDisplay qr={qr} logo={logo as string} />
            </section>
            <section className="flex flex-grid justify-evenly">
                <aside>
                    <Tabs defaultValue="text">
                        <TabsList>
                            <TabsTrigger value="text">Text</TabsTrigger>
                            <TabsTrigger value="vCard">vCard</TabsTrigger>
                            <TabsTrigger value="url">URL</TabsTrigger>
                        </TabsList>
                        <TabsContent value="text">
                            <TextQr qrMutation={qrMutation} />
                        </TabsContent>
                        <TabsContent value="vCard">
                            <VCardQr qrMutation={qrMutation} />
                        </TabsContent>
                        <TabsContent value="url">
                            <UrlQr qrMutation={qrMutation} />
                        </TabsContent>
                    </Tabs>
                </aside>
                <aside>
                    <Label>Margin</Label>
                    <Slider
                        defaultValue={[margin]}
                        max={10}
                        step={1}
                        onValueCommit={(e) => setMargin(e[0])}
                    />
                    <Label>Inside Color</Label>
                    <CirclePicker
                        colors={qrCodeInsideColors}
                        color={darkColor}
                        onChangeComplete={(e) => setDarkColor(e.hex)}
                    />
                    <Label>Background Color</Label>
                    <CirclePicker
                        colors={qrCodeBackgroundColors}
                        color={lightColor}
                        onChangeComplete={(e) => setLightColor(e.hex)}
                    />
                    <Label>Logo</Label>
                    <Input type="file" onChange={handleImageChange} />
                </aside>
            </section>
        </div>
    );
};
export default Home;
