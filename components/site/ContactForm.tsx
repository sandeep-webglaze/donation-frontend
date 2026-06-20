"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";

const inputCls =
  "h-12 w-full rounded-xl border border-white/25 bg-white/10 px-4 text-white placeholder:text-white/60 outline-none transition-colors focus:border-secondary focus:bg-white/15";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", subject: "", message: "" });
  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("Please add your name and email.");
      return;
    }
    setLoading(true);
    // No contact API yet — simulate. Wire to a backend endpoint later.
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setForm({ name: "", phone: "", email: "", subject: "", message: "" });
    toast.success("Thank you! We’ll get back to you soon.");
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input className={inputCls} placeholder="Your Name" value={form.name} onChange={(e) => set("name", e.target.value)} />
        <input className={inputCls} placeholder="Phone Number" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
        <input className={inputCls} type="email" placeholder="Email Address" value={form.email} onChange={(e) => set("email", e.target.value)} />
        <input className={inputCls} placeholder="Subject" value={form.subject} onChange={(e) => set("subject", e.target.value)} />
      </div>
      <textarea
        rows={5}
        className="w-full rounded-xl border border-white/25 bg-white/10 p-4 text-white placeholder:text-white/60 outline-none transition-colors focus:border-secondary focus:bg-white/15"
        placeholder="Write a Message"
        value={form.message}
        onChange={(e) => set("message", e.target.value)}
      />
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-full bg-secondary px-7 py-3.5 font-semibold text-[#122f2a] shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5 disabled:opacity-70"
      >
        <Send className="h-4 w-4" /> {loading ? "Sending…" : "Send a Message"}
      </button>
    </form>
  );
}
