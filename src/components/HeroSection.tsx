import { Button } from "./ui/button";
import { CheckCircle, ShieldCheck } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-accent/30 pt-16 pb-24 lg:pt-28 lg:pb-36">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-white px-3 py-1 rounded-full text-sm font-medium text-primary mb-6 shadow-sm border">
              <ShieldCheck size={16} className="text-blue-600" />
              <span>Lake Norman’s Trusted Audiology Care</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-primary mb-6 leading-tight">
              Lake Norman’s Premier Audiology Team
            </h1>
            
            <p className="text-lg text-foreground/80 mb-8 max-w-xl leading-relaxed">
              Experience personalized hearing care focused on your better hearing outcomes. We combine expert medical knowledge with compassionate, patient-first service to help you reconnect with the sounds you love.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-10">
              <Button size="lg" className="w-full sm:w-auto text-base">Book Appointment</Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base bg-white border-2">Learn More</Button>
            </div>
            
            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm font-medium text-foreground/70">
              <div className="flex items-center space-x-2">
                <CheckCircle size={18} className="text-green-600" />
                <span>Locally Owned & Operated</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle size={18} className="text-green-600" />
                <span>Patient-Focused Care</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle size={18} className="text-green-600" />
                <span>Experienced Doctor of Audiology</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle size={18} className="text-green-600" />
                <span>5-Star Reviews</span>
              </div>
            </div>
          </div>

          {/* Image Area Placeholder */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-white border p-2">
              <div className="w-full h-full bg-slate-200 rounded-xl relative flex items-center justify-center overflow-hidden">
                <Image 
                  src="/patient-interaction.jpg" 
                  alt="Doctor performing hearing test with patient" 
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border flex items-center space-x-4">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  5.0
                </div>
                <div>
                  <div className="flex text-yellow-400 text-sm">★★★★★</div>
                  <p className="text-sm font-medium">Highly Recommended</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
