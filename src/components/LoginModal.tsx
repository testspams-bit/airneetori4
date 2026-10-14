import React, { useState, useEffect } from 'react';
import { X, Lock, Mail, Smartphone, ArrowRight, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo.tsx';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'dark' | 'light';
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  theme,
}) => {
  const isDark = theme === 'dark';
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
  const [identifier, setIdentifier] = useState('');
  const [passwordOrOtp, setPasswordOrOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsLoggedIn(true);
      setTimeout(() => {
        setIsLoggedIn(false);
        onClose();
      }, 1200);
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-md rounded-2xl p-6 sm:p-8 shadow-2xl relative border transition-all ${
          isDark
            ? 'bg-[#121215] border-zinc-800 text-white'
            : 'bg-white border-slate-200 text-slate-900 shadow-xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-1.5 rounded-lg transition-colors cursor-pointer ${
            isDark
              ? 'text-zinc-500 hover:text-white hover:bg-zinc-800'
              : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'
          }`}
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="mb-3">
            <Logo theme={theme} size="sm" showText={false} />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Student &amp; Mentor Login</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Access your 1-on-1 mentorship dashboard and schedule
          </p>
        </div>

        {/* Tab switch */}
        <div
          className={`flex p-1 rounded-xl mb-6 border text-xs font-mono font-semibold ${
            isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-400' : 'bg-slate-100 border-slate-200 text-slate-600'
          }`}
        >
          <button
            type="button"
            onClick={() => setLoginMethod('phone')}
            className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
              loginMethod === 'phone'
                ? isDark
                  ? 'bg-black text-[#CCFF00] shadow-xs'
                  : 'bg-white text-[#0066FF] shadow-xs'
                : ''
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile OTP</span>
          </button>
          <button
            type="button"
            onClick={() => setLoginMethod('email')}
            className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
              loginMethod === 'email'
                ? isDark
                  ? 'bg-black text-[#CCFF00] shadow-xs'
                  : 'bg-white text-[#0066FF] shadow-xs'
                : ''
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email &amp; Password</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-medium text-zinc-400 mb-1.5">
              {loginMethod === 'phone' ? 'Phone Number' : 'Email Address'}
            </label>
            <input
              type={loginMethod === 'phone' ? 'tel' : 'email'}
              placeholder={loginMethod === 'phone' ? '+91 98765 43210' : 'aspirant@example.com'}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-mono border transition-all focus:outline-none ${
                isDark
                  ? 'bg-zinc-900/90 border-zinc-800 text-white focus:border-[#CCFF00]'
                  : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#0066FF]'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-medium text-zinc-400 mb-1.5">
              {loginMethod === 'phone' ? 'One Time Password (OTP)' : 'Password'}
            </label>
            <input
              type={loginMethod === 'phone' ? 'text' : 'password'}
              placeholder={loginMethod === 'phone' ? 'Enter 6-digit OTP' : '••••••••'}
              value={passwordOrOtp}
              onChange={(e) => setPasswordOrOtp(e.target.value)}
              required
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-mono border transition-all focus:outline-none ${
                isDark
                  ? 'bg-zinc-900/90 border-zinc-800 text-white focus:border-[#CCFF00]'
                  : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#0066FF]'
              }`}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider font-mono flex items-center justify-center gap-2 transition cursor-pointer mt-2 ${
              isLoggedIn
                ? 'bg-emerald-500 text-white'
                : isDark
                ? 'bg-[#CCFF00] text-black hover:bg-[#d8ff33] active:scale-98'
                : 'bg-[#0066FF] text-white hover:bg-[#0052cc] active:scale-98'
            }`}
          >
            {isLoggedIn ? (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Logged In Successfully</span>
              </>
            ) : isSubmitting ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Continue to Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-5 text-center text-[11px] font-mono text-zinc-500">
          Trouble logging in? Contact{' '}
          <a href="mailto:csebks@gmail.com" className="underline hover:text-zinc-300">
            csebks@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
};
