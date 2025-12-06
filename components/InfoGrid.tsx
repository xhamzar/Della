import React from 'react';
import { ServerStatusResponse } from '../types';
import { Activity, Signal, Users, Cpu } from 'lucide-react';

interface InfoGridProps {
  data: ServerStatusResponse | null;
}

const StatSlot = ({ icon: Icon, label, value, highlight = false }: { icon: any, label: string, value: string, highlight?: boolean }) => (
  <div className={`relative bg-[#1a1a1a] border border-[#333] hover:border-[#555] p-4 flex flex-col items-center justify-center gap-2 transition-all hover:-translate-y-1 group h-full`}>
    <div className={`p-2 rounded-full bg-black/50 ${highlight ? 'text-[#55FF55]' : 'text-gray-400'} group-hover:scale-110 transition-transform`}>
      <Icon size={24} />
    </div>
    <div className="text-center">
      <div className={`font-pixel text-2xl tracking-widest ${highlight ? 'text-white' : 'text-gray-200'}`}>
        {value}
      </div>
      <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest font-sans mt-1">
        {label}
      </div>
    </div>
  </div>
);

export const InfoGrid: React.FC<InfoGridProps> = ({ data }) => {
  if (!data?.online) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      <StatSlot 
        icon={Users} 
        label="Online" 
        value={`${data.players?.online || 0}/${data.players?.max || 0}`} 
        highlight
      />
      <StatSlot 
        icon={Activity} 
        label="Ping" 
        value={`${data.latency || '-'}ms`} 
      />
      <StatSlot 
        icon={Cpu} 
        label="Version" 
        value={(data.version?.name_clean || '').split(' ').pop() || 'Bedrock'} 
      />
      <StatSlot 
        icon={Signal} 
        label="Protocol" 
        value={data.version?.protocol?.toString() || '-'} 
      />
    </div>
  );
};