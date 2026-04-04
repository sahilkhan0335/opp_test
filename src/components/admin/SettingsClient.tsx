"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { updateLegalContent, updateSiteSettings } from "@/lib/actions";
import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface SiteSettings {
    heroTitle: string;
    heroSubtitle: string;
    heroButtonText: string;
    heroBgImage?: string | null;
    showTestimonials: boolean;
    showStats: boolean;
    showWhy: boolean;
    showPhoneMockups: boolean;
}

interface SettingsClientProps {
    initialSettings: SiteSettings;
    initialLegal: { terms: string; privacy: string };
}

export default function SettingsClient({ initialSettings, initialLegal }: SettingsClientProps) {
    const [isPending, startTransition] = useTransition();

    // General Settings
    const [formData, setFormData] = useState({
        heroTitle: initialSettings?.heroTitle || "",
        heroSubtitle: initialSettings?.heroSubtitle || "",
        heroButtonText: initialSettings?.heroButtonText || "",
        heroBgImage: initialSettings?.heroBgImage || "",
        showTestimonials: initialSettings?.showTestimonials ?? true,
        showStats: initialSettings?.showStats ?? true,
        showWhy: initialSettings?.showWhy ?? true,
        showPhoneMockups: initialSettings?.showPhoneMockups ?? true,
    });

    // Legal
    const [legal, setLegal] = useState(initialLegal);

    // Handlers
    const handleGeneralSubmit = () => {
        const payload = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (typeof value === "boolean") {
                if (value) payload.append(key, "on");
            } else {
                payload.append(key, value as string);
            }
        });

        startTransition(async () => {
            const result = await updateSiteSettings(payload);
            if (result.success) toast.success("General settings updated!");
            else toast.error("Failed to update settings");
        });
    };

    const handleTermsSave = () => {
        startTransition(async () => {
            const result = await updateLegalContent("terms", legal.terms);
            if (result.success) toast.success("Terms updated!");
            else toast.error("Failed to update Terms");
        });
    }

    const handlePrivacySave = () => {
        startTransition(async () => {
            const result = await updateLegalContent("privacy", legal.privacy);
            if (result.success) toast.success("Privacy updated!");
            else toast.error("Failed to update Privacy");
        });
    }

    return (
        <div className="space-y-6 max-w-4xl">
            <div className="mb-6">
                <h1 className="text-2xl font-bold font-orbitron text-foreground">Site Customisation</h1>
                <p className="text-muted-foreground">Customize your marketing site</p>
            </div>

            <Tabs defaultValue="general" className="w-full">
                <TabsList className="mb-4">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="legal">Legal</TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                    <Card className="p-6">
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold border-b pb-2">Hero Section</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Title</Label>
                                        <Input value={formData.heroTitle} onChange={e => setFormData({ ...formData, heroTitle: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Subtitle</Label>
                                        <Input value={formData.heroSubtitle} onChange={e => setFormData({ ...formData, heroSubtitle: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Button Text</Label>
                                        <Input value={formData.heroButtonText} onChange={e => setFormData({ ...formData, heroButtonText: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Background Image URL</Label>
                                        <Input value={formData.heroBgImage} onChange={e => setFormData({ ...formData, heroBgImage: e.target.value })} />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold border-b pb-2">Visibility</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {Object.entries({
                                        showPhoneMockups: "Phone Mockups",
                                        showWhy: "Why Section",
                                        showTestimonials: "Testimonials",
                                        showStats: "Stats Section"
                                    }).map(([key, label]) => (
                                        <div key={key} className="flex items-center justify-between border p-3 rounded-lg">
                                            <Label htmlFor={key} className="cursor-pointer">{label}</Label>
                                            <Switch
                                                id={key}
                                                checked={formData[key as keyof typeof formData] as boolean}
                                                onCheckedChange={(c) => setFormData({ ...formData, [key]: c })}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Button onClick={handleGeneralSubmit} disabled={isPending}>
                                {isPending && <Loader2 className="animate-spin mr-2 h-4 w-4" />} Save General Settings
                            </Button>
                        </div>
                    </Card>
                </TabsContent>

                <TabsContent value="legal">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Terms of Service</h3>
                            <Textarea
                                className="min-h-100 font-mono text-sm"
                                value={legal.terms}
                                onChange={e => setLegal({ ...legal, terms: e.target.value })}
                            />
                            <Button onClick={handleTermsSave} className="mt-4" disabled={isPending}>Save Terms</Button>
                        </Card>
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Privacy Policy</h3>
                            <Textarea
                                className="min-h-100 font-mono text-sm"
                                value={legal.privacy}
                                onChange={e => setLegal({ ...legal, privacy: e.target.value })}
                            />
                            <Button onClick={handlePrivacySave} className="mt-4" disabled={isPending}>Save Privacy</Button>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
