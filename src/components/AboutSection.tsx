import { Button } from "./ui/button";
import { Award, UserCheck, Stethoscope, HeartHandshake } from "lucide-react";
import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Image Placeholder */}
          <div className="relative order-2 lg:order-1">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl bg-white p-2">
              <div className="w-full h-full bg-slate-200 rounded-xl relative flex items-center justify-center overflow-hidden">
                <Image 
                  src="/team-photo.jpg" 
                  alt="Birkdale Audiology Team with dog" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            {/* Decorative background element */}
            <div className="absolute -z-10 bg-accent rounded-3xl w-full h-full top-8 -right-8" />
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <p className="text-blue-600 font-semibold mb-2 tracking-wide uppercase text-sm">About Our Clinic</p>
              <h2 className="text-3xl md:text-4xl font-semibold text-primary leading-tight">
                An Audiologist Focused on Your Better Hearing
              </h2>
            </div>
            
            <p className="text-lg text-foreground/80 leading-relaxed">
              At Birkdale Audiology, our philosophy is simple: treat every patient like family. We take the time to listen, understand your unique communication needs, and create a tailored hearing care plan that fits your lifestyle and budget. You are never just a number to us.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <li className="flex items-start space-x-3">
                <HeartHandshake className="text-blue-600 w-6 h-6 shrink-0" />
                <span className="font-medium text-primary">Locally Owned & Operated</span>
              </li>
              <li className="flex items-start space-x-3">
                <Award className="text-blue-600 w-6 h-6 shrink-0" />
                <span className="font-medium text-primary">Award-Winning Care</span>
              </li>
              <li className="flex items-start space-x-3">
                <UserCheck className="text-blue-600 w-6 h-6 shrink-0" />
                <span className="font-medium text-primary">Experienced Doctor of Audiology</span>
              </li>
              <li className="flex items-start space-x-3">
                <Stethoscope className="text-blue-600 w-6 h-6 shrink-0" />
                <span className="font-medium text-primary">Evidence-Based Treatment</span>
              </li>
            </ul>

            <div className="pt-4">
              <Button size="lg" className="w-full sm:w-auto">
                Meet Our Friendly Team
              </Button>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
