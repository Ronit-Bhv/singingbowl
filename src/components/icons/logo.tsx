import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>Resonant Harmony Logo</title>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Z" />
      <path d="M12 12v0" />
      <path d="M15 15.5c-1.5-1-3-1.5-4.5-1.5" />
      <path d="M9 15.5c1.5-1 3-1.5 4.5-1.5" />
    </svg>
  );
}
