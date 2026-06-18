"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Mail, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Newsletter() {
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
      <div className="relative overflow-hidden rounded-3xl border bg-card px-8 py-14 text-center md:px-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-20 left-1/2 h-56 w-[36rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        </div>
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Mail className="h-5 w-5" />
        </div>
        <h2 className="font-serif text-2xl font-bold tracking-tight md:text-3xl">
          Stay connected with our mission
        </h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Sign up for the latest updates on our work and ways you can help make a difference.
        </p>
        <form onSubmit={onSubmit} className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row">
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="h-11"
          />
          <Button type="submit" disabled={loading} className="h-11 px-6">
            <Send className="mr-2 h-4 w-4" /> Sign Up
          </Button>
        </form>
      </div>
    </section>
  );
}
