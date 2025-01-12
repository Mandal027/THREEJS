import { ArrowRight, Facebook, Instagram, Mail, Phone } from "lucide-react";
import { useState, useEffect } from 'react';


export default function Header() {

    const [isVisible, setIsVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setIsVisible(true);
    // Delay content animation
    const timer = setTimeout(() => {
      setContentVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);


  return (
    
    <div className="w-full max-w-4xl mx-auto rounded-lg overflow-hidden">
      {/* Existing Header */}
      {/* <div className="flex items-center px-4 py-2 md:px-10 justify-between w-full border-b">
        <div className="py-1">
          <a
            href="/"
            className="text-xl md:text-2xl font-black tracking-widest"
          >
            PAINTING WING
          </a>
          <h4 className="text-xs md:text-sm font-bold tracking-wider">
            Lets Satisfaction Prevail
          </h4>
        </div>
        <div>
          <img
            src="/api/placeholder/110/80"
            alt="logo"
            className="w-[110px] h-[80px] object-contain"
          />
        </div>
      </div> */}

      {/* Content Section */}
      <div className="p-6 md:p-8">
        {/* About Section */}
        <div className={`mb-8 transition-all duration-500 ease-out delay-100 ${
          contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <h2 className="text-2xl font-bold mb-4">About BIT Painting Wing</h2>
          <p className="text-grey mb-4">
            BIT Painting Wing is a creative community dedicated to fostering
            artistic expression and cultural enrichment within our institution.
            Founded with the vision of bringing colors to campus life, we
            provide a platform for aspiring artists to showcase their talents
            and develop their skills.
          </p>
        </div>

        {/* Activities Section */}
        <div className={`mb-8 transition-all duration-500 ease-out delay-200 ${
          contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <h3 className="text-xl font-semibold mb-3">Our Activities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-2">
              <ArrowRight className="w-5 h-5 text-orange-600 mt-1" />
              <div>
                <h4 className="font-medium">Campus Murals</h4>
                <p className="text-sm text-white">
                  Beautifying our campus with artistic expressions
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <ArrowRight className="w-5 h-5 text-orange-600 mt-1" />
              <div>
                <h4 className="font-medium">Art Workshops</h4>
                <p className="text-sm text-white">
                  Regular training sessions for skill development
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <ArrowRight className="w-5 h-5 text-orange-600 mt-1" />
              <div>
                <h4 className="font-medium">Exhibition Events</h4>
                <p className="text-sm text-white">
                  Annual showcases of student artwork
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <ArrowRight className="w-5 h-5 text-orange-600 mt-1" />
              <div>
                <h4 className="font-medium">Collaborative Projects</h4>
                <p className="text-sm text-white">
                  Working with other college clubs and organizations
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className={`mb-8 transition-all duration-500 ease-out delay-300 ${
          contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-orange-600" />
              <a
                href="mailto:painting@bit.edu"
                className="text-white hover:text-orange-600"
              >
                painting@bit.edu
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-orange-600" />
              <a
                href="tel:+1234567890"
                className="text-white hover:text-orange-600"
              >
                +123 456 7890
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <Instagram className="w-5 h-5 text-orange-600" />
              <a href="#" className="text-white hover:text-orange-600">
                @bit_painting_wing
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <Facebook className="w-5 h-5 text-orange-600" />
              <a href="#" className="text-white hover:text-orange-600">
                BIT Painting Wing
              </a>
            </div>
          </div>
        </div>

        {/* Join Section */}
        <div className={`mt-8 bg-orange-50 p-6 rounded-lg transition-all duration-500 ease-out delay-400 ${
          contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <h3 className="text-xl font-semibold mb-3">Join Our Wing</h3>
          <p className="text-white mb-4">
            Are you passionate about art? Join our wing and be part of a
            creative community that celebrates artistic expression and cultural
            diversity.
          </p>
          <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}
