import { ApplyJobDialog } from "@/components/careers/ApplyJobDialog";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import Image from "next/image";

interface JobListing {
    id: number;
    title: string;
    location: string;
    type: string;
    salaryRange: string | null;
    description: string;
    image: string;
    active: boolean;
}

export default async function CareersPage() {
    const jobs = await prisma.jobListing.findMany({
        where: { active: true },
        orderBy: { id: "asc" }
    });

    return (
        <div className="container mx-auto px-6 lg:px-20 py-32 sm:py-40">
            <div className="mb-24">
                <h1 className="text-7xl sm:text-9xl font-bold mb-10 tracking-tighter">
                    Join the <br /> <span className="font-orbitron font-semibold text-primary">Revolution</span>
                </h1>
                <p className="text-2xl sm:text-3xl text-muted-foreground max-w-2xl font-medium">
                    Build the future of hiring with us. We are looking for dreamers and doers.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 max-w-full">
                {jobs.length === 0 ? (
                    <div className="col-span-full py-12 border-t border-border">
                        <p className="text-xl text-muted-foreground">No open positions right now.</p>
                    </div>
                ) : (
                    jobs.map((job: JobListing) => (
                        <div key={job.id} className="block group w-full">
                            <div className="flex flex-col md:flex-row gap-8 p-8 md:p-12 items-start md:items-center bg-secondary/30 hover:bg-secondary rounded-[2.5rem] transition-all duration-300 border border-transparent hover:border-black/5">
                                <div className="w-full md:w-64 h-48 md:h-40 rounded-[1.5rem] overflow-hidden shrink-0">
                                    <Image
                                        src={job.image}
                                        alt={job.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-3 mb-3">
                                        <span className="bg-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-black/10">
                                            {job.type}
                                        </span>
                                        <span className="text-muted-foreground font-medium text-sm">
                                            {job.location}
                                        </span>
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight group-hover:text-primary transition-colors">
                                        {job.title}
                                    </h3>
                                    <p className="text-lg text-muted-foreground line-clamp-2 max-w-2xl">
                                        {job.description}
                                    </p>
                                </div>

                                <div className="w-full md:w-auto mt-4 md:mt-0">
                                    <ApplyJobDialog
                                        job={job}
                                        trigger={
                                            <Button className="w-full md:w-auto bg-black text-white hover:bg-primary rounded-full px-8 py-6 text-lg transition-colors">
                                                Apply Now
                                            </Button>
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
