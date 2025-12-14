import React, { useState, useEffect } from 'react';
import { Loader2, WifiOff } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { FormSection } from './components/FormSection';
import { BentoGrid } from './components/BentoGrid';

// Define the shape of the config data coming from backend
export interface AppConfig {
  isOpen: boolean;
  season: string;
  dates: {
    start: string;
    review: string;
    end: string;
  };
  currentStage: 'start' | 'review' | 'end';
  roles: {
    helper: 'OPEN' | 'CLOSED' | 'LIMITED';
    builder: 'OPEN' | 'CLOSED' | 'LIMITED';
    developer: 'OPEN' | 'CLOSED' | 'LIMITED';
  };
}

const App = () => {
  const [lang, setLang] = useState<'en' | 'id'>('en');
  
  // STRICT STATE: Start with null. No mock data allowed.
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch Config from Backend on Load
  const fetchConfig = () => {
    setIsLoading(true);
    setError(false);
    
    fetch('http://localhost:3000/api/config')
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch config");
        return res.json();
      })
      .then(data => {
        setConfig(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Backend unreachable:", err);
        setError(true);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  const t = {
    badgeOpen: lang === 'en' ? 'Applications Open' : 'Pendaftaran Dibuka',
    badgeClosed: lang === 'en' ? 'Applications Closed' : 'Pendaftaran Ditutup',
    heroTitle: lang === 'en' ? 'Craft the Future of' : 'Bangun Masa Depan',
    heroDesc: lang === 'en' 
        ? 'We are seeking dedicated Moderators, Builders, and Developers to help us maintain the gold standard of Minecraft Survival.' 
        : 'Kami mencari Moderator, Builder, dan Developer berdedikasi untuk membantu kami menjaga standar terbaik Minecraft Survival.',
    datePrefix: lang === 'en' ? 'Until' : 'Sampai',
    footerRights: lang === 'en' ? 'Not affiliated with Mojang AB.' : 'Tidak berafiliasi dengan Mojang AB.',
    footerLinks: {
        rules: lang === 'en' ? 'Rules' : 'Peraturan',
        store: lang === 'en' ? 'Store' : 'Toko',
        discord: 'Discord'
    },
    loading: lang === 'en' ? 'ESTABLISHING CONNECTION...' : 'MENGHUBUNGKAN KE SERVER...',
    errorTitle: lang === 'en' ? 'Connection Failed' : 'Koneksi Gagal',
    errorDesc: lang === 'en' ? 'Could not retrieve application data from the server. The backend might be offline.' : 'Gagal mengambil data dari server. Backend mungkin sedang offline.',
    retry: lang === 'en' ? 'Retry Connection' : 'Coba Lagi'
  };

  // 1. LOADING SCREEN
  if (isLoading) {
    return (
        <div className="min-h-screen w-full bg-zinc-950 flex items-center justify-center relative overflow-hidden">
             {/* Background Effects */}
             <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
             
             <div className="flex flex-col items-center gap-6 relative z-10">
                <div className="relative">
                    <div className="w-12 h-12 border-2 border-zinc-800 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-12 h-12 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="text-zinc-500 text-xs font-mono tracking-widest animate-pulse">{t.loading}</p>
            </div>
        </div>
    );
  }

  // 2. ERROR SCREEN (No Mock Data fallback)
  if (error || !config) {
    return (
        <div className="min-h-screen w-full bg-zinc-950 flex items-center justify-center p-6 relative">
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
            
            <div className="max-w-md w-full bg-zinc-900/50 border border-red-500/20 p-8 rounded-2xl text-center backdrop-blur-xl relative z-10 shadow-2xl">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                    <WifiOff className="w-8 h-8 text-red-500" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">{t.errorTitle}</h2>
                <p className="text-zinc-500 mb-8 text-sm leading-relaxed">{t.errorDesc}</p>
                <button 
                    onClick={fetchConfig} 
                    className="px-6 py-3 bg-white text-black rounded-xl text-sm font-bold hover:bg-zinc-200 transition-all hover:-translate-y-0.5 shadow-lg active:translate-y-0"
                >
                    {t.retry}
                </button>
            </div>
        </div>
    );
  }

  // 3. MAIN APP (Only renders when config exists)
  return (
    <div className="min-h-screen w-full bg-zinc-950 text-white relative selection:bg-indigo-500/30 selection:text-indigo-200 font-sans overflow-x-hidden">
      
      {/* Ambient Background Blobs */}
      <div className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 z-[1] opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      <Navbar lang={lang} setLang={setLang} />

      {/* Main Layout - Centered Container */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-24">
        
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-24 animate-fade-in">
           {/* Status Pill - Dynamic based on config.isOpen */}
           <div className={`mb-8 flex items-center gap-3 bg-zinc-900/50 border ${config.isOpen ? 'border-emerald-500/20 hover:border-emerald-500/40' : 'border-red-500/20 hover:border-red-500/40'} rounded-full pl-2 pr-4 py-1.5 backdrop-blur-md shadow-lg transition-colors cursor-default`}>
             <div className={`flex items-center gap-2 ${config.isOpen ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20'} border px-2.5 py-0.5 rounded-full`}>
                <span className="relative flex h-2 w-2">
                  {config.isOpen && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${config.isOpen ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                </span>
                <span className={`text-[10px] font-bold ${config.isOpen ? 'text-emerald-400' : 'text-red-400'} uppercase tracking-wide`}>
                    {config.isOpen ? t.badgeOpen : t.badgeClosed}
                </span>
             </div>
             <span className="text-xs font-mono text-zinc-400">{t.datePrefix} {config.dates.end}</span>
           </div>
           
           <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 drop-shadow-2xl">
             {t.heroTitle} <br/> Symphony.
           </h1>
           
           <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed mb-12">
             {t.heroDesc}
           </p>
           
           {/* Application Form Centered */}
           <div id="application" className="w-full max-w-xl mx-auto">
             <FormSection lang={lang} isOpen={config.isOpen} />
           </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-20"></div>

        {/* Bento Grid Features (Roles & Timeline) */}
        <BentoGrid lang={lang} config={config} />

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600">
            <p>&copy; 2025 Symphony Network. {t.footerRights}</p>
            <div className="flex gap-6 font-medium">
                <a href="#" className="hover:text-zinc-400 transition-colors">{t.footerLinks.rules}</a>
                <a href="#" className="hover:text-zinc-400 transition-colors">{t.footerLinks.store}</a>
                <a href="#" className="hover:text-zinc-400 transition-colors">{t.footerLinks.discord}</a>
            </div>
        </footer>

      </main>
    </div>
  );
};

export default App;