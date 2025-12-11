import React from 'react';

interface ContentSectionProps {
  icon: string;
  title: string;
  content: string;
  index: number;
}

const ContentSection: React.FC<ContentSectionProps> = ({ icon, title, content, index }) => {
  const isEven = index % 2 === 0;

  return (
    <section className={`py-20 px-4 ${isEven ? 'bg-white' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto">
        <div className={`flex flex-col md:flex-row gap-12 items-center ${!isEven ? 'md:flex-row-reverse' : ''}`}>
          <div className="md:w-1/2 space-y-6 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#2d5f4f] to-[#6b9080] rounded-2xl text-3xl shadow-lg transform hover:scale-110 transition-transform duration-300">
              {icon}
            </div>
            <h2 className="text-4xl font-bold text-gray-900">
              {title}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {content}
            </p>
          </div>
          <div className="md:w-1/2">
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 shadow-xl transform hover:scale-105 transition-transform duration-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
