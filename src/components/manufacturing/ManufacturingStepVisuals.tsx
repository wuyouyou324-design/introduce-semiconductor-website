import type { ReactNode } from 'react';

export type ManufacturingStepId =
  | 'purification'
  | 'slicing'
  | 'deposition'
  | 'photolithography'
  | 'implantation'
  | 'packaging';

interface StepVisualProps {
  className?: string;
}

function SvgFrame({ children, className = '' }: StepVisualProps & { children: ReactNode }) {
  return (
    <svg className={className} viewBox="0 0 300 160" width="100%" height="100%" aria-hidden="true">
      {children}
    </svg>
  );
}

export function PurificationVisual() {
  return (
    <SvgFrame>
      <defs>
        <linearGradient id="molten" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--mfg-amber)" />
          <stop offset="100%" stopColor="var(--mfg-red)" />
        </linearGradient>
        <linearGradient id="crystal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--mfg-blue-light)" />
          <stop offset="50%" stopColor="var(--mfg-blue-pale)" />
          <stop offset="100%" stopColor="var(--mfg-blue)" />
        </linearGradient>
      </defs>
      <path d="M 80 110 L 100 140 L 200 140 L 220 110 Z" fill="var(--mfg-slate)" stroke="var(--mfg-slate-light)" strokeWidth="2" />
      <path d="M 90 120 L 105 138 L 195 138 L 210 120 Z" fill="url(#molten)" />
      <line x1="150" y1="10" x2="150" y2="60" stroke="var(--mfg-muted)" strokeWidth="4" strokeDasharray="4 2" />
      <polygon points="140,50 160,50 175,110 125,110" fill="url(#crystal)" opacity="0.9" />
      <circle cx="150" cy="115" r="35" fill="none" stroke="var(--mfg-amber)" strokeWidth="1.5" opacity="0.6">
        <animate attributeName="r" values="30;45;30" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0.1;0.8" dur="3s" repeatCount="indefinite" />
      </circle>
    </SvgFrame>
  );
}

export function SlicingVisual() {
  return (
    <SvgFrame>
      <defs>
        <linearGradient id="waferGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--mfg-blue)" />
          <stop offset="50%" stopColor="var(--mfg-brand)" />
          <stop offset="100%" stopColor="var(--mfg-blue-deep)" />
        </linearGradient>
      </defs>
      <rect x="50" y="50" width="90" height="70" rx="6" fill="var(--mfg-slate-mid)" stroke="var(--mfg-muted)" strokeWidth="2" />
      <circle cx="170" cy="85" r="45" fill="none" stroke="var(--mfg-cyan)" strokeWidth="4" strokeDasharray="8 4">
        <animateTransform attributeName="transform" type="rotate" from="0 170 85" to="360 170 85" dur="2s" repeatCount="indefinite" />
      </circle>
      <ellipse cx="230" cy="85" rx="12" ry="40" fill="url(#waferGrad)" stroke="var(--mfg-blue-light)" strokeWidth="2">
        <animate attributeName="cx" values="180;230" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1" dur="1.5s" repeatCount="indefinite" />
      </ellipse>
      <path d="M 230 60 L 234 70 L 244 74 L 234 78 L 230 88 L 226 78 L 216 74 L 226 70 Z" fill="var(--mfg-yellow)">
        <animate attributeName="opacity" values="0.2;1;0.2" dur="1s" repeatCount="indefinite" />
      </path>
    </SvgFrame>
  );
}

export function DepositionVisual() {
  return (
    <SvgFrame>
      <rect x="60" y="110" width="180" height="25" rx="4" fill="var(--mfg-brand)" />
      <rect x="60" y="95" width="180" height="15" fill="var(--mfg-cyan)">
        <animate attributeName="y" values="120;95" dur="0.8s" fill="freeze" />
        <animate attributeName="height" values="0;15" dur="0.8s" fill="freeze" />
      </rect>
      <rect x="60" y="75" width="180" height="20" fill="var(--mfg-pink)">
        <animate attributeName="y" values="110;75" begin="0.8s" dur="0.8s" fill="freeze" />
        <animate attributeName="height" values="0;20" begin="0.8s" dur="0.8s" fill="freeze" />
      </rect>
      <path d="M 140 20 L 160 20 L 155 55 L 145 55 Z" fill="var(--mfg-muted)" />
      <circle cx="150" cy="60" r="4" fill="var(--mfg-rose)">
        <animate attributeName="cy" values="60;75;60" dur="1.2s" repeatCount="indefinite" />
      </circle>
    </SvgFrame>
  );
}

