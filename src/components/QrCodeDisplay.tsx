"use client";

import { Button } from "@/components/ui/button";
import { Download, QrCode } from "lucide-react";

const QRCodeDisplay = ({ qr, logo }: { qr: string; logo: string }) => {
    const handleDownload = () => {
        if (!qr) return;
        const link = document.createElement("a");
        link.download = "qrcode.png";
        link.href = qr;
        link.click();
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="w-[240px] h-[240px] rounded-xl border-2 border-dashed border-border bg-muted/30 flex items-center justify-center overflow-hidden relative transition-all duration-300">
                {qr ? (
                    <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={qr}
                            alt="QR code"
                            width={240}
                            height={240}
                            className="rounded-lg"
                        />
                        {logo && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-white rounded-md p-1 shadow-sm">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={logo}
                                        alt="Logo"
                                        width={44}
                                        height={44}
                                    />
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground/50">
                        <QrCode className="h-14 w-14" />
                        <p className="text-xs font-medium text-center px-4">
                            Your QR code appears here
                        </p>
                    </div>
                )}
            </div>
            {qr && (
                <Button
                    onClick={handleDownload}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                >
                    <Download className="h-4 w-4" />
                    Download PNG
                </Button>
            )}
        </div>
    );
};

export default QRCodeDisplay;
