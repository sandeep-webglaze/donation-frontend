"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PRESETS = [500, 1000, 2500, 5000];

/** Amount chips + custom input → Donate. */
export function DonateAmountPicker() {
  const router = useRouter();
  const [amount, setAmount] = useState<number | "">(1000);
  const [custom, setCustom] = useState(false);

  const go = () => {
    const amt = typeof amount === "number" && amount > 0 ? amount : "";
    router.push(amt ? `/donate?amount=${amt}` : "/donate");
  };

  return (
    <div className="mt-8">
      <div className="flex flex-wrap justify-center gap-3">
        {PRESETS.map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => { setCustom(false); setAmount(a); }}
            className={cn(
              "rounded-xl border px-6 py-3 text-lg font-semibold backdrop-blur transition-colors",
              !custom && amount === a
                ? "border-white bg-white text-primary"
                : "border-white/30 bg-white/10 text-primary-foreground hover:bg-white/20"
            )}
          >
            ₹{a.toLocaleString("en-IN")}
          </button>
        ))}
        <button
          type="button"
          onClick={() => { setCustom(true); setAmount(""); }}
          className={cn(
            "rounded-xl border px-6 py-3 text-lg font-semibold backdrop-blur transition-colors",
            custom ? "border-white bg-white text-primary" : "border-white/30 bg-white/10 text-primary-foreground hover:bg-white/20"
          )}
        >
          Custom
        </button>
      </div>

      {/* Custom amount input */}
      {custom && (
        <div className="mx-auto mt-4 flex max-w-xs items-center gap-2 rounded-xl border border-white/40 bg-white/95 px-4 py-2 text-foreground shadow-sm">
          <span className="text-lg font-bold text-primary">₹</span>
          <input
            type="number"
            min={1}
            autoFocus
            value={amount === "" ? "" : amount}
            onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : "")}
            placeholder="Enter amount"
            className="w-full bg-transparent text-lg font-semibold outline-none placeholder:text-muted-foreground"
          />
        </div>
      )}

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button size="lg" variant="secondary" onClick={go} className="h-12 px-8 text-base">
          Donate Now
        </Button>
      </div>
    </div>
  );
}
