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
import { Separator } from "@/components/ui/separator";
import { TqrBodyVCard } from "@/types/qr";
import { qrBodyVCard } from "@/validators/qr";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";

function buildVCardString(data: TqrBodyVCard): string {
    const lines: string[] = ["BEGIN:VCARD", "VERSION:3.0"];
    const fullName = [data.firstName, data.lastName].filter(Boolean).join(" ");
    if (fullName) {
        lines.push(`FN:${fullName}`);
        lines.push(`N:${data.lastName || ""};${data.firstName || ""};;;`);
    }
    if (data.company?.name) lines.push(`ORG:${data.company.name}`);
    if (data.company?.designation)
        lines.push(`TITLE:${data.company.designation}`);
    if (data.contact?.mobile)
        lines.push(`TEL;TYPE=CELL:${data.contact.mobile}`);
    if (data.contact?.phone)
        lines.push(`TEL;TYPE=WORK:${data.contact.phone}`);
    if (data.contact?.fax) lines.push(`TEL;TYPE=FAX:${data.contact.fax}`);
    if (data.email) lines.push(`EMAIL:${data.email}`);
    if (data.address) {
        const { street, city, state, zip, country } = data.address;
        if (street || city || state || zip || country) {
            lines.push(
                `ADR;TYPE=WORK:;;${street || ""};${city || ""};${state || ""};${zip || ""};${country || ""}`
            );
        }
    }
    if (data.website) lines.push(`URL:${data.website}`);
    lines.push("END:VCARD");
    return lines.join("\n");
}

const VCardQr = ({ onGenerate }: { onGenerate: (text: string) => void }) => {
    const form = useForm<TqrBodyVCard>({
        resolver: zodResolver(qrBodyVCard),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            website: "",
        },
    });
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((data) => {
                    const vCardText = buildVCardString(data);
                    onGenerate(vCardText);
                })}
                className="flex flex-col gap-3 max-h-[55vh] overflow-y-auto pr-1"
            >
                {/* Personal Info */}
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Personal
                </p>
                <div className="grid grid-cols-2 gap-3">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="john@example.com"
                                        type="email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Website</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="https://example.com"
                                        type="url"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Separator />

                {/* Company */}
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Company
                </p>
                <div className="grid grid-cols-2 gap-3">
                    <FormField
                        control={form.control}
                        name="company.name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Acme Inc."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="company.designation"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Software Engineer"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Separator />

                {/* Contact */}
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Contact
                </p>
                <div className="grid grid-cols-3 gap-3">
                    <FormField
                        control={form.control}
                        name="contact.mobile"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mobile</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="+1234567890"
                                        type="tel"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="contact.phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Work Phone</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="+1234567890"
                                        type="tel"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="contact.fax"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fax</FormLabel>
                                <FormControl>
                                    <Input placeholder="Fax" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Separator />

                {/* Address */}
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Address
                </p>
                <FormField
                    control={form.control}
                    name="address.street"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Street</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="123 Main St"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 gap-3">
                    <FormField
                        control={form.control}
                        name="address.city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="San Francisco"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address.state"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>State</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="California"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <FormField
                        control={form.control}
                        name="address.country"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="United States"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address.zip"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ZIP Code</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="94102"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button type="submit" className="gap-2 mt-2">
                    <Sparkles className="h-4 w-4" />
                    Generate vCard QR
                </Button>
            </form>
        </Form>
    );
};
export default VCardQr;
