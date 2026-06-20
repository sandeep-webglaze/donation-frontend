"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Mail, Send, Check, ShieldCheck, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TopoLines } from "@/components/site/Decor";

const BENEFITS = ["Impact stories from the field", "Event & camp invites", "No spam — unsubscribe anytime"];

export function Newsletter({
  title = "Stay connected with our mission",
  subtitle = "Sign up for the latest updates on our work and ways you can help make a difference.",
}: {
  title?: string;
  subtitle?: string;
}) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // No newsletter API yet — simulate success. Wire to a backend endpoint later.
    await new Promise((r) => setTimeout(r, 500));
    setLoading(false);
    setEmail("");
    toast.success("Thank you for being a friend of Mewar!");
  };

  return (
    <section className="container pb-24">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary via-primary to-secondary px-6 py-16 text-primary-foreground shadow-2xl shadow-primary/20 md:px-16">
        <TopoLines className="absolute inset-0 h-full w-full text-white/10" />
        <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-secondary/30 blur-3xl" />

        <div className="relative grid items-center gap-10 md:grid-cols-2">
          {/* Copy */}
          <div className="text-center md:text-left">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur md:mx-0">
              <Mail className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              {title}
            </h2>
            <p className="mt-3 text-primary-foreground/85">{subtitle}</p>

            <ul className="mx-auto mt-5 inline-flex flex-col gap-2 text-left md:mx-0">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm text-primary-foreground/90">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                    <Check className="h-3 w-3" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <div>
            <form onSubmit={onSubmit} className="rounded-2xl bg-white/10 p-3 backdrop-blur sm:flex sm:gap-2">
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="mb-2 h-12 border-0 bg-white text-foreground placeholder:text-muted-foreground sm:mb-0"
              />
              <Button
                type="submit"
                disabled={loading}
                size="lg"
                variant="secondary"
                className="h-12 w-full px-7 sm:w-auto"
              >
                <Send className="mr-2 h-4 w-4" /> Sign Up
              </Button>
            </form>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-primary-foreground/80 md:justify-start">
              <span className="inline-flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" /> Join 10,000+ supporters
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" /> We respect your privacy
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
