import React from 'react';
import { Shield, Hammer, Terminal, Calendar, Clock, Lock, CheckCircle2 } from 'lucide-react';
import { Card } from './UI';
import { AppConfig } from '../App';

interface BentoGridProps {
  lang: 'en' | 'id';
  config: AppConfig;
}

export const BentoGrid = ({ lang, config }: BentoGridProps) => {
  const t = {
    title: lang === 'en' ? 'Current Openings' : 'Posisi Tersedia',
    subtitle: lang === 'en' ? 'View the timeline and available positions for this recruitment cycle.' : 'Lihat jadwal dan posisi yang tersedia untuk periode rekrutmen ini.',
    timelineTitle: lang === 'en' ? 'Recruitment Timeline' : 'Jadwal Rekrutmen',
    timelineDesc: lang === 'en' ? 'Applications close automatically on March 1st.' : 'Pendaftaran ditutup otomatis pada 1 Maret.',
    helper: lang === 'en' ? 'Helper / Moderator' : 'Helper / Moderator',
    helperDesc: lang === 'en' ? 'Frontline community support and chat moderation.' : 'Dukungan komunitas dan moderasi chat.',
    builder: lang === 'en' ? 'Builder' : 'Builder',
    builderDesc: lang === 'en' ? 'Creating maps, lobbies, and seasonal events.' : 'Membuat map, lobby, dan event musiman.',
    dev: lang === 'en' ? 'Developer' : 'Developer',
    devDesc: lang === 'en' ? 'Plugin development (Java/Kotlin) and optimization.' : 'Pengembangan plugin (Java/Kotlin) dan optimasi.',
    req: {
        age: lang === 'en' ? 'Age 16+' : 'Umur 16+',
        mic: lang === 'en' ? 'Microphone' : 'Mikrofon',
        portfolio: lang === 'en' ? 'Portfolio' : 'Portofolio',
        exp: lang === 'en' ? 'Experience' : 'Pengalaman'
    },
    stages: {
        start: lang === 'en' ? 'Apps Open' : 'Buka',
        review: lang === 'en' ? 'Reviewing' : 'Review',
        end: lang === 'en' ? 'Closing' : 'Tutup'
    }
  };

  // Helper to determine styling based on Open/Closed
  const getRoleStyle = (status: string) => {
    if (status === 'CLOSED') return { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' };
    if (status === 'LIMITED') return { color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' };
    return { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' };
  };

  return (
    <section id="roles" className="py-20">
      <div className="mb-12 text-center md:text-left">
        <h2 className="text-3xl font-bold tracking-tight text-white mb-2">{t.title}</h2>
        <p className="text-zinc-500 text-lg max-w-2xl">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Timeline Card - Large */}
        <Card className="col-span-1 md:col-span-2 p-8 bg-zinc-900/40 relative group overflow-hidden border-indigo-500/20">
             <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
             
             <Calendar className="absolute -right-6 -bottom-6 w-56 h-56 text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-700 ease-out pointer-events-none" />
            
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                        <Clock className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">{t.timelineTitle}</h3>
                        <span className="text-xs text-indigo-400 font-mono uppercase tracking-wider">{config.season}</span>
                    </div>
                </div>
                
                {/* Horizontal Timeline Visual */}
                <div className="relative pt-2 pb-6">
                    <div className="absolute top-2 left-0 w-full h-1 bg-white/5 rounded-full"></div>
                    {/* Dynamic progress bar width based on stage */}
                    <div className={`absolute top-2 left-0 h-1 bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)] transition-all duration-1000 ${config.currentStage === 'end' ? 'w-full' : config.currentStage === 'review' ? 'w-[50%]' : 'w-[15%]'}`}></div>
                    
                    <div className="grid grid-cols-3 gap-4 relative">
                        {/* Step 1: Start */}
                        <div className="flex flex-col items-start relative">
                            <div className={`w-5 h-5 rounded-full bg-zinc-950 border-2 ${config.currentStage === 'start' ? 'border-white animate-pulse-slow' : 'border-indigo-500'} flex items-center justify-center mb-3 relative z-10`}>
                                <div className={`w-2 h-2 rounded-full ${config.currentStage === 'start' ? 'bg-white' : 'bg-indigo-500'}`}></div>
                            </div>
                            {config.currentStage === 'start' && <div className="absolute -top-8 left-0 px-2 py-0.5 bg-white text-black text-[10px] font-bold rounded-full mb-1 shadow-lg">NOW</div>}
                            <span className="text-xs font-mono text-indigo-400 mb-1">{config.dates.start}</span>
                            <h4 className="text-white font-medium text-sm">{t.stages.start}</h4>
                        </div>

                        {/* Step 2: Review */}
                        <div className="flex flex-col items-center relative">
                             <div className={`w-5 h-5 rounded-full bg-zinc-950 border-2 ${config.currentStage === 'review' ? 'border-white animate-pulse-slow' : config.currentStage === 'end' ? 'border-indigo-500' : 'border-zinc-700'} flex items-center justify-center mb-3 relative z-10`}>
                                <div className={`w-2 h-2 rounded-full ${config.currentStage === 'review' ? 'bg-white' : config.currentStage === 'end' ? 'bg-indigo-500' : 'bg-zinc-700'}`}></div>
                            </div>
                            {config.currentStage === 'review' && <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-white text-black text-[10px] font-bold rounded-full mb-1 shadow-lg">NOW</div>}
                            <span className={`text-xs font-mono mb-1 ${config.currentStage === 'start' ? 'text-zinc-500' : 'text-indigo-400'}`}>{config.dates.review}</span>
                            <h4 className={`font-medium text-sm ${config.currentStage === 'start' ? 'text-zinc-500' : 'text-white'}`}>{t.stages.review}</h4>
                        </div>

                        {/* Step 3: End */}
                        <div className="flex flex-col items-end relative">
                            <div className={`w-5 h-5 rounded-full bg-zinc-950 border-2 ${config.currentStage === 'end' ? 'border-white animate-pulse-slow' : 'border-zinc-700'} flex items-center justify-center mb-3 relative z-10`}>
                                <div className={`w-2 h-2 rounded-full ${config.currentStage === 'end' ? 'bg-white' : 'bg-zinc-700'}`}></div>
                            </div>
                            {config.currentStage === 'end' && <div className="absolute -top-8 right-0 px-2 py-0.5 bg-white text-black text-[10px] font-bold rounded-full mb-1 shadow-lg">NOW</div>}
                            <span className="text-xs font-mono text-zinc-500 mb-1">{config.dates.end}</span>
                            <h4 className="text-zinc-400 font-medium text-sm">{t.stages.end}</h4>
                        </div>
                    </div>
                </div>
                
                <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500 bg-zinc-900/50 p-3 rounded-lg border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    {t.timelineDesc}
                </div>
            </div>
        </Card>

        {/* Roles Mapping */}
        {[
            { id: 'helper', title: t.helper, desc: t.helperDesc, status: config.roles.helper, icon: Shield, reqs: [t.req.age, t.req.mic] },
            { id: 'builder', title: t.builder, desc: t.builderDesc, status: config.roles.builder, icon: Hammer, reqs: [t.req.portfolio, 'WorldEdit'] },
            { id: 'dev', title: t.dev, desc: t.devDesc, status: config.roles.developer, icon: Terminal, reqs: [t.req.portfolio, 'Java/Kotlin'] }
        ].map((role) => {
            const styles = getRoleStyle(role.status);
            const isClosed = role.status === 'CLOSED';
            
            return (
                <Card key={role.id} className={`p-6 relative overflow-hidden group transition-all duration-300 ${isClosed ? 'opacity-75 bg-zinc-900/20' : 'hover:-translate-y-1'}`}>
                    {/* Status Badge */}
                    <div className={`absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-bold border ${styles.bg} ${styles.color} ${styles.border} shadow-lg z-20`}>
                        {role.status}
                    </div>

                    {/* Content */}
                    <div className={`relative z-10 ${isClosed ? 'grayscale' : ''}`}>
                         <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center mb-5 shadow-lg">
                            <role.icon className={`w-6 h-6 ${isClosed ? 'text-zinc-400' : styles.color}`} />
                        </div>
                        <h3 className={`text-lg font-bold mb-2 ${isClosed ? 'text-zinc-400' : 'text-white'}`}>{role.title}</h3>
                        <p className="text-sm text-zinc-400 mb-6 leading-relaxed">{role.desc}</p>
                        
                        {/* Requirements */}
                        <div className="flex flex-wrap gap-2 mt-auto">
                            {role.reqs.map(req => (
                                <span key={req} className="text-[10px] px-2 py-1 bg-zinc-900 border border-white/10 rounded-md text-zinc-400 font-mono">{req}</span>
                            ))}
                        </div>
                    </div>
                    
                    {isClosed && (
                        <div className="absolute inset-0 bg-zinc-950/20 z-10 flex items-center justify-center">
                             <Lock className="w-8 h-8 text-white/20" />
                        </div>
                    )}
                </Card>
            );
        })}

      </div>
    </section>
  );
};