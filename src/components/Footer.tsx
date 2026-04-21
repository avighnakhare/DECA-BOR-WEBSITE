import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Clinic Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Birkdale Audiology</h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed max-w-xs">
              Providing personalized, expert hearing care and comprehensive audiology services to the Lake Norman community.
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-4 text-sm text-primary-foreground/90">
            <h4 className="text-lg font-medium text-white mb-4">Contact</h4>
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
              <span>
                8936 Northpointe Executive Park Drive<br />
                Suite 195<br />
                Huntersville, NC 28078
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 shrink-0" />
              <span>(704) 237-4099</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="w-5 shrink-0 text-center text-xs border rounded-sm">F</span>
              <span>(704) 237-4095</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 text-sm">
            <h4 className="text-lg font-medium text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-primary-foreground/90">
              <li><Link href="#about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#services" className="hover:text-white transition-colors">Hearing Services</Link></li>
              <li><Link href="#testimonials" className="hover:text-white transition-colors">Patient Reviews</Link></li>
              <li><Link href="#contact" className="hover:text-white transition-colors">Book an Appointment</Link></li>
            </ul>
          </div>

          {/* Office Hours */}
          <div className="space-y-4 text-sm text-primary-foreground/90">
            <h4 className="text-lg font-medium text-white mb-4">Office Hours</h4>
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 shrink-0" />
              <div className="space-y-1">
                <p>Monday - Thursday: 8:30am - 5:00pm</p>
                <p>Friday: 8:30am - 12:00pm</p>
                <p>Saturday - Sunday: Closed</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row justify-between items-center text-xs text-primary-foreground/60 space-y-4 md:space-y-0">
          <p>&copy; {new Date().getFullYear()} Birkdale Audiology. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">HIPAA Notice</Link>
            <Link href="#" className="hover:text-white">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
