import React from 'react';
import { ServerStatusResponse } from '../types';
import { RefreshCw } from 'lucide-react';

interface ServerHeaderProps {
  data: ServerStatusResponse | null;
  loading: boolean;
  onRefresh: () => void;
  serverName?: string;
}

export const ServerHeader: React.FC<ServerHeaderProps> = ({ data, loading, onRefresh, serverName }) => {
  const isOnline = data?.online;

  return (
    <div className="w-full relative overflow-hidden group">
      {/* Background Glow */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-full bg-${isOnline ? 'emerald' : 'red'}-500/10 blur-3xl rounded-full -z-10 transition-colors duration-1000`}></div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-6 px-4 md:px-8 border-b border-[#333]">
        
        {/* Left: Icon & Identity */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 bg-[#1a1a1a] border-2 border-[#444] shadow-2xl flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105 duration-300">
               {data?.icon ? (
                 <img src={data.icon} alt="Server Icon" className="w-full h-full object-cover pixelated" />
               ) : (
                 <span className="text-gray-600 font-pixel text-4xl">{serverName ? serverName[0] : '?'}</span>
               )}
            </div>
            {/* Online/Offline Dot Indicator */}
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-black ${isOnline ? 'bg-[#55FF55] shadow-[0_0_10px_#55FF55]' : 'bg-[#FF5555] shadow-[0_0_10px_#FF5555]'}`}></div>
          </div>

          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
               <h1 className="text-4xl md:text-5xl font-pixel text-white tracking-wide uppercase drop-shadow-md">
                 {serverName || "Minecraft Server"}
               </h1>
            </div>
            <div className="flex items-center gap-2 mt-1 justify-center md:justify-start">
               {loading ? (
                 <span className="text-gray-500 font-mono text-sm animate-pulse">Scanning...</span>
               ) : (
                 <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-[#55FF55]' : 'bg-[#FF5555]'}`}></span>
                    <span className={`font-pixel text-xl tracking-wider ${isOnline ? 'text-[#55FF55]' : 'text-[#FF5555]'}`}>
                      {isOnline ? 'SYSTEM ONLINE' : 'SYSTEM OFFLINE'}
                    </span>
                 </div>
               )}
            </div>
          </div>
        </div>

        {/* Right: Actions & MOTD Preview */}
        <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
           <button 
             onClick={onRefresh}
             disabled={loading}
             className="group/btn flex items-center gap-2 px-4 py-2 bg-[#222] border border-[#333] hover:border-[#555] text-gray-400 hover:text-white transition-all rounded-sm"
           >
             <span className="font-pixel text-lg">REFRESH</span>
             <RefreshCw size={16} className={`transition-transform ${loading ? 'animate-spin' : 'group-hover/btn:rotate-180'}`} />
           </button>
           
           {!loading && data?.motd?.clean && (
             <div className="hidden md:block text-right max-w-md">
               <p className="text-gray-400 font-mono text-sm leading-tight line-clamp-2 border-r-2 border-[#55FF55]/50 pr-3">
                 {data.motd.clean}
               </p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};