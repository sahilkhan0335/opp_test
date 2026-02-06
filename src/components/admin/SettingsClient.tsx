"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { updateFaqs, updateLegalContent, updateSiteSettings } from "@/lib/actions";
import { Loader2, Plus, Trash2 } from "lucide-react";
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

interface FAQ {
    id?: number;
    question: string;
    answer: string;
    order: number;
}

interface SettingsClientProps {
    initialSettings: SiteSettings;
    initialFaqs: FAQ[];
    initialLegal: { terms: string; privacy: string };
}

export default function SettingsClient({ initialSettings, initialFaqs, initialLegal }: SettingsClientProps) {
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

    // FAQs
    const [faqs, setFaqs] = useState(initialFaqs.map(f => ({ question: f.question, answer: f.answer })));

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

    const handleFaqSave = () => {
        startTransition(async () => {
            const result = await updateFaqs(faqs);
            if (result.success) toast.success("FAQs updated!");
            else toast.error("Failed to update FAQs");
        });
    }

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

    // FAQ Helpers
    const addFaq = () => setFaqs([...faqs, { question: "", answer: "" }]);
    const removeFaq = (idx: number) => setFaqs(faqs.filter((_, i) => i !== idx));
    const updateFaq = (idx: number, field: 'question' | 'answer', val: string) => {
        const newFaqs = [...faqs];
        newFaqs[idx] = { ...newFaqs[idx], [field]: val };
        setFaqs(newFaqs);
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
                    <TabsTrigger value="faqs">FAQs</TabsTrigger>
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

                <TabsContent value="faqs">
                    <Card className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
                            <Button onClick={addFaq} size="sm" variant="outline"><Plus className="mr-2 h-4 w-4" /> Add FAQ</Button>
                        </div>
                        <div className="space-y-4 max-h-150 overflow-y-auto pr-2">
                            {faqs.map((faq, idx) => (
                                <div key={idx} className="p-4 border rounded-md bg-muted/20 relative group">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-2 right-2 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => removeFaq(idx)}
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                    <div className="space-y-3">
                                        <Input
                                            placeholder="Question"
                                            value={faq.question}
                                            onChange={e => updateFaq(idx, 'question', e.target.value)}
                                        />
                                        <Textarea
                                            placeholder="Answer"
                                            value={faq.answer}
                                            onChange={e => updateFaq(idx, 'answer', e.target.value)}
                                            rows={2}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button onClick={handleFaqSave} className="mt-4" disabled={isPending}>
                            Save FAQs
                        </Button>
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
