import Footer from "@/components/Footer";
import Nav from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/context/themeProvider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "QR Studio — Free QR Code Generator | Nexis LTD",
    description:
        "Create customized QR codes for text, URLs, and contact cards instantly. A free tool by Nexis LTD — nexisltd.com",
    keywords: [
        "QR code generator",
        "free QR code",
        "vCard QR",
        "URL QR code",
        "Nexis LTD",
        "nexisltd.com",
    ],
    authors: [{ name: "Nexis LTD", url: "https://nexisltd.com" }],
    creator: "Nexis LTD",
    publisher: "Nexis LTD",
    metadataBase: new URL("https://qr.nexisltd.com"),
    openGraph: {
        title: "QR Studio — Free QR Code Generator",
        description:
            "Create customized QR codes for text, URLs, and contact cards instantly. A free tool by Nexis LTD.",
        url: "https://qr.nexisltd.com",
        siteName: "QR Studio by Nexis LTD",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "QR Studio — Free QR Code Generator",
        description:
            "Create customized QR codes for text, URLs, and contact cards instantly. A free tool by Nexis LTD.",
    },
    alternates: {
        canonical: "https://qr.nexisltd.com",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="min-h-screen flex flex-col">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Nav />
                    <main className="flex-1">
                        <TooltipProvider>{children}</TooltipProvider>
                    </main>
                    <Footer />
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
