"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { MapPin, Phone, Mail, CheckCircle } from "lucide-react";

export function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 1200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left: Contact Info & Map */}
          <div className="space-y-10">
            <div>
              <p className="text-blue-600 font-semibold mb-2 tracking-wide uppercase text-sm">Serving the Lake Norman Community</p>
              <h2 className="text-3xl md:text-4xl font-semibold text-primary mb-6">We're Here to Help You Hear Better</h2>
              <p className="text-foreground/80 text-lg leading-relaxed">
                Contact us today to schedule your comprehensive evaluation. Our friendly front office team is ready to answer any questions about insurance, appointments, or our audiology services.
              </p>
            </div>

            <div className="space-y-6 bg-slate-50 p-8 rounded-2xl border">
              <div className="flex items-start space-x-4">
                <div className="bg-white p-3 rounded-full shadow-sm text-blue-600">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-primary">Location</h4>
                  <p className="text-foreground/70 mt-1">
                    8936 Northpointe Executive Park Drive<br/>
                    Suite 195<br/>
                    Huntersville, NC 28078
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-white p-3 rounded-full shadow-sm text-blue-600">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-primary">Phone & Fax</h4>
                  <p className="text-foreground/70 mt-1">
                    Main: (704) 237-4099<br/>
                    Fax: (704) 237-4095
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <a href="tel:7042374099" className="inline-flex items-center justify-center w-full px-6 py-3 rounded-md bg-blue-50 text-blue-700 font-semibold border border-blue-200 hover:bg-blue-100 transition-colors">
                  <Phone className="w-4 h-4 mr-2" /> Click to Call (704) 237-4099
                </a>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="w-full h-64 bg-slate-200 rounded-2xl overflow-hidden relative border shadow-sm flex items-center justify-center">
              <div className="text-center text-slate-500">
                <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="font-medium">Google Maps Embed Placeholder</p>
              </div>
            </div>

          </div>

          {/* Right: Contact Form */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl border border-slate-100 h-fit">
            <h3 className="text-2xl font-semibold text-primary mb-6">Send Us a Message</h3>
            
            {status === "success" ? (
              <div className="bg-green-50 text-green-900 p-8 rounded-2xl border-2 border-green-200 text-center space-y-4">
                <CheckCircle className="w-16 h-16 mx-auto text-green-600" />
                <h4 className="text-2xl font-bold">Message Sent Successfully!</h4>
                <p className="text-lg">Thank you for reaching out. Our team will get back to you within 1 business day.</p>
                <Button variant="outline" onClick={() => setStatus("idle")} className="mt-4 bg-white border-2 hover:bg-slate-50 font-semibold h-12 px-6">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-base font-semibold text-foreground mb-2">
                    Full Name <span className="text-rose-600 ml-1" aria-label="Required">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-4 rounded-xl border-2 border-slate-300 focus:ring-4 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all placeholder:text-slate-500 bg-white text-base font-medium"
                    placeholder="e.g. Jane Doe"
                    aria-required="true"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-base font-semibold text-foreground mb-2">
                      Email Address <span className="text-rose-600 ml-1" aria-label="Required">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-4 rounded-xl border-2 border-slate-300 focus:ring-4 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all placeholder:text-slate-500 bg-white text-base font-medium"
                      placeholder="e.g. jane@example.com"
                      aria-required="true"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-base font-semibold text-foreground mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-4 rounded-xl border-2 border-slate-300 focus:ring-4 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all placeholder:text-slate-500 bg-white text-base font-medium"
                      placeholder="e.g. (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-base font-semibold text-foreground mb-2">
                    How can we help you? <span className="text-rose-600 ml-1" aria-label="Required">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-4 rounded-xl border-2 border-slate-300 focus:ring-4 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all resize-none placeholder:text-slate-500 bg-white text-base font-medium"
                    placeholder="I am interested in scheduling a hearing test..."
                    aria-required="true"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full text-lg font-bold h-14 rounded-xl bg-blue-700 hover:bg-blue-800" disabled={status === "submitting"}>
                  {status === "submitting" ? "Sending Message..." : "Send Message"}
                </Button>
                <div className="bg-slate-50 border p-4 rounded-xl mt-4">
                  <p className="text-sm text-center text-slate-600 font-medium">
                    This form is for general inquiries. Please do not submit confidential medical information.
                  </p>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
