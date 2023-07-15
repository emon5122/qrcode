"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TQrBody, TQrBodyUrl, TqrBodyVCard, TqrSettings } from "@/types/qr";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { qrBody, qrBodyURL, qrBodyVCard } from "@/validators/qr";
import { useMutation } from "@tanstack/react-query";
import { myAxios } from "@/lib/data-fetcher";
import { CirclePicker } from "react-color";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

const Home = () => {
    const qrCodeBackgroundColors = [
        "#FFFFFF",
        "#FFD700",
        "#008000",
        "#4169E1",
        "#FFA500",
        "#FFC0CB",
    ];
    const qrCodeInsideColors = [
        "#000000",
        "#FF4500",
        "#00FF00",
        "#FF1493",
        "#FFFF00",
        "#00CED1",
    ];
    const [qr, setQr] = useState<string>("");
    const [margin, setMargin] = useState<number>(2);
    const [type, setType] = useState<"image/png" | "image/jpeg" | "image/webp">(
        "image/png"
    );
    const [darkColor, setDarkColor] = useState<string>("#000");
    const [lightColor, setLightColor] = useState<string>("#fff");
    const form = useForm<TQrBody>({
        resolver: zodResolver(qrBody),
    });
    const urlForm = useForm<TQrBodyUrl>({
        resolver: zodResolver(qrBodyURL),
    });
    const vCardForm = useForm<TqrBodyVCard>({
        resolver: zodResolver(qrBodyVCard),
    });
    const qrMutation = useMutation({
        mutationFn: async (body: TQrBody) => {
            console.log(type);
            const payload: TqrSettings = {
                margin: margin,
                type: type,
                color: { dark: darkColor, light: lightColor },
            };
            const res = await myAxios.post("qr?type=vCard", {
                text: body.text,
                payload,
            });
            setQr(res.data);
        },
    });
    return (
        <div className="flex flex-col justify-between gap-10 p-24">
            <div className="flex justify-center w-full">
                <div className="w-[300px] h-[300px] border-2 border-accent">
                    {qr !== "" && (
                        <Image
                            src={qr}
                            alt="qr"
                            width={300}
                            height={300}
                            className="select-none pointer-events-none"
                        />
                    )}
                </div>
            </div>
            <div className="flex flex-grid justify-evenly">
                <aside>
                    <Tabs defaultValue="text">
                        <TabsList>
                            <TabsTrigger value="text">Text</TabsTrigger>
                            <TabsTrigger value="vCard">vCard</TabsTrigger>
                            <TabsTrigger value="url">URL</TabsTrigger>
                        </TabsList>
                        <TabsContent value="text">
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
                                                <FormDescription>
                                                    This text will be the form
                                                    content
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit">Generate</Button>
                                </form>
                            </Form>
                        </TabsContent>
                        <TabsContent value="vCard">
                            <Form {...vCardForm}>
                                <form
                                    onSubmit={vCardForm.handleSubmit((data) => {
                                        qrMutation.mutate({ text: "asdas" }); //TODO: make function
                                        form.reset();
                                    })}
                                    className="flex flex-col gap-2"
                                >
                                    <FormField
                                        control={vCardForm.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    First Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Alan"
                                                        {...field}
                                                        type="text"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={vCardForm.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Last Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Joe"
                                                        {...field}
                                                        type="text"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={vCardForm.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="abc@example.com"
                                                        {...field}
                                                        type="email"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={vCardForm.control}
                                        name="website"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Website</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="https://example.com"
                                                        {...field}
                                                        type="url"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={vCardForm.control}
                                        name="company.name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Company Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Nexis LTD"
                                                        {...field}
                                                        type="text"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={vCardForm.control}
                                        name="company.designation"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Designation
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="CEO"
                                                        {...field}
                                                        type="text"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={vCardForm.control}
                                        name="contact.mobile"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="+88011115464"
                                                        {...field}
                                                        type="tel"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={vCardForm.control}
                                        name="contact.phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Tel</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="+880215464"
                                                        {...field}
                                                        type="tel"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={vCardForm.control}
                                        name="contact.fax"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Fax</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="text"
                                                        placeholder="fax"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={vCardForm.control}
                                        name="address.street"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Street</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Diabari"
                                                        {...field}
                                                        type="text"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={vCardForm.control}
                                        name="address.city"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>City</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Uttara"
                                                        {...field}
                                                        type="text"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={vCardForm.control}
                                        name="address.state"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>State</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Dhaka"
                                                        {...field}
                                                        type="text"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={vCardForm.control}
                                        name="address.country"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Country</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Bangladesh"
                                                        {...field}
                                                        type="text"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={vCardForm.control}
                                        name="address.zip"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>ZIP</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="1230"
                                                        {...field}
                                                        type="text"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit">Submit</Button>
                                </form>
                            </Form>
                        </TabsContent>
                        <TabsContent value="url">
                            <Form {...urlForm}>
                                <form
                                    onSubmit={urlForm.handleSubmit((data) => {
                                        qrMutation.mutate(data);
                                        form.reset();
                                    })}
                                    className="flex flex-col gap-2"
                                >
                                    <FormField
                                        control={urlForm.control}
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
                                                <FormDescription>
                                                    This text will be the form
                                                    content
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit">Submit</Button>
                                </form>
                            </Form>
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
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button type="button">Type</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem
                                onClick={() => {
                                    setType("image/png");
                                }}
                            >
                                PNG
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => {
                                    setType("image/jpeg");
                                }}
                            >
                                JPEG
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => {
                                    setType("image/webp");
                                }}
                            >
                                WEBP
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </aside>
            </div>
        </div>
    );
};
export default Home;
