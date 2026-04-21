import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { Star, HeartPulse, Ear } from "lucide-react";

export function HighlightsSection() {
  const highlights = [
    {
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      title: "Patient Reviews",
      description: "Read why our patients trust us with their hearing health and consistently rate us 5 stars.",
      cta: "Read Testimonials \u2192",
      link: "#testimonials",
    },
    {
      icon: <HeartPulse className="w-8 h-8 text-rose-500" />,
      title: "How We Can Help",
      description: "From comprehensive evaluations to advanced treatments, we provide individualized care plans.",
      cta: "View Services \u2192",
      link: "#services",
    },
    {
      icon: <Ear className="w-8 h-8 text-blue-500" />,
      title: "Hearing Screening",
      description: "Not sure about your hearing? Take our simple, 3-minute online screening to find out.",
      cta: "Take the Screening \u2192",
      link: "#", // Usually an external link or embedded tool
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-32 relative z-10">
          {highlights.map((item, index) => (
            <Card key={index} className="border-none shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader>
                <div className="mb-4 bg-slate-50 w-16 h-16 flex items-center justify-center rounded-2xl">
                  {item.icon}
                </div>
                <CardTitle className="text-xl text-primary">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-base leading-relaxed">
                  {item.description}
                </CardDescription>
                <a href={item.link} className="inline-block font-semibold text-primary hover:text-blue-600 transition-colors">
                  {item.cta}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
