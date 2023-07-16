import Image from "next/image";

const QRCodeDisplay = ({ qr, logo }: { qr: string; logo: string }) => {
    return (
        <div className="w-[300px] h-[300px] border-2 border-accent relative">
            {qr !== "" && (
                <div className="flex flex-col items-center justify-center h-full">
                    <Image src={qr} alt="QR code" width={300} height={300} />
                    {logo !== "" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Image
                                src={logo as string}
                                alt="Logo"
                                width={50}
                                height={50}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default QRCodeDisplay;
