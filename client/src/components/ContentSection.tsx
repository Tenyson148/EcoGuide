import React from 'react';

interface ContentSectionProps {
  icon: string;
  title: string;
  description: string;
  bullets: string[];
  image: string;
  index: number;
}

const ContentSection: React.FC<ContentSectionProps> = ({ icon, title, description, bullets, image, index }) => {
  const isEven = index % 2 === 0;
  
  console.log(`Section ${index}: image = ${image}`);

  return (
    <section className={`py-20 px-4 ${isEven ? 'bg-white' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto">
        <div className={`flex flex-col md:flex-row gap-12 items-center ${!isEven ? 'md:flex-row-reverse' : ''}`}>
          <div className="md:w-1/2 space-y-6 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#2d5f4f] to-[#6b9080] rounded-2xl shadow-lg transform hover:scale-110 transition-transform duration-300">
              <i className={`bx ${icon} text-3xl text-white`}></i>
            </div>
            <h2 className="text-4xl font-bold text-gray-900">
              {title}
            </h2>
            <p className="text-lg text-gray-700 font-medium">
              {description}
            </p>
            <ul className="space-y-3">
              {bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-600">
                  <i className="bx bx-check-circle text-2xl text-[#2d5f4f] mt-0.5 flex-shrink-0"></i>
                  <span className="text-base leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-1/2">
            <div className="aspect-video rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 bg-gray-200">
              {image ? (
                <img 
                  src={image} 
                  alt={title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    console.error(`Failed to load image: ${image}`);
                    e.currentTarget.style.display = 'none';
                  }}
                  onLoad={() => console.log(`Successfully loaded: ${image}`)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No image
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
