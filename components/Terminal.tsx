import React, { useEffect, useState } from 'react';

const logs = [
  { id: 1, text: "[INFO]: Connecting to Mojang Auth Servers...", delay: 200 },
  { id: 2, text: "[INFO]: Validating UUID for user...", delay: 800 },
  { id: 3, text: "[WARN]: Checking punishment history (LiteBans)...", delay: 1500 },
  { id: 4, text: "[INFO]: History Clear. Linking Discord ID...", delay: 2400 },
  { id: 5, text: "[SUCCESS]: Application queued in /staff-requests.", delay: 3200, success: true },
];

export const TerminalView = () => {
  const [visibleLogs, setVisibleLogs] = useState<number[]>([]);

  useEffect(() => {
    logs.forEach((log) => {
      setTimeout(() => {
        setVisibleLogs((prev) => [...prev, log.id]);
      }, log.delay);
    });
  }, []);

  return (
    <div className="w-full bg-black/80 border border-white/10 rounded-lg p-4 font-mono text-xs overflow-hidden shadow-2xl backdrop-blur-md">
      <div className="flex items-center gap-1.5 mb-3 border-b border-white/5 pb-2 justify-between">
        <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
        </div>
        <span className="ml-2 text-zinc-600">server_console — latest.log</span>
      </div>
      <div className="space-y-1">
        {logs.map((log) => (
          <div 
            key={log.id} 
            className={`transition-opacity duration-300 ${visibleLogs.includes(log.id) ? 'opacity-100' : 'opacity-0'}`}
          >
            <span className="text-zinc-600 mr-2">
                {new Date().toLocaleTimeString('en-US', { hour12: false })}
            </span>
            <span className={log.success ? 'text-green-400' : log.text.includes('WARN') ? 'text-yellow-400' : 'text-zinc-300'}>
              {log.text}
            </span>
          </div>
        ))}
        <div className="animate-pulse text-zinc-500 mt-2">_</div>
      </div>
    </div>
  );
};