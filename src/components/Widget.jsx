import React from 'react';

const Widget = ({ title, icon: Icon, children, category }) => {
  return (
    <div className="widget">
      <div className="widget-overlay"></div>
      <div className="widget-content">
        <div className="widget-header">
          <div className="flex items-center gap-3">
            <div className="widget-icon">
              <Icon className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800">{title}</h3>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Widget;