import { useState } from 'react';
import { Bot, Mail, MessageCircle, Phone, X } from 'lucide-react';

interface SupportAgentIconProps {
  theme: 'dark' | 'light';
  onOpenAIChat: () => void;
}

export const SupportAgentIcon = ({ theme, onOpenAIChat }: SupportAgentIconProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isDark = theme === 'dark';

  return (
    <>
      {isOpen && (
        <div
          role="toolbar"
          aria-label="Contact options"
          className={`support-tools fixed right-6 bottom-[5.5rem] z-50 flex min-w-52 flex-col gap-1 rounded-2xl border p-2 shadow-2xl ${
            isDark
              ? 'border-zinc-700 bg-[#111114] text-white'
              : 'border-slate-200 bg-white text-slate-900'
          }`}
        >
          <button
            type="button"
            onClick={() => { setIsOpen(false); onOpenAIChat(); }}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${isDark ? 'hover:bg-zinc-800' : 'hover:bg-slate-100'}`}
          >
            <Bot className={`h-4 w-4 ${isDark ? 'text-[#CCFF00]' : 'text-[#0066FF]'}`} />
            Chat with AI
          </button>
          <a
            href="https://wa.me/919876543210?text=Hello%20AIR%20NEETwork,%20I%20would%20like%20to%20inquire%20about%20NEET%20mentorship."
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${isDark ? 'hover:bg-zinc-800' : 'hover:bg-slate-100'}`}
          >
            <MessageCircle className="h-4 w-4 text-[#25D366]" /> WhatsApp
          </a>
          <a
            href="mailto:csebks@gmail.com"
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${isDark ? 'hover:bg-zinc-800' : 'hover:bg-slate-100'}`}
          >
            <Mail className={`h-4 w-4 ${isDark ? 'text-[#CCFF00]' : 'text-[#0066FF]'}`} /> Email
          </a>
          <a
            href="tel:+919876543210"
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${isDark ? 'hover:bg-zinc-800' : 'hover:bg-slate-100'}`}
          >
            <Phone className={`h-4 w-4 ${isDark ? 'text-[#CCFF00]' : 'text-[#0066FF]'}`} /> Call
          </a>
        </div>
      )}

      <button
        type="button"
        className={`support-agent support-agent--${theme} cursor-pointer transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${isDark ? 'focus-visible:outline-[#CCFF00]' : 'focus-visible:outline-[#0066FF]'}`}
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? 'Close contact options' : 'Open contact options'}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="support-agent__grain" aria-hidden="true" />
        {isOpen ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <svg className="support-agent__portrait" viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <path d="M8.5 24v-4a15.5 15.5 0 0 1 31 0v4" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
            <circle cx="24" cy="20.5" r="6.5" fill="currentColor" />
            <path d="M12.5 39c1-6.2 5-9.3 11.5-9.3s10.5 3.1 11.5 9.3" fill="currentColor" />
            <rect x="6.5" y="21" width="6" height="12" rx="3" fill="currentColor" />
            <rect x="35.5" y="21" width="6" height="12" rx="3" fill="currentColor" />
            <path d="M38.5 31.5v1.2a5.3 5.3 0 0 1-5.3 5.3h-2.4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="29.5" cy="38" r="1.4" fill="currentColor" />
          </svg>
        )}
      </button>
    </>
  );
};
