interface SupportAgentIconProps {
  theme: 'dark' | 'light';
}

export const SupportAgentIcon = ({ theme }: SupportAgentIconProps) => (
  <div
    className={`support-agent support-agent--${theme}`}
    role="img"
    aria-label="Customer support representative wearing a headset"
  >
    <span className="support-agent__grain" aria-hidden="true" />
    <svg
      className="support-agent__portrait"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8.5 24v-4a15.5 15.5 0 0 1 31 0v4"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle cx="24" cy="20.5" r="6.5" fill="currentColor" />
      <path
        d="M12.5 39c1-6.2 5-9.3 11.5-9.3s10.5 3.1 11.5 9.3"
        fill="currentColor"
      />
      <rect x="6.5" y="21" width="6" height="12" rx="3" fill="currentColor" />
      <rect x="35.5" y="21" width="6" height="12" rx="3" fill="currentColor" />
      <path
        d="M38.5 31.5v1.2a5.3 5.3 0 0 1-5.3 5.3h-2.4"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="29.5" cy="38" r="1.4" fill="currentColor" />
    </svg>
  </div>
);
