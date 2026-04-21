import { CheckCircle2 } from "lucide-react";

export function WhyChooseUsSection() {
  const reasons = [
    { title: "Personalized Care", desc: "No cookie-cutter solutions. We tailor every treatment plan to your unique lifestyle." },
    { title: "Advanced Hearing Technology", desc: "We work with top manufacturers to offer the latest in discreet, rechargeable hearing devices." },
    { title: "Local Expertise", desc: "A trusted staple in the Lake Norman community, supporting local health for years." },
    { title: "Compassionate Support", desc: "We understand hearing loss can be frustrating. We’re here to support you with empathy." },
    { title: "Long-Term Hearing Health Partnership", desc: "Your journey doesn't end when you leave. We provide ongoing support, cleaning, and adjustments." },
    { title: "Caregiver-Friendly Experience", desc: "We encourage family involvement and provide resources to help loved ones understand your hearing needs." },
  ];

  return (
    <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-white">Why Patients Choose Birkdale</h2>
          <p className="text-primary-foreground/80 text-lg">
            We hold ourselves to the highest standard of audiological care, combining clinical excellence with exceptional patient service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
              <div className="flex items-start space-x-4">
                <div className="shrink-0 mt-1">
                  <CheckCircle2 className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{reason.title}</h3>
                  <p className="text-primary-foreground/70 leading-relaxed text-sm">
                    {reason.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
