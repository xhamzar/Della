import React from 'react';

interface McCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  noPadding?: boolean;
}

export const McCard: React.FC<McCardProps> = ({ children, className = '', title, noPadding = false }) => {
  return (
    <div className={`relative group ${className}`}>
      {/* Background with blur and slight transparency */}
      <div className="bg-[#111111]/80 backdrop-blur-md border border-[#333] hover:border-[#555] transition-all duration-300 h-full overflow-hidden relative">
        
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#55FF55] opacity-50 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#55FF55] opacity-50 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#55FF55] opacity-50 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#55FF55] opacity-50 group-hover:opacity-100 transition-opacity"></div>

        {title && (
          <div className="bg-black/40 border-b border-[#333] p-3 flex items-center justify-between">
            <h3 className="text-[#AAAAAA] font-pixel text-xl uppercase tracking-widest group-hover:text-white transition-colors">
              {title}
            </h3>
            <div className="h-[2px] w-8 bg-[#55FF55]/50 rounded-full"></div>
          </div>
        )}
        
        <div className={noPadding ? '' : 'p-5'}>
          {children}
        </div>
      </div>
    </div>
  );
};