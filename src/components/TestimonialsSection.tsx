"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      text: "The staff at Birkdale Audiology are absolutely wonderful. They took the time to explain everything to my mother in a way she could easily understand.",
      name: "Sarah M.",
      rating: 5,
    },
    {
      text: "I was struggling with tinnitus for years. Their customized treatment program completely changed my quality of life. Highly recommended!",
      name: "David P.",
      rating: 5,
    },
    {
      text: "Professional, caring, and thorough. I've worn hearing aids for 20 years and this is the best programming and service I've ever received.",
      name: "James T.",
      rating: 5,
    },
    {
      text: "They make the whole process so easy. Being locally owned really shows in how much they care about their patients.",
      name: "Linda K.",
      rating: 5,
    },
    {
      text: "I was extremely anxious about getting my hearing checked, but Dr. Smith and the team made me feel completely at ease.",
      name: "Robert E.",
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((current) => (current === 0 ? testimonials.length - 1 : current - 1));
  };

  const next = () => {
    setCurrentIndex((current) => (current === testimonials.length - 1 ? 0 : current + 1));
  };

  return (
    <section id="testimonials" className="py-24 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-blue-600 font-semibold mb-2 tracking-wide uppercase text-sm">Patient Reviews</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-primary mb-6">What Our Patients Say</h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Carousel Area */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 flex flex-col items-center text-center min-h-[300px] justify-center relative">
            
            <Quote className="w-16 h-16 text-blue-100 absolute top-8 left-8 transform -rotate-12" />
            
            <div className="relative z-10 w-full px-4 md:px-12">
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed italic mb-8">
                "{testimonials[currentIndex].text}"
              </p>
              <div>
                <p className="font-semibold text-primary text-lg">{testimonials[currentIndex].name}</p>
                <p className="text-sm text-foreground/60">Verified Patient</p>
              </div>
            </div>
            
            <Quote className="w-16 h-16 text-blue-100 absolute bottom-8 right-8 transform rotate-[168deg]" />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-6 mt-8">
            <button 
              onClick={prev} 
              className="w-12 h-12 rounded-full bg-white border shadow-sm flex items-center justify-center text-primary hover:bg-slate-50 hover:text-blue-600 transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex space-x-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === currentIndex ? "bg-blue-600 w-8" : "bg-slate-300"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <button 
              onClick={next} 
              className="w-12 h-12 rounded-full bg-white border shadow-sm flex items-center justify-center text-primary hover:bg-slate-50 hover:text-blue-600 transition-colors"
              aria-label="Next review"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="text-center mt-12">
          <a href="#" className="font-semibold text-blue-600 hover:text-blue-800 transition-colors">See All Reviews &rarr;</a>
        </div>
        
      </div>
    </section>
  );
}