export function PhotolithographyVisual() {
  return (
    <SvgFrame>
      <rect x="50" y="110" width="200" height="20" fill="var(--mfg-slate)" rx="2" />
      <rect x="50" y="95" width="200" height="15" fill="var(--mfg-pink)" />
      <rect x="70" y="55" width="160" height="12" fill="var(--mfg-slate-light)" stroke="var(--mfg-border-light)" strokeWidth="1" />
      <rect x="100" y="55" width="15" height="12" fill="var(--mfg-dark)" />
      <rect x="140" y="55" width="25" height="12" fill="var(--mfg-dark)" />
      <rect x="190" y="55" width="20" height="12" fill="var(--mfg-dark)" />
      <polygon points="80,15 220,15 200,55 100,55" fill="var(--mfg-cyan)" opacity="0.4">
        <animate attributeName="opacity" values="0.2;0.7;0.2" dur="1.5s" repeatCount="indefinite" />
      </polygon>
      <polygon points="105,55 115,55 110,95 100,95" fill="var(--mfg-yellow)" opacity="0.8" />
      <polygon points="145,55 160,55 155,95 140,95" fill="var(--mfg-yellow)" opacity="0.8" />
    </SvgFrame>
  );
}

export function ImplantationVisual() {
  return (
    <SvgFrame>
      <rect x="50" y="100" width="200" height="35" rx="4" fill="var(--mfg-dark-surface)" stroke="var(--mfg-brand)" strokeWidth="2" />
      <g stroke="var(--mfg-cyan)" strokeWidth="2" strokeDasharray="4 4">
        <line x1="90" y1="30" x2="100" y2="100"><animate attributeName="y1" values="20;90" dur="0.8s" repeatCount="indefinite" /><animate attributeName="y2" values="30;100" dur="0.8s" repeatCount="indefinite" /></line>
        <line x1="150" y1="30" x2="150" y2="100"><animate attributeName="y1" values="20;90" dur="0.8s" begin="0.3s" repeatCount="indefinite" /><animate attributeName="y2" values="30;100" dur="0.8s" begin="0.3s" repeatCount="indefinite" /></line>
        <line x1="210" y1="30" x2="200" y2="100"><animate attributeName="y1" values="20;90" dur="0.8s" begin="0.6s" repeatCount="indefinite" /><animate attributeName="y2" values="30;100" dur="0.8s" begin="0.6s" repeatCount="indefinite" /></line>
      </g>
      <path d="M 80 100 L 80 80 L 150 80 L 150 100" fill="none" stroke="var(--mfg-gold)" strokeWidth="3" />
      <path d="M 150 100 L 150 75 L 220 75 L 220 100" fill="none" stroke="var(--mfg-gold)" strokeWidth="3" />
    </SvgFrame>
  );
}

export function PackagingVisual() {
  return (
    <SvgFrame>
      <rect x="80" y="40" width="140" height="80" rx="4" fill="var(--mfg-brand)" stroke="var(--mfg-blue-light)" strokeWidth="2" />
      <line x1="150" y1="40" x2="150" y2="120" stroke="var(--mfg-dark-surface)" strokeWidth="3" strokeDasharray="6 2" />
      <line x1="80" y1="80" x2="220" y2="80" stroke="var(--mfg-dark-surface)" strokeWidth="3" strokeDasharray="6 2" />
      <circle cx="235" cy="50" r="16" fill="var(--mfg-success)" />
      <path d="M 227 50 L 232 55 L 243 43" fill="none" stroke="var(--mfg-white)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <polygon points="120,15 125,15 122.5,45" fill="var(--mfg-yellow)">
        <animate attributeName="transform" type="translate" values="0,0; 0,10; 0,0" dur="1.2s" repeatCount="indefinite" />
      </polygon>
    </SvgFrame>
  );
}
