import React, { useState, useEffect } from 'react';
import { Box, Copy, Check, Users, Globe, Signal } from 'lucide-react';

interface NavbarProps {
  lang: 'en' | 'id';
  setLang: (lang: 'en' | 'id') => void;
}

export const Navbar = ({ lang, setLang }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);
  const [playerCount, setPlayerCount] = useState(1240);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulate subtle player count fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
        setPlayerCount(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const copyIp = () => {
    navigator.clipboard.writeText("play.symphony.gg");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const t = {
    apply: lang === 'en' ? 'Apply' : 'Daftar',
    roles: lang === 'en' ? 'Open Roles' : 'Posisi',
    wiki: lang === 'en' ? 'Wiki' : 'Wiki',
    online: lang === 'en' ? 'Online' : 'Online',
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none">
      <nav className={`
        pointer-events-auto
        w-full max-w-5xl
        rounded-2xl
        border border-white/10
        backdrop-blur-xl
        transition-all duration-500 ease-in-out
        flex items-center justify-between
        px-4 py-3 md:px-6 md:py-4
        ${scrolled ? 'bg-zinc-950/80 shadow-2xl translate-y-0' : 'bg-zinc-950/40 translate-y-2 shadow-none'}
      `}>
        
        {/* Logo Area */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.4)] border border-white/10">
            <Box className="w-5 h-5 text-white" />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="font-bold text-sm tracking-tight text-white leading-none">SYMPHONY</span>
            <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">Network</span>
          </div>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-medium text-zinc-400 uppercase tracking-widest">
          <a href="#application" className="hover:text-white transition-colors hover:shadow-[0_2px_0_0_white] pb-1">{t.apply}</a>
          <a href="#roles" className="hover:text-white transition-colors hover:shadow-[0_2px_0_0_white] pb-1">{t.roles}</a>
          <a href="#" className="hover:text-white transition-colors hover:shadow-[0_2px_0_0_white] pb-1">{t.wiki}</a>
        </div>

        {/* Action */}
        <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button 
              onClick={() => setLang(lang === 'en' ? 'id' : 'en')}
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:bg-white/5 text-xs font-medium text-zinc-400 hover:text-white transition-all"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang.toUpperCase()}</span>
            </button>

            <div className="w-px h-6 bg-white/10 hidden sm:block"></div>

            <div className="hidden lg:flex items-center gap-2 text-xs font-medium text-zinc-400">
                <div className="flex items-center gap-1.5 bg-zinc-900/50 px-2 py-1 rounded-md border border-white/5">
                    <Signal className="w-3 h-3 text-emerald-400" />
                    <span className="text-zinc-300 tabular-nums">{playerCount.toLocaleString()}</span>
                    <span className="text-zinc-500">{t.online}</span>
                </div>
            </div>

            <button 
                onClick={copyIp}
                className="h-9 px-4 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs font-medium hover:bg-zinc-800 hover:border-zinc-700 transition-all flex items-center gap-2 group active:scale-95 shadow-lg"
            >
                {copied ? (
                    <>
                        <span className="text-emerald-400 font-bold">Copied!</span>
                        <Check className="w-3 h-3 text-emerald-400" />
                    </>
                ) : (
                    <>
                        <span className="tracking-wide">play.symphony.gg</span>
                        <Copy className="w-3 h-3 text-zinc-500 group-hover:text-white transition-colors" />
                    </>
                )}
            </button>
        </div>
      </nav>
    </div>
  );
};