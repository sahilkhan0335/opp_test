import { Card } from "@/components/ui/card";

export default function FeaturesPage() {
    const features = [
        {
            title: "Swipe Matching",
            description: "Tinder-style interface for browsing opportunities. Finding work should be as fun as dating.",
            icon: "❤️",
            colSpan: "md:col-span-2",
            bg: "bg-secondary/50"
        },
        {
            title: "Video Profiles",
            description: "Stand out with 30-second video introductions.",
            icon: "🎥",
            colSpan: "md:col-span-1",
            bg: "bg-secondary/50"
        },
        {
            title: "Instant Booking",
            description: "Schedule interviews directly in the app. No more email ping pong.",
            icon: "📅",
            colSpan: "md:col-span-1",
            bg: "bg-secondary/50"
        },
        {
            title: "Live Events",
            description: "Participate in virtual hiring events and meet founders face-to-face.",
            icon: "📺",
            colSpan: "md:col-span-2",
            bg: "bg-secondary/50"
        }
    ];

    return (
        <div className="container mx-auto px-6 lg:px-20 py-32 sm:py-48">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end mb-24">
                <h1 className="text-7xl sm:text-9xl font-bold tracking-tighter leading-[0.8]">
                    Built for <br /> <span className="font-orbitron font-semibold text-primary">Speed</span>
                </h1>
                <p className="text-2xl sm:text-3xl font-medium leading-relaxed pb-4 border-b-2 border-foreground/10">
                    Everything you need to find your next break, stripped down to the essentials.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[350px]">
                {features.map((f, i) => (
                    <Card key={i} className={`p-10 flex flex-col justify-between rounded-[2.5rem] border-none shadow-sm hover:shadow-md transition-all duration-500 ${f.colSpan} ${f.bg}`}>
                        <div className="text-6xl mb-4 text-primary">{f.icon}</div>
                        <div>
                            <h3 className="text-3xl font-bold mb-4 text-foreground">{f.title}</h3>
                            <p className="text-lg font-medium leading-relaxed text-muted-foreground">{f.description}</p>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
