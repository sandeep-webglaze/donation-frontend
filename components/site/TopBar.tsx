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

/** Thin top utility bar (welcome + phone/email + social) — light. */
export function TopBar({ settings }: { settings: SiteSettings }) {
  const socials = [
    { icon: Facebook, href: settings.facebook || "https://www.facebook.com/FriendsofMewar/" },
    { icon: Instagram, href: settings.instagram || "https://www.instagram.com/thefriendsofmewar" },
    { icon: Linkedin, href: settings.linkedin || "https://www.linkedin.com/company/friends-of-mewar/" },
    { icon: Youtube, href: FOM_YT },
    ...(settings.twitter ? [{ icon: Twitter, href: settings.twitter }] : []),
  ].filter((s) => s.href);

  return (
    <div
      className="
hidden md:block
border-b border-primary/10
bg-gradient-to-r
from-primary/10
via-background
to-secondary/20
backdrop-blur-sm
"
    >
      <div className="container flex h-10 items-center justify-between text-sm">
        <span className="flex items-center gap-1">
          <span className="font-semibold text-primary">Welcome</span>
          <span>to {settings.siteName}</span>
        </span>
        <div className="flex items-center gap-5">
          {settings.phone && (
            <a
              href={`tel:${settings.phone}`}
              className="flex items-center gap-1.5 transition-colors hover:text-primary"
            >
              <Phone className="h-3.5 w-3.5 text-primary" /> {settings.phone}
            </a>
          )}
          {settings.email && (
            <a
              href={`mailto:${settings.email}`}
              className="flex items-center gap-1.5 transition-colors hover:text-primary"
            >
              <Mail className="h-3.5 w-3.5 text-primary" /> {settings.email}
            </a>
          )}
          {socials.length > 0 && (
            <span className="flex items-center gap-3 border-l pl-4">
              {socials.map((s, i) => {
                const Icon = s.icon;
                return (
                  <a
                    key={i}
                    href={s.href as string}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
