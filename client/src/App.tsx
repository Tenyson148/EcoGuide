import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ContentSection from './components/ContentSection';
import CTA from './components/CTA';
import Footer from './components/Footer';

interface ContentData {
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  sections: Array<{
    id: string;
    icon: string;
    title: string;
    content: string;
  }>;
  cta: {
    title: string;
    description: string;
    buttonText: string;
  };
}

function App() {
  const [content, setContent] = useState<ContentData | null>(null);

  useEffect(() => {
    fetch('/data/content.json')
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(err => console.error('Error loading content:', err));
  }, []);

  if (!content) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="text-6xl mb-4">🌱</div>
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <main>
        <Hero {...content.hero} />
        {content.sections.map((section, index) => (
          <ContentSection key={section.id} {...section} index={index} />
        ))}
        <CTA {...content.cta} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
