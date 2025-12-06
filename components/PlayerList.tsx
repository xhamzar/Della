import React from 'react';
import { ServerStatusResponse } from '../types';
import { McCard } from './ui/McCard';

interface PlayerListProps {
  data: ServerStatusResponse | null;
}

export const PlayerList: React.FC<PlayerListProps> = ({ data }) => {
  const isOnline = data?.online;
  const players = data?.players?.list || [];
  const onlineCount = data?.players?.online || 0;
  const maxPlayers = data?.players?.max || 10;
  
  return (
    <McCard title={`PLAYERS [${onlineCount}/${maxPlayers}]`} className="h-full flex flex-col" noPadding>
      {/* Dark semi-transparent list background typical of MC tab menu */}
      <div className="bg-[#000000]/40 flex-1 min-h-[300px] max-h-[500px] overflow-y-auto custom-scrollbar p-2">
        {isOnline && players.length > 0 ? (
          <div className="grid grid-cols-1 gap-1">
            {players.map((player, index) => (
              <div 
                key={`${player.name_raw}-${index}`}
                className="flex items-center justify-between p-2 hover:bg-white/10 transition-colors rounded-sm group"
              >
                <div className="flex items-center gap-3">
                  {/* Steve Head placeholder */}
                  <div className="w-6 h-6 bg-[#222] border border-[#444] flex items-center justify-center">
                    <div className="w-4 h-4 bg-gray-500/50"></div>
                  </div>
                  <span className="font-pixel text-lg text-gray-300 group-hover:text-[#55FF55] tracking-wide">
                    {player.name_clean}
                  </span>
                </div>
                
                {/* Simulated Ping Bars */}
                <div className="flex gap-[2px] items-end h-3">
                    <div className="w-1 h-1 bg-[#55FF55]"></div>
                    <div className="w-1 h-2 bg-[#55FF55]"></div>
                    <div className="w-1 h-3 bg-[#55FF55]"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-600 gap-2 opacity-50">
             <div className="font-pixel text-xl uppercase">
               {isOnline ? "No Signals Detected" : "Server Unreachable"}
             </div>
          </div>
        )}
      </div>
    </McCard>
  );
};