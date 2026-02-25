"use client";

import QRCode from "qrcode";
import { useCallback, useEffect, useState } from "react";

import { imageValidator } from "@/validators/qr";

import QRCodeDisplay from "@/components/QrCodeDisplay";
import TextQr from "@/components/forms/TextQr";
import UrlQr from "@/components/forms/UrlQr";
import VCardQr from "@/components/forms/VCardQr";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { qrCodeBackgroundColors, qrCodeInsideColors } from "@/lib/colors";
import { Contact, Globe, Palette, SlidersHorizontal, Type } from "lucide-react";

function ColorSwatch({
    colors,
    selected,
    onChange,
}: {
    colors: string[];
    selected: string;
    onChange: (color: string) => void;
}) {
    return (
        <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
                <button
                    key={color}
                    type="button"
                    onClick={() => onChange(color)}
                    className={`w-7 h-7 rounded-full border-2 transition-all duration-200 ${selected === color
                        ? "border-primary scale-110 ring-2 ring-primary/30"
                        : "border-border hover:scale-105"
                        }`}
                    style={{ backgroundColor: color }}
                    aria-label={`Select color ${color}`}
                />
            ))}
        </div>
    );
}

export default function Home() {
    const [qrText, setQrText] = useState<string>("");
    const [qr, setQr] = useState<string>("");
    const [margin, setMargin] = useState<number>(2);
    const [logo, setLogo] = useState<string>("");
    const [darkColor, setDarkColor] = useState<string>("#000000");
    const [lightColor, setLightColor] = useState<string>("#FFFFFF");

    // Real-time QR generation — re-renders on any setting change
    useEffect(() => {
        if (!qrText) {
            setQr("");
            return;
        }
        let cancelled = false;
        QRCode.toDataURL(qrText, {
            margin,
            color: { dark: darkColor, light: lightColor },
            scale: 10,
        })
            .then((url) => {
                if (!cancelled) setQr(url);
            })
            .catch(() => {
                if (!cancelled) setQr("");
            });
        return () => {
            cancelled = true;
        };
    }, [qrText, margin, darkColor, lightColor]);

    const onGenerate = useCallback((text: string) => {
        setQrText(text);
    }, []);

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
        <div className="container max-w-6xl mx-auto px-4 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
                {/* Left Column — Preview + Customization */}
                <div className="lg:col-span-2 flex flex-col gap-5">
                    {/* QR Preview Card */}
                    <div className="rounded-2xl border bg-card p-5 shadow-sm">
                        <h2 className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-widest">
                            Preview
                        </h2>
                        <QRCodeDisplay qr={qr} logo={logo} />
                    </div>

                    {/* Customization Card */}
                    <div className="rounded-2xl border bg-card p-5 shadow-sm space-y-4">
                        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                            <SlidersHorizontal className="h-3.5 w-3.5" />
                            Customize
                        </h2>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium">
                                    Margin
                                </Label>
                                <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
                                    {margin}
                                </span>
                            </div>
                            <Slider
                                defaultValue={[margin]}
                                max={10}
                                step={1}
                                onValueCommit={(e) => setMargin(e[0])}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-sm font-medium flex items-center gap-1.5">
                                    <Palette className="h-3.5 w-3.5 text-muted-foreground" />
                                    Foreground
                                </Label>
                                <ColorSwatch
                                    colors={qrCodeInsideColors}
                                    selected={darkColor}
                                    onChange={setDarkColor}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium flex items-center gap-1.5">
                                    <Palette className="h-3.5 w-3.5 text-muted-foreground" />
                                    Background
                                </Label>
                                <ColorSwatch
                                    colors={qrCodeBackgroundColors}
                                    selected={lightColor}
                                    onChange={setLightColor}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium">
                                Logo Overlay
                            </Label>
                            <div className="flex gap-2 items-center">
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="cursor-pointer file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-colors flex-1"
                                />
                                {logo && (
                                    <button
                                        type="button"
                                        onClick={() => setLogo("")}
                                        className="text-xs text-destructive hover:text-destructive/80 font-medium whitespace-nowrap"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column — Generator */}
                <div className="lg:col-span-3">
                    <div className="rounded-2xl border bg-card p-5 shadow-sm h-full">
                        <h2 className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-widest">
                            Generate
                        </h2>
                        <Tabs defaultValue="text" className="w-full">
                            <TabsList className="grid w-full grid-cols-3 mb-4">
                                <TabsTrigger
                                    value="text"
                                    className="flex items-center gap-1.5 text-sm"
                                >
                                    <Type className="h-3.5 w-3.5" />
                                    Text
                                </TabsTrigger>
                                <TabsTrigger
                                    value="url"
                                    className="flex items-center gap-1.5 text-sm"
                                >
                                    <Globe className="h-3.5 w-3.5" />
                                    URL
                                </TabsTrigger>
                                <TabsTrigger
                                    value="vcard"
                                    className="flex items-center gap-1.5 text-sm"
                                >
                                    <Contact className="h-3.5 w-3.5" />
                                    vCard
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="text">
                                <TextQr onGenerate={onGenerate} />
                            </TabsContent>
                            <TabsContent value="url">
                                <UrlQr onGenerate={onGenerate} />
                            </TabsContent>
                            <TabsContent value="vcard">
                                <VCardQr onGenerate={onGenerate} />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
}
