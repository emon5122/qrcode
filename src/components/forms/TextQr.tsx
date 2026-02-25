"use client";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TQrBody } from "@/types/qr";
import { qrBody } from "@/validators/qr";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";

const TextQr = ({ onGenerate }: { onGenerate: (text: string) => void }) => {
    const form = useForm<TQrBody>({
        resolver: zodResolver(qrBody),
        defaultValues: { text: "" },
    });
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((data) => onGenerate(data.text))}
                className="flex flex-col gap-4"
            >
                <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Text Content</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter any text to encode..."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="gap-2">
                    <Sparkles className="h-4 w-4" />
                    Generate QR Code
                </Button>
            </form>
        </Form>
    );
};
export default TextQr;
