import type { Metadata } from "next";
import { ContactForm } from "./contact-form";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Finlace team for loan guidance and support.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="text-sm font-medium text-blue">Contact</p>
          <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Let&apos;s talk about your loan</h1>
          <p className="mt-4 max-w-md text-[17px] leading-relaxed text-ink-soft">
            Have a question before applying? Send us a note and a loan specialist will get back to you.
          </p>

          <div className="mt-10 space-y-5">
            <ContactRow icon={Phone} label="Phone" value="+91 90000 00000" />
            <ContactRow icon={Mail} label="Email" value="hello@finlace.example" />
            <ContactRow icon={MapPin} label="Office" value="Hyderabad, Telangana, India" />
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue/10 text-blue">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs text-ink-soft">{label}</p>
        <p className="text-[15px] font-medium">{value}</p>
      </div>
    </div>
  );
}
