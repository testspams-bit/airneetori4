import React, { useState, useEffect } from 'react';
import { X, ArrowRight, GraduationCap, ArrowLeft, BookOpenCheck, LoaderCircle } from 'lucide-react';
import { Logo } from './Logo.tsx';
import { supabase, type AccountRole, roleLabel } from '../lib/supabase.ts';

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
  const [step, setStep] = useState<'role' | 'auth'>('role');
  const [role, setRole] = useState<AccountRole>('student_mentee');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authMessage, setAuthMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      setStep('role');
      setRole('student_mentee');
      setAuthMode('login');
      setAuthMessage('');
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const checkRoleAndSave = async (user: { user_metadata?: Record<string, unknown> }) => {
    const savedRole = user.user_metadata?.air_neetwork_role;
    if (savedRole && savedRole !== role) {
      await supabase?.auth.signOut();
      setAuthMessage(`This account is registered as ${savedRole === 'mentor' ? 'a Mentor' : 'a Student Mentee'}. Choose that account type to continue.`);
      return false;
    }

    if (savedRole !== role) {
      const { error } = await supabase!.auth.updateUser({
        data: { air_neetwork_role: role },
      });
      if (error) {
        setAuthMessage(error.message);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthMessage('');
    if (!supabase) {
      setAuthMessage('Supabase is not configured yet. Add the project URL and publishable key to the app environment.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (authMode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { air_neetwork_role: role } },
        });
        if (error) throw error;

        if (data.session && data.user) {
          const roleSaved = await checkRoleAndSave(data.user);
          if (roleSaved) {
            setAuthMessage('Your account is ready. You are now signed in.');
            window.setTimeout(onClose, 900);
          }
        } else {
          setAuthMessage('Account created. Check your email to confirm it, then sign in.');
          setAuthMode('login');
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (data.user && await checkRoleAndSave(data.user)) {
          setAuthMessage('Signed in successfully.');
          window.setTimeout(onClose, 700);
        }
      }
    } catch (error) {
      setAuthMessage(error instanceof Error ? error.message : 'Could not authenticate. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setAuthMessage('');
    if (!supabase) {
      setAuthMessage('Supabase is not configured yet. Add the project URL and publishable key to the app environment.');
      return;
    }

    setIsSubmitting(true);
    localStorage.setItem('airneet-auth-role', role);
    const callbackUrl = new URL(window.location.href);
    callbackUrl.searchParams.set('authRole', role);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: callbackUrl.toString() },
    });
    if (error) {
      localStorage.removeItem('airneet-auth-role');
      setAuthMessage(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-xs rounded-2xl p-5 shadow-2xl relative border transition-all ${
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
        <div className="flex flex-col items-center text-center mb-4">
          <div>
            <Logo theme={theme} size="sm" showText={false} />
          </div>
          {step === 'role' && (
            <p className="mt-2 text-sm font-medium text-zinc-400">Choose your account type</p>
          )}
        </div>

        {step === 'role' ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              aria-pressed={role === 'student_mentee'}
              onClick={() => setRole('student_mentee')}
              className={`flex min-h-24 flex-col items-center justify-center gap-2 rounded-xl border p-3 text-center transition ${
                isDark
                  ? role === 'student_mentee' ? 'border-[#CCFF00]/50 bg-[#CCFF00]/5 text-white' : 'border-zinc-800 text-white hover:border-zinc-600'
                  : role === 'student_mentee' ? 'border-[#0066FF]/40 bg-[#0066FF]/5 text-slate-900' : 'border-slate-200 text-slate-900 hover:border-slate-400'
              }`}
            >
              <GraduationCap className={`h-7 w-7 ${isDark ? 'text-[#CCFF00]' : 'text-[#0066FF]'}`} />
              <span className="text-sm font-semibold">Student</span>
            </button>
            <button
              type="button"
              aria-pressed={role === 'mentor'}
              onClick={() => setRole('mentor')}
              className={`flex min-h-24 flex-col items-center justify-center gap-2 rounded-xl border p-3 text-center transition ${
                isDark
                  ? role === 'mentor' ? 'border-[#CCFF00]/50 bg-[#CCFF00]/5 text-white' : 'border-zinc-800 text-white hover:border-zinc-600'
                  : role === 'mentor' ? 'border-[#0066FF]/40 bg-[#0066FF]/5 text-slate-900' : 'border-slate-200 text-slate-900 hover:border-slate-400'
              }`}
            >
              <BookOpenCheck className={`h-7 w-7 ${isDark ? 'text-[#CCFF00]' : 'text-[#0066FF]'}`} />
              <span className="text-sm font-semibold">Mentor</span>
            </button>
            </div>
            <button
              type="button"
              onClick={() => { setStep('auth'); setAuthMessage(''); }}
              className={`w-full rounded-xl py-2.5 text-sm font-bold transition ${isDark ? 'bg-[#CCFF00] text-black hover:bg-[#d8ff33]' : 'bg-[#0066FF] text-white hover:bg-[#0052cc]'}`}
            >
              Continue <ArrowRight className="ml-1 inline h-4 w-4" />
            </button>
          </div>
        ) : (
          <div>
            <button
              type="button"
              onClick={() => { setStep('role'); setAuthMessage(''); }}
              className={`mb-4 flex items-center gap-1 text-xs ${isDark ? 'text-zinc-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </button>
            <div className={`mb-4 flex rounded-xl border p-1 text-xs font-semibold ${isDark ? 'border-zinc-800 bg-zinc-900 text-zinc-400' : 'border-slate-200 bg-slate-100 text-slate-600'}`}>
              {(['login', 'signup'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => { setAuthMode(mode); setAuthMessage(''); }}
                  className={`flex-1 rounded-lg py-2 transition ${authMode === mode ? isDark ? 'bg-black text-[#CCFF00]' : 'bg-white text-[#0066FF] shadow-sm' : ''}`}
                >
                  {mode === 'login' ? 'Log in' : 'Sign up'}
                </button>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-mono font-medium text-zinc-400">Email address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-sm transition-all focus:outline-none ${isDark ? 'bg-zinc-900/90 border-zinc-800 text-white focus:border-[#CCFF00]' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#0066FF]'}`}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-mono font-medium text-zinc-400">Password</label>
                <input
                  type="password"
                  placeholder={authMode === 'signup' ? 'Create a password' : 'Enter your password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  required
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-sm transition-all focus:outline-none ${isDark ? 'bg-zinc-900/90 border-zinc-800 text-white focus:border-[#CCFF00]' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#0066FF]'}`}
                />
              </div>
              <button type="submit" disabled={isSubmitting} className={`flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition disabled:opacity-60 ${isDark ? 'bg-[#CCFF00] text-black hover:bg-[#d8ff33]' : 'bg-[#0066FF] text-white hover:bg-[#0052cc]'}`}>
                {isSubmitting && <LoaderCircle className="h-4 w-4 animate-spin" />}
              {authMode === 'signup' ? 'Sign up' : 'Log in'}
              </button>
            </form>
            <div className="my-4 flex items-center gap-3 text-[11px] font-mono uppercase tracking-wider text-zinc-500">
              <span className="h-px flex-1 bg-zinc-700/60" />or<span className="h-px flex-1 bg-zinc-700/60" />
            </div>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isSubmitting}
              aria-label="Continue with Google"
              className={`flex w-full items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-semibold transition disabled:opacity-60 ${isDark ? 'border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800' : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50'}`}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
                <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h6.44a5.5 5.5 0 0 1-2.39 3.61v3h3.87c2.27-2.09 3.57-5.17 3.57-8.64Z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.96-1.08 7.95-2.92l-3.87-3c-1.08.72-2.46 1.15-4.08 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.1A12 12 0 0 0 12 24Z" />
                <path fill="#FBBC05" d="M5.27 14.27A7.2 7.2 0 0 1 4.9 12c0-.79.14-1.55.37-2.27v-3.1H1.27A12 12 0 0 0 0 12c0 1.93.46 3.76 1.27 5.37l4-3.1Z" />
                <path fill="#EA4335" d="M12 4.77c1.77 0 3.36.61 4.61 1.81l3.46-3.46C17.98 1.19 15.24 0 12 0A12 12 0 0 0 1.27 6.63l4 3.1c.95-2.85 3.6-4.96 6.73-4.96Z" />
              </svg>
              Continue with Google
            </button>
            {authMessage && <p role="status" className="mt-3 text-center text-xs text-amber-500">{authMessage}</p>}
          </div>
        )}

      </div>
    </div>
  );
};
