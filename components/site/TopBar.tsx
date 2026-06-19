import {
  Mail,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";
import type { SiteSettings } from "@/lib/api/settings";

const FOM_YT = "https://www.youtube.com/@TheFriendsOfMewar";

// Bright brand-red accent block (for the Follow-Us ribbon).
const ACCENT = "bg-[linear-gradient(180deg,#e1626c_0%,#d44b55_55%,#c43c46_100%)]";

/** Donatm-style top bar: dark maroon bar, Welcome + contact (left), red angled Follow-Us block (right). */
export function TopBar({ settings }: { settings: SiteSettings }) {
  const socials = [
    { icon: Facebook, href: settings.facebook || "https://www.facebook.com/FriendsofMewar/" },
    { icon: Instagram, href: settings.instagram || "https://www.instagram.com/thefriendsofmewar" },
    { icon: Linkedin, href: settings.linkedin || "https://www.linkedin.com/company/friends-of-mewar/" },
    { icon: Youtube, href: FOM_YT },
    ...(settings.twitter ? [{ icon: Twitter, href: settings.twitter }] : []),
  ].filter((s) => s.href);

  return (
    <div className="relative z-50 hidden h-11 w-full overflow-hidden bg-[linear-gradient(90deg,#e0694e_0%,#d44b55_35%,#a32f37_70%,#7c2128_100%)] text-[13px] text-white md:block">
      <div className="container relative flex h-full items-stretch justify-between">
        {/* ── Left: welcome + contact ── */}
        <div className="flex items-center gap-4">
          <span>
            <span className="text-[14px] font-semibold text-[#fddc35]">Welcome</span>
            <span className="text-[14px] text-white/85"> to {settings.siteName}</span>
          </span>

          {settings.phone && (
            <>
              <span className="h-4 w-px bg-white/20" />
              <a href={`tel:${settings.phone}`} className="text-[14px] flex items-center gap-1.5 text-white/90 hover:text-white">
                <Phone className="h-3.5 w-3.5 text-[#fddc35]" />
                {settings.phone}
              </a>
            </>
          )}
          {settings.email && (
            <>
              <span className="h-4 w-px bg-white/20" />
              <a href={`mailto:${settings.email}`} className="text-[14px] hidden items-center gap-1.5 text-white/90 hover:text-white lg:flex">
                <Mail className="h-3.5 w-3.5 text-[#fddc35]" />
                {settings.email}
              </a>
            </>
          )}
        </div>

        {/* ── Right: angled red Follow-Us block (bleeds to the edge) ── */}
        <div className="relative flex items-stretch">
          {/* red bleed to the screen's right edge */}
          <span className={`absolute left-full inset-y-0 w-screen ${ACCENT}`} />
          {/* yellow accent line along the diagonal (peeks 4px to the left of the red edge) */}
          <span
            className="absolute inset-y-0 -left-1 right-0 bg-[#fddc35]"
            style={{ clipPath: "polygon(18px 0, 100% 0, 100% 100%, 0 100%)" }}
          />
          <div
            className={`relative flex items-center gap-2.5 pl-9 pr-5 text-white shadow-[-6px_0_14px_-6px_rgba(0,0,0,0.45)] ${ACCENT}`}
            style={{ clipPath: "polygon(18px 0, 100% 0, 100% 100%, 0 100%)" }}
          >
            <span className="text-[14px] font-medium tracking-wider">Follow Us</span>
            <div className="flex items-center gap-2">
                  {socials.map((s, i) => {
                    const Icon = s.icon;

                    return (
                      <a
                        key={i}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="social link"
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-white"
                      >
                        <Icon className="h-3.5 w-3.5 text-[#D44B55]" />
                      </a>
                    );
                  })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
