import React from 'react';

interface HeroProps {
  title: string;
  subtitle: string;
  description: string;
  videoPlaceholder?: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, description, videoPlaceholder }) => {
  return (
    <section className="relative bg-gradient-to-br from-[#2d5f4f] via-[#6b9080] to-[#8fae9e] py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-6 animate-fade-in">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              <i className='bx bx-time-five mr-2'></i>
              Track Daily Impact
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              {title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-light">
              {subtitle}
            </p>
            <p className="text-lg text-white/80">
              {description}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="bg-white text-[#2d5f4f] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                Get Started
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
          
          <div className="relative">
            {videoPlaceholder ? (
              <div className="aspect-video rounded-2xl shadow-2xl border-4 border-white/20 overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <img 
                  src={videoPlaceholder} 
                  alt="EcoGuide Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="video-placeholder aspect-video rounded-2xl shadow-2xl border-4 border-white/20 backdrop-blur-sm transform hover:scale-105 transition-transform duration-300">
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
