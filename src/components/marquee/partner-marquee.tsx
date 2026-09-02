import { bankPartners } from "@/data/mockData";
import { bankLogos } from "@/data/bankLogos";
import { Landmark } from "lucide-react";

export function PartnerMarquee() {
  const items = [...bankPartners, ...bankPartners];

  return (
    <section className="bg-paper py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="text-center text-sm font-medium uppercase tracking-wide text-ink-soft/70">Backed by 25+ trusted lending partners</p>
      </div>

      <div className="relative mt-8 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-paper to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-paper to-transparent" />

        <div className="marquee-track flex w-max gap-4">
          {items.map((partner, i) => {
            const name = typeof partner === "string" ? partner : partner.name;

            return (
              <div
                key={`${name}-${i}`}
                className="flex items-center gap-3 whitespace-nowrap rounded-2xl border border-[var(--line)] bg-white px-5 py-3.5"
              >
                {bankLogos[name] ? (
                  <img src={bankLogos[name]} alt={`${name} logo`} className="h-8 w-14 object-contain" />
                ) : (
                  <Landmark className="h-5 w-5 text-blue" />
                )}

                <span className="text-[15px] font-medium text-ink">{name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
