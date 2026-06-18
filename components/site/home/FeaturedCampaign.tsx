import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users, Target, Clock } from "lucide-react";

const RAISED = 750000;
const GOAL = 1000000;
const PCT = Math.round((RAISED / GOAL) * 100);
const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

export function FeaturedCampaign() {
  return (
    <section className="container py-20 md:py-24">
      <div className="grid items-stretch gap-0 overflow-hidden rounded-[2rem] border bg-card shadow-xl lg:grid-cols-2">
        {/* Visual */}
        <div className="relative min-h-[280px] bg-gradient-to-br from-primary/20 via-amber-400/10 to-background">
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--primary)/0.25),transparent_60%)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Target className="h-20 w-20 text-primary/50" />
          </div>
          <span className="absolute left-6 top-6 rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow">
            Featured Campaign
          </span>
        </div>

        {/* Copy + progress */}
        <div className="flex flex-col justify-center gap-6 p-8 md:p-12">
          <h2 className="font-serif text-3xl font-bold tracking-tight md:text-4xl">
            Rural Health Camps 2026
          </h2>
          <p className="text-muted-foreground">
            Help us run preventive health camps, diabetes screenings and maternal
            care across villages in Mewar — bringing quality care to those who need it most.
          </p>

          <div className="space-y-3">
            <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-gradient-to-r from-primary to-amber-500" style={{ width: `${PCT}%` }} />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <span className="font-semibold text-foreground">{inr(RAISED)} <span className="font-normal text-muted-foreground">raised of {inr(GOAL)}</span></span>
              <span className="font-semibold text-primary">{PCT}%</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4 text-primary" /> 1,240 donors</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary" /> 18 days left</span>
          </div>

          <Button asChild size="lg" className="w-fit">
            <Link href="/donate">Support this campaign</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
