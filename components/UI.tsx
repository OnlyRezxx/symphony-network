import React, { InputHTMLAttributes, TextareaHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';

// --- Card Component (Glass Panel) ---
export const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-xl ${className}`}>
    {children}
  </div>
);

// --- Input Component (Seamless) ---
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = ({ label, className = "", ...props }: InputProps) => (
  <div className="flex flex-col gap-2 w-full group">
    {label && <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest group-focus-within:text-white transition-colors">{label}</label>}
    <input
      className={`bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-4 text-sm text-zinc-100 placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all duration-300 ${className}`}
      {...props}
    />
  </div>
);

// --- Textarea Component (Seamless) ---
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const Textarea = ({ label, className = "", ...props }: TextareaProps) => (
  <div className="flex flex-col gap-2 w-full group">
    {label && <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest group-focus-within:text-white transition-colors">{label}</label>}
    <textarea
      className={`bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-4 text-sm text-zinc-100 placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all duration-300 min-h-[140px] resize-y ${className}`}
      {...props}
    />
  </div>
);

// --- Button Component (Glow) ---
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  isLoading?: boolean;
}

export const Button = ({ children, variant = 'primary', isLoading, className = "", ...props }: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-white text-black hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:-translate-y-0.5",
    secondary: "bg-zinc-900 text-white hover:bg-zinc-800 border border-zinc-800",
    ghost: "bg-transparent text-zinc-400 hover:text-white hover:bg-white/5",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} h-12 px-8 ${className}`} 
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
      {children}
    </button>
  );
};

// --- Badge ---
export const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono font-medium bg-white/5 text-zinc-300 border border-white/10 tracking-wider uppercase">
    {children}
  </span>
);