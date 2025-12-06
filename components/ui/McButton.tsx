import React from 'react';

interface McButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  fullWidth?: boolean;
}

export const McButton: React.FC<McButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  
  // Base styles: Blocky, bold text, transition on hover
  const baseStyles = "relative px-6 py-4 font-pixel text-xl uppercase tracking-widest transition-all duration-200 border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black";
  
  const variants = {
    // Green (Minecraft Success)
    primary: "bg-[#3C8527] hover:bg-[#2b6e1b] text-white hover:shadow-[0_0_15px_rgba(60,133,39,0.5)] border-[#55FF55]/20",
    
    // Grey (Minecraft Stone)
    secondary: "bg-[#2b2b2b] hover:bg-[#383838] text-[#ccc] hover:text-white border-[#555]",
    
    // Red (Minecraft Danger)
    danger: "bg-[#8f1e1e] hover:bg-[#a82424] text-white hover:shadow-[0_0_15px_rgba(143,30,30,0.5)]"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {/* Tiny pixel corners simulation via clip-path could go here, but border-radius-0 works for blocky feel */}
      <span className="relative z-10 flex items-center justify-center gap-2" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}>
        {children}
      </span>
    </button>
  );
};