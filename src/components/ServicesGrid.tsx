import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ArrowRight } from "lucide-react";

export function ServicesGrid() {
  const services = [
    { name: "Tinnitus Evaluations", desc: "Comprehensive testing to determine the cause and severity of your tinnitus." },
    { name: "Lenire Tinnitus Treatment", desc: "FDA-approved bimodal neuromodulation device proven to soothe tinnitus rings." },
    { name: "Oto CBT Program", desc: "Cognitive Behavioral Therapy designed specifically to help you manage tinnitus." },
    { name: "Aural Rehabilitation", desc: "Training and counseling to maximize your communication abilities with hearing aids." },
    { name: "Cognivue Cognitive Screening", desc: "Early detection of cognitive decline linked to untreated hearing loss." },
    { name: "Hearing Test / Communication Needs", desc: "In-depth evaluations focusing on your real-world listening environments." },
    { name: "Real Ear Measurement", desc: "Scientific verification to ensure your hearing aids are programmed perfectly to your ear canal." },
    { name: "Earwax Removal", desc: "Safe, professional cerumen management to keep your ears clear and healthy." },
    { name: "Earmold Impressions", desc: "Custom-fit molds for swimming, musicians, sleep, and occupational noise protection." },
  ];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-blue-600 font-semibold mb-2 tracking-wide uppercase text-sm">Audiology Services</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-primary mb-6">How We Help Our Patients</h2>
          <p className="text-foreground/70 text-lg">
            We offer a comprehensive suite of audiological testing, treatment, and ongoing care to support your hearing journey at every step.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="group hover:border-blue-200 hover:shadow-lg transition-all duration-300">
              {/* Optional: Add Image placeholder area */}
              <div className="h-40 bg-slate-100 rounded-t-xl overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm">
                  {/* Service Image */}
                  <span className="font-medium text-slate-500">{service.name} Image</span>
                </div>
              </div>
              <CardHeader className="pt-6 pb-2">
                <CardTitle className="text-xl text-primary font-semibold group-hover:text-blue-700 transition-colors">
                  {service.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <CardDescription className="text-base mb-4 text-foreground/70 h-16">
                  {service.desc}
                </CardDescription>
                <div className="flex items-center text-blue-600 font-medium text-sm group-hover:underline cursor-pointer">
                  Learn More <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#" className="inline-flex items-center justify-center px-8 py-3 rounded-md bg-secondary text-secondary-foreground hover:bg-slate-200 transition-colors font-medium border border-slate-300">
            View All Services
          </a>
        </div>

      </div>
    </section>
  );
}
