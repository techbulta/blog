import React from 'react';

// Inline stroke icons (2px stroke), taken from the reference designs.
function Icon({ size = 18, children, ...props }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

export const SearchIcon = (props) => (
  <Icon {...props}><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></Icon>
);

export const MenuIcon = (props) => (
  <Icon {...props}><path d="M4 6h16M4 12h16M4 18h16" /></Icon>
);

export const CloseIcon = (props) => (
  <Icon {...props}><path d="M6 6l12 12M18 6L6 18" /></Icon>
);

export const ArrowRightIcon = (props) => (
  <Icon {...props}><path d="M5 12h14M13 6l6 6-6 6" /></Icon>
);

export const PlayIcon = (props) => (
  <Icon {...props}><path d="M8 5v14l11-7z" /></Icon>
);

export const YouTubeIcon = (props) => (
  <Icon {...props}><rect x="2" y="5" width="20" height="14" rx="4" /><path d="M10 9v6l5-3z" /></Icon>
);

export const LinkIcon = (props) => (
  <Icon {...props}>
    <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
    <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
  </Icon>
);

export const LinkedInIcon = (props) => (
  <Icon {...props}><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" /></Icon>
);

export const ShareIcon = (props) => (
  <Icon {...props}><path d="M12 3v12M7 8l5-5 5 5M5 14v5h14v-5" /></Icon>
);

export const InfoIcon = (props) => (
  <Icon size={22} {...props}><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16v.01" /></Icon>
);

export const CheckIcon = (props) => (
  <Icon {...props}><path d="M5 12l5 5L20 7" /></Icon>
);
