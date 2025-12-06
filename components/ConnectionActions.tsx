import React, { useState } from 'react';
import { McButton } from './ui/McButton';
import { Copy, Check, Gamepad2, Globe } from 'lucide-react';

interface ConnectionActionsProps {
  ip: string;
  port: string;
  serverName: string;
}

export const ConnectionActions: React.FC<ConnectionActionsProps> = ({ ip, port, serverName }) => {
  const [copied, setCopied] = useState(false);

  const fullAddress = `${ip}:${port}`;
  // Deep link for Minecraft Bedrock
  const joinLink = `minecraft://?addExternalServer=${encodeURIComponent(serverName)}|${ip}:${port}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4 mt-auto">
      {/* Primary Action - Large and Green */}
      <a href={joinLink} className="block w-full text-decoration-none group">
        <McButton fullWidth variant="primary" className="h-16 flex items-center justify-center gap-4 text-2xl group-hover:scale-[1.01] transition-transform">
          <Gamepad2 size={28} />
          <span>ADD TO MINECRAFT</span>
        </McButton>
      </a>
      
      {/* Secondary Action - IP Copy */}
      <div className="flex items-center gap-0 bg-[#111] border border-[#333] p-1 rounded-sm">
         <div className="px-4 py-2 bg-black/50 border-r border-[#333] flex items-center gap-2 text-gray-500">
            <Globe size={16} />
            <span className="font-pixel text-lg hidden sm:inline">IP ADDRESS</span>
         </div>
         <div className="flex-1 text-center font-mono text-gray-300 tracking-wider text-sm sm:text-base px-2 truncate">
            {fullAddress}
         </div>
         <button 
           onClick={handleCopy}
           className="px-4 py-3 hover:bg-[#222] text-gray-400 hover:text-white transition-colors relative"
           title="Copy IP"
         >
            {copied ? <Check size={20} className="text-[#55FF55]" /> : <Copy size={20} />}
            {copied && (
                <span className="absolute -top-10 right-0 bg-[#55FF55] text-black font-pixel px-2 py-1 text-sm shadow-lg animate-bounce">
                    COPIED!
                </span>
            )}
         </button>
      </div>
    </div>
  );
};