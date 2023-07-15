import QRCode from "qrcode";

const generateQR = async (text: string) => {
    return await QRCode.toDataURL(text,{margin:2});
};
export default generateQR


