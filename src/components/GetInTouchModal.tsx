import React, { useState, useEffect } from 'react';
import {
  X,
  Phone,
  MessageCircle,
  PhoneCall,
  Clock,
  User,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Send,
  ExternalLink,
} from 'lucide-react';

interface GetInTouchModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'dark' | 'light';
}

export const GetInTouchModal: React.FC<GetInTouchModalProps> = ({
  isOpen,
  onClose,
  theme,
}) => {
  const isDark = theme === 'dark';
  const [view, setView] = useState<'options' | 'callback-form' | 'success'>('options');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    category: 'NEET Aspirant (Class 12 / Dropper)',
    preferredTime: 'Evening (5:00 PM - 8:00 PM)',
    note: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      setView('options');
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmitCallback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setView('success');
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-md rounded-2xl p-6 sm:p-7 shadow-2xl relative border transition-all ${
          isDark
            ? 'bg-[#111114] border-zinc-800 text-white'
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

        {/* View 1: Main Options (WhatsApp, Mobile Number, Request Callback) */}
        {view === 'options' && (
          <div>
            <div className="mb-6 pr-6">
              <h3 className="text-xl font-bold tracking-tight mb-1">Get in Touch</h3>
              <p className="text-xs text-zinc-400 font-mono">
                Connect directly with the AIR NEETwork mentorship team
              </p>
            </div>

            <div className="space-y-3 mb-5">
              {/* Option 1: WhatsApp */}
              <a
                href="https://wa.me/919876543210?text=Hello%20AIR%20NEETwork,%20I%20would%20like%20to%20inquire%20about%20NEET%20mentorship."
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-between p-4 rounded-xl border transition-all group cursor-pointer ${
                  isDark
                    ? 'bg-zinc-900/70 border-zinc-800 hover:border-emerald-500 hover:bg-emerald-950/20'
                    : 'bg-slate-50 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-lg bg-emerald-500/15 text-emerald-400">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold flex items-center gap-1.5">
                      <span>WhatsApp Chat</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400">Fast Reply</span>
                    </div>
                    <div className="text-xs font-mono text-zinc-400 mt-0.5">
                      +91 98765 43210
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </a>

              {/* Option 2: Mobile Number Call */}
              <a
                href="tel:+919876543210"
                className={`flex items-center justify-between p-4 rounded-xl border transition-all group cursor-pointer ${
                  isDark
                    ? 'bg-zinc-900/70 border-zinc-800 hover:border-[#CCFF00] hover:bg-[#CCFF00]/5'
                    : 'bg-slate-50 border-slate-200 hover:border-[#0066FF] hover:bg-[#0066FF]/5'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`p-2.5 rounded-lg ${isDark ? 'bg-[#CCFF00]/15 text-[#CCFF00]' : 'bg-[#0066FF]/10 text-[#0066FF]'}`}>
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold">Call Directly</div>
                    <div className="text-xs font-mono text-zinc-400 mt-0.5">
                      +91 98765 43210
                    </div>
                  </div>
                </div>
                <span className={`text-xs font-mono font-semibold underline ${isDark ? 'text-[#CCFF00]' : 'text-[#0066FF]'}`}>
                  Dial Now
                </span>
              </a>
            </div>

            {/* Extra Button: Request a Callback */}
            <div className="pt-2 border-t border-zinc-800/60">
              <button
                type="button"
                onClick={() => setView('callback-form')}
                className={`w-full py-3 px-4 rounded-xl text-xs font-bold font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                  isDark
                    ? 'bg-[#CCFF00] text-black hover:bg-[#d8ff33] active:scale-98'
                    : 'bg-[#0066FF] text-white hover:bg-[#0052cc] active:scale-98'
                }`}
              >
                <PhoneCall className="w-4 h-4" />
                <span>Request a Callback</span>
              </button>
            </div>
          </div>
        )}

        {/* View 2: Request a Callback Form */}
        {view === 'callback-form' && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <button
                type="button"
                onClick={() => setView('options')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  isDark ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title="Back to options"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h3 className="text-lg font-bold">Request a Callback</h3>
                <p className="text-xs text-zinc-400 font-mono">Our mentor advisor will call you</p>
              </div>
            </div>

            <form onSubmit={handleSubmitCallback} className="space-y-3.5">
              <div>
                <label className="block text-xs font-mono font-medium text-zinc-400 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-mono border focus:outline-none ${
                    isDark
                      ? 'bg-zinc-900/90 border-zinc-800 text-white focus:border-[#CCFF00]'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#0066FF]'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-zinc-400 mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-mono border focus:outline-none ${
                    isDark
                      ? 'bg-zinc-900/90 border-zinc-800 text-white focus:border-[#CCFF00]'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#0066FF]'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-medium text-zinc-400 mb-1">
                    Student Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className={`w-full px-2.5 py-2 rounded-xl text-xs font-mono border focus:outline-none ${
                      isDark
                        ? 'bg-zinc-900 border-zinc-800 text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <option>NEET Class 11</option>
                    <option>NEET Class 12</option>
                    <option>Dropper / Repeater</option>
                    <option>Parent Inquiry</option>
                    <option>MBBS Abroad Guidance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-zinc-400 mb-1">
                    Preferred Time
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className={`w-full px-2.5 py-2 rounded-xl text-xs font-mono border focus:outline-none ${
                      isDark
                        ? 'bg-zinc-900 border-zinc-800 text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <option>Morning (10:00 AM - 1:00 PM)</option>
                    <option>Afternoon (2:00 PM - 5:00 PM)</option>
                    <option>Evening (5:00 PM - 8:00 PM)</option>
                    <option>Anytime</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-zinc-400 mb-1">
                  Optional Note / Query
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell us about your current score or questions..."
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-mono border focus:outline-none resize-none ${
                    isDark
                      ? 'bg-zinc-900/90 border-zinc-800 text-white focus:border-[#CCFF00]'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#0066FF]'
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2.5 rounded-xl text-xs font-bold font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer mt-3 ${
                  isDark
                    ? 'bg-[#CCFF00] text-black hover:bg-[#d8ff33]'
                    : 'bg-[#0066FF] text-white hover:bg-[#0052cc]'
                }`}
              >
                {isSubmitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Callback Request</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* View 3: Success Confirmation */}
        {view === 'success' && (
          <div className="py-6 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-1">Callback Request Received!</h3>
            <p className="text-xs text-zinc-400 max-w-xs mx-auto mb-6">
              Thank you, <strong className="text-white">{formData.name}</strong>. Our academic team will call you on <strong className="text-white">{formData.phone}</strong> during <span className="text-emerald-400">{formData.preferredTime}</span>.
            </p>
            <button
              type="button"
              onClick={onClose}
              className={`px-6 py-2 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition cursor-pointer ${
                isDark ? 'bg-zinc-800 text-white hover:bg-zinc-700' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
              }`}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
