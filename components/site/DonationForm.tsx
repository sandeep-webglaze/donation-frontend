"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Heart, ShieldCheck, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Fund {
  id: string;
  label: string;
}

const PRESETS = [500, 1000, 2500, 5000];
const inr = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 2 });

export function DonationForm({
  funds,
  defaultAmount = 1000,
}: {
  funds: Fund[];
  defaultAmount?: number;
}) {
  const [fund, setFund] = useState(funds[0]?.id ?? "general");
  const [amount, setAmount] = useState<number>(defaultAmount);
  const [custom, setCustom] = useState(!PRESETS.includes(defaultAmount));
  const [coverFee, setCoverFee] = useState(true);

  const fee = useMemo(() => Math.round(amount * 0.03 * 100) / 100, [amount]);
  const total = coverFee ? amount + fee : amount;

  const donate = () => {
    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }
    // No payment gateway wired yet (Razorpay/UPI coming soon).
    toast.success("Online payments are coming soon — we’ll email you a payment link.");
  };

  return (
    <div className="rounded-3xl border bg-card p-6 shadow-xl md:p-8">
      {/* Fund select */}
      <label className="mb-1 block text-sm font-medium text-muted-foreground">Contribute to</label>
      <div className="relative mb-6">
        <select
          value={fund}
          onChange={(e) => setFund(e.target.value)}
          className="h-11 w-full appearance-none border-b bg-transparent pr-8 text-lg font-medium text-foreground focus:outline-none"
        >
          {funds.map((f) => (
            <option key={f.id} value={f.id}>{f.label}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-1 top-3 h-5 w-5 text-muted-foreground" />
      </div>

      {/* Amount presets */}
      <div className="mb-5 flex flex-wrap gap-2">
        {PRESETS.map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => { setCustom(false); setAmount(a); }}
            className={cn(
              "rounded-lg border px-4 py-2 text-sm font-semibold transition-colors",
              !custom && amount === a
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-foreground hover:border-primary/50"
            )}
          >
            {inr(a)}
          </button>
        ))}
        <button
          type="button"
          onClick={() => { setCustom(true); setAmount(0); }}
          className={cn(
            "rounded-lg border px-4 py-2 text-sm font-semibold transition-colors",
            custom ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground hover:border-primary/50"
          )}
        >
          Custom Amount
        </button>
      </div>

      {custom && (
        <div className="mb-5 flex items-center gap-2 rounded-lg border px-4 py-2.5">
          <span className="text-lg font-bold text-primary">₹</span>
          <input
            type="number"
            min={1}
            autoFocus
            value={amount || ""}
            onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : 0)}
            placeholder="Enter amount"
            className="w-full bg-transparent text-lg font-semibold outline-none placeholder:text-muted-foreground"
          />
        </div>
      )}

      {/* Cover fee */}
      <label className="mb-5 flex cursor-pointer items-start gap-2.5 text-sm">
        <input
          type="checkbox"
          checked={coverFee}
          onChange={(e) => setCoverFee(e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-primary"
        />
        <span className="text-foreground">Help cover processing fees to maximize impact.</span>
      </label>

      {/* Totals */}
      <div className="space-y-1.5 border-t pt-4 text-sm">
        {coverFee && (
          <div className="flex items-center justify-between text-muted-foreground">
            <span>3% Cover the Fee</span>
            <span>{inr(fee)}</span>
          </div>
        )}
        <div className="flex items-center justify-between text-base font-bold text-foreground">
          <span>Total</span>
          <span>{inr(total)}</span>
        </div>
      </div>

      {/* Donate */}
      <button
        onClick={donate}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-base font-semibold text-primary-foreground shadow-md shadow-primary/30 transition-all hover:-translate-y-0.5 hover:shadow-lg"
      >
        <Heart className="h-4 w-4" /> Donate {inr(total)}
      </button>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <ShieldCheck className="h-3.5 w-3.5" /> Secure payment · 80G tax benefit · Instant receipt
      </p>
    </div>
  );
}
