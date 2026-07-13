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
