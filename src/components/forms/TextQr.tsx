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
import { TQrBody } from "@/types/qr";
import { qrBody } from "@/validators/qr";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseMutationResult } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const TextQr = ({
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
    const form = useForm<TQrBody>({
        resolver: zodResolver(qrBody),
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
                            <FormLabel>Text</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Nexis is the best IT company"
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
export default TextQr;
