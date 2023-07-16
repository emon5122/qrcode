"use client";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TQrBodyUrl } from "@/types/qr";
import { qrBodyURL } from "@/validators/qr";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseMutationResult } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const UrlQr = ({
    qrMutation,
}: {
    qrMutation: UseMutationResult<
        void,
        unknown,
        {
            text: string;
        },
        unknown
    >;
}) => {
    const form = useForm<TQrBodyUrl>({
        resolver: zodResolver(qrBodyURL),
    });
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((data) => {
                    qrMutation.mutate(data);
                    form.reset();
                })}
                className="flex flex-col gap-2"
            >
                <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>URL</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="https://nexisltd.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Generate</Button>
            </form>
        </Form>
    );
};
export default UrlQr;
