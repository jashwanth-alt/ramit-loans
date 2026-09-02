import { generalFaqs } from "@/data/mockData";
import { SectionHeading } from "@/components/loan-cards/loan-cards-section";
import { FaqAccordion } from "@/components/faq/faq-accordion";

export function FaqSection() {
  return (
    <section className="bg-paper-2 py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading eyebrow="FAQ" title="Common Questions" align="center" />
        <div className="mt-12">
          <FaqAccordion items={generalFaqs} />
        </div>
      </div>
    </section>
  );
}
