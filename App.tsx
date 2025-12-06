import React, { useEffect, useState, useCallback } from 'react';
import { ServerHeader } from './components/ServerHeader';
import { InfoGrid } from './components/InfoGrid';
import { PlayerList } from './components/PlayerList';
import { ConnectionActions } from './components/ConnectionActions';
import { fetchServerStatus } from './services/api';
import { ServerStatusResponse } from './types';
import { McCard } from './components/ui/McCard';

// Configuration
const CONFIG = {
  NAME: "Della",
  IP: "49.12.209.208",
  PORT: "40420"
};

const App: React.FC = () => {
  const [status, setStatus] = useState<ServerStatusResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  // We ignore error state for UI cleanliness, falling back to offline visual state
  const [, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchServerStatus(CONFIG.IP, CONFIG.PORT);
      setStatus(data);
    } catch (err) {
      setError("Failed to reach the status satellite.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 30000); // Auto refresh every 30s
    return () => clearInterval(interval);
  }, [loadData]);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 lg:p-8 flex flex-col gap-6 animate-fade-in">
      
      {/* Main Container Card */}
      <div className="border border-[#222] bg-[#0a0a0a] shadow-2xl relative overflow-hidden">
        
        {/* Top Decorative Bar */}
        <div className="h-1 w-full bg-gradient-to-r from-emerald-600 via-green-400 to-emerald-600"></div>

        <ServerHeader 
          data={status} 
          loading={loading} 
          onRefresh={loadData}
          serverName={CONFIG.NAME}
        />

        <div className="p-4 md:p-8 flex flex-col lg:flex-row gap-6">
            
            {/* Left Column: Stats & Connection */}
            <div className="flex-1 flex flex-col gap-6">
                <InfoGrid data={status} />
                
                <div className="mt-auto pt-4">
                  <ConnectionActions 
                    ip={CONFIG.IP} 
                    port={CONFIG.PORT} 
                    serverName={CONFIG.NAME}
                  />
                </div>
            </div>

            {/* Right Column: Player List */}
            <div className="w-full lg:w-[400px]">
                <PlayerList data={status} />
            </div>
        </div>

        {/* Footer info inside the panel */}
        <div className="bg-[#050505] py-2 px-4 flex justify-between items-center text-[#444] text-xs font-mono border-t border-[#222]">
           <span>SERVER: {CONFIG.IP}</span>
           <span>PORT: {CONFIG.PORT}</span>
        </div>
      </div>

    </div>
  );
};

export default App;