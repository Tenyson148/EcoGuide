import React from 'react';

interface CTAProps {
  title: string;
  description: string;
  buttonText: string;
}

const CTA: React.FC<CTAProps> = ({ title, description, buttonText }) => {
  return (
    <section className="bg-gradient-to-r from-[#2d5f4f] to-[#6b9080] py-20 px-4">
      <div className="max-w-4xl mx-auto text-center text-white space-y-6">
        <h2 className="text-4xl md:text-5xl font-bold">
          {title}
        </h2>
        <p className="text-xl text-white/90">
          {description}
        </p>
        <button className="bg-white text-[#2d5f4f] px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 mt-8">
          {buttonText}
        </button>
      </div>
    </section>
  );
};

export default CTA;
