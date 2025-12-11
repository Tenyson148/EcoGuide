import React from 'react';
import { Bot } from 'lucide-react';
import Widget from './Widget.jsx';

const AIAssistant = () => {
  return (
    <div className="animate-fade-in">
      <Widget title="AI Assistant" icon={Bot} category="ai">
        <div className="ai-assistant">
          <div className="ai-header">
            <Bot className="ai-icon" />
            <h3 className="ai-title">AI Assistant </h3>
            <p className="ai-description">
          
            </p>
            <ul className="ai-features">
              <li className="feature-item">
                <span className="feature-check"></span>
                <span className="feature-text"></span>
              </li>
              <li className="feature-item">
                <span className="feature-check"></span>
                <span className="feature-text"></span>
              </li>
              <li className="feature-item">
                <span className="feature-check"></span>
                <span className="feature-text"></span>
              </li>
              <li className="feature-item">
                <span className="feature-check"></span>
                <span className="feature-text"></span>
              </li>
            </ul>
            <button className="ai-button">
              
            </button>
          </div>
        </div>
      </Widget>
    </div>
  );
};

export default AIAssistant;