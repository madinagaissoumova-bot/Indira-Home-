type PublicIconProps = {
  className?: string;
};

export function PhoneIcon({ className }: PublicIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      viewBox="0 0 24 24"
    >
      <path
        d="M7.3 5.2c.3-.3.7-.4 1.1-.3l2.1.6c.5.1.8.5.9 1l.4 2c.1.4 0 .8-.3 1.1l-.9.9c.8 1.5 2 2.7 3.5 3.5l.9-.9c.3-.3.7-.4 1.1-.3l2 .4c.5.1.9.5 1 .9l.6 2.1c.1.4 0 .8-.3 1.1l-1.2 1.2c-.6.6-1.4.8-2.2.6-5.4-1.2-9.6-5.4-10.8-10.8-.2-.8 0-1.6.6-2.2l1.5-1.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.55"
      />
    </svg>
  );
}

export function CartIcon({ className }: PublicIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      viewBox="0 0 24 24"
    >
      <path
        d="M7.2 8.4h11.6l-1 8.2a1.8 1.8 0 0 1-1.8 1.6H10a1.8 1.8 0 0 1-1.8-1.6l-1-8.2Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.55"
      />
      <path
        d="M9.4 8.4V7a3 3 0 0 1 6 0v1.4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.55"
      />
      <path
        d="M8.4 12h10.2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.55"
      />
    </svg>
  );
}

export function HeartIcon({ className }: PublicIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 19.1s-6.8-4.2-8.5-8.2c-1-2.4.2-5 2.7-5.6 1.7-.4 3.2.3 4.1 1.6L12 9.1l1.7-2.2c.9-1.3 2.4-2 4.1-1.6 2.5.6 3.7 3.2 2.7 5.6-1.7 4-8.5 8.2-8.5 8.2Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.55"
      />
    </svg>
  );
}

export function DeliveryIcon({ className }: PublicIconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" focusable="false" viewBox="0 0 24 24">
      <path d="M4 8.4h9.6v7.2H4z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.45" />
      <path d="M13.6 10.2h3.1l2.1 2.5v2.9h-5.2z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.45" />
      <path d="M7.2 18a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8ZM16.8 18a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8Z" stroke="currentColor" strokeWidth="1.45" />
      <path d="M4 11.2h5.2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.45" />
    </svg>
  );
}

export function PaymentIcon({ className }: PublicIconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" focusable="false" viewBox="0 0 24 24">
      <rect height="12" rx="2" stroke="currentColor" strokeWidth="1.45" width="16" x="4" y="6" />
      <path d="M4 10h16M7.2 14.6h3.6" stroke="currentColor" strokeLinecap="round" strokeWidth="1.45" />
    </svg>
  );
}

export function QualityIcon({ className }: PublicIconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" focusable="false" viewBox="0 0 24 24">
      <path d="M12 4.8 15 9l4.8 1.5-3 4.1.1 5-4.9-1.6-4.9 1.6.1-5-3-4.1L9 9z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.45" />
      <path d="m9.4 12.4 1.7 1.7 3.6-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45" />
    </svg>
  );
}

export function SupportIcon({ className }: PublicIconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" focusable="false" viewBox="0 0 24 24">
      <path d="M5.2 13.5v-1.8a6.8 6.8 0 0 1 13.6 0v1.8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.45" />
      <path d="M7 12.2H5.8c-.9 0-1.6.7-1.6 1.6v1.4c0 .9.7 1.6 1.6 1.6H7zM17 12.2h1.2c.9 0 1.6.7 1.6 1.6v1.4c0 .9-.7 1.6-1.6 1.6H17z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.45" />
      <path d="M14.2 19h1.3c1.9 0 3.3-1.1 3.3-2.8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.45" />
    </svg>
  );
}
