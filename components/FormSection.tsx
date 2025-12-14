import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles, AlertCircle, Lock } from 'lucide-react';
import { Button, Input, Textarea, Card } from './UI';
import { TerminalView } from './Terminal';
import { API_BASE_URL } from '../App';

interface FormSectionProps {
  lang: 'en' | 'id';
  isOpen: boolean; // Received from App parent
}

export const FormSection = ({ lang, isOpen }: FormSectionProps) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    ign: '',
    discord: '',
    age: '',
    timezone: '',
    role: '',
    experience: '',
    reason: ''
  });

  const t = {
    title: lang === 'en' ? 'Start Application' : 'Mulai Pendaftaran',
    subtitle: lang === 'en' ? 'Fill out the details below. Honesty is key.' : 'Isi detail di bawah ini. Kejujuran adalah kunci.',
    ign: lang === 'en' ? 'In-Game Name (IGN)' : 'Nama Minecraft (IGN)',
    discord: lang === 'en' ? 'Discord Username' : 'Username Discord',
    age: lang === 'en' ? 'Age' : 'Umur',
    timezone: lang === 'en' ? 'Timezone' : 'Zona Waktu',
    role: lang === 'en' ? 'Applying For' : 'Melamar Sebagai',
    exp: lang === 'en' ? 'Previous Experience' : 'Pengalaman Sebelumnya',
    reason: lang === 'en' ? 'Why Symphony?' : 'Kenapa Symphony?',
    submit: lang === 'en' ? 'Submit Application' : 'Kirim Lamaran',
    successTitle: lang === 'en' ? 'Application Queued' : 'Lamaran Terkirim',
    successDesc: lang === 'en' ? 'Your application has been logged. Join our Discord and wait for a ticket ping.' : 'Lamaran Anda telah dicatat. Bergabunglah dengan Discord kami dan tunggu info selanjutnya.',
    submitAnother: lang === 'en' ? 'Submit Another' : 'Kirim Lainnya',
    error: lang === 'en' ? 'Submission Failed' : 'Gagal Mengirim',
    tryAgain: lang === 'en' ? 'Try Again' : 'Coba Lagi',
    closedTitle: lang === 'en' ? 'Applications Closed' : 'Pendaftaran Ditutup',
    closedDesc: lang === 'en' ? 'We are not accepting new staff applications at this time. Please check back later.' : 'Kami tidak menerima pendaftaran staff baru saat ini. Silakan cek kembali nanti.'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOpen) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      // Use dynamic URL
      const response = await fetch(`${API_BASE_URL}/api/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      setStatus('success');
      setFormData({
        ign: '',
        discord: '',
        age: '',
        timezone: '',
        role: '',
        experience: '',
        reason: ''
      });
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (!isOpen) {
    return (
        <Card className="w-full py-16 p-8 text-center bg-zinc-900/40 border-red-500/10">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                <Lock className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{t.closedTitle}</h3>
            <p className="text-zinc-400 max-w-md mx-auto">{t.closedDesc}</p>
        </Card>
    );
  }

  if (status === 'success') {
    return (
      <Card className="w-full py-12 animate-fade-in p-8 text-center bg-zinc-900/60">
        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
            <Check className="w-6 h-6 text-green-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{t.successTitle}</h3>
        <p className="text-zinc-500 mb-8 max-w-sm mx-auto">
            {t.successDesc}
        </p>
        <TerminalView />
        <Button variant="secondary" className="mt-8" onClick={() => setStatus('idle')}>{t.submitAnother}</Button>
      </Card>
    );
  }

  return (
    <Card className="p-8 md:p-10 w-full relative overflow-hidden">
      {/* Glow Effect inside card */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="mb-8 relative z-10">
        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            {t.title}
        </h3>
        <p className="text-zinc-500 text-sm">{t.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input 
            label={t.ign}
            name="ign"
            placeholder="e.g. Steve" 
            required 
            value={formData.ign}
            onChange={handleChange}
          />
          <Input 
            label={t.discord}
            name="discord"
            placeholder="username#0000" 
            required 
            value={formData.discord}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input 
            label={t.age} 
            name="age"
            type="number"
            placeholder="16" 
            required
            value={formData.age}
            onChange={handleChange}
          />
          <Input 
            label={t.timezone} 
            name="timezone"
            placeholder="EST / WIB" 
            required
            value={formData.timezone}
            onChange={handleChange}
          />
           <Input 
            label={t.role} 
            name="role"
            placeholder="Helper, Builder..." 
            required
            value={formData.role}
            onChange={handleChange}
          />
        </div>

        <Textarea 
          label={t.exp} 
          name="experience"
          placeholder="..." 
          required
          value={formData.experience}
          onChange={handleChange}
        />

        <Textarea 
          label={t.reason} 
          name="reason"
          placeholder="..." 
          required 
          value={formData.reason}
          onChange={handleChange}
        />

        {status === 'error' && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg flex items-center gap-2 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{t.error}: {errorMessage}</span>
          </div>
        )}

        <div className="pt-4">
          <Button 
            type="submit" 
            variant="primary" 
            className="w-full group"
            isLoading={status === 'loading'}
          >
            <span>{status === 'error' ? t.tryAgain : t.submit}</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-center text-[10px] uppercase tracking-widest text-zinc-600 mt-6">
            Protected by Anti-Bot Verification
          </p>
        </div>

      </form>
    </Card>
  );
};