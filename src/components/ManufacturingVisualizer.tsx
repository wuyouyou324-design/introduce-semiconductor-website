import { translations } from '../data/translations';

interface ManufacturingVisualizerProps {
  stepIndex: number;
  language: 'zh' | 'en';
}

export function ManufacturingVisualizer({ stepIndex, language }: ManufacturingVisualizerProps) {
  const t = translations[language];

  return (
    <div className="mfg-visualizer" style={{
      background: 'var(--hero-bg)',
      borderRadius: '16px',
      padding: '32px',
      color: 'var(--hero-text)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
      marginTop: '24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '280px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: '16px',
        left: '24px',
        fontSize: '0.85rem',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: '#38bdf8',
        fontWeight: 700
      }}>
        {t.processSimulation}
      </div>

      <div style={{ width: '100%', maxWidth: '420px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '16px' }}>
        {stepIndex === 0 && (
          /* Step 0: Purification & Crystal Growth */
          <svg viewBox="0 0 300 160" width="100%" height="100%">
            <defs>
              <linearGradient id="molten" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#dc2626" />
              </linearGradient>
              <linearGradient id="crystal" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#93c5fd" />
                <stop offset="50%" stopColor="#bfdbfe" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
            </defs>
            {/* Crucible */}
            <path d="M 80 110 L 100 140 L 200 140 L 220 110 Z" fill="#334155" stroke="#64748b" strokeWidth="2" />
            {/* Molten silicon */}
            <path d="M 90 120 L 105 138 L 195 138 L 210 120 Z" fill="url(#molten)" />
            {/* Pulling rod */}
            <line x1="150" y1="10" x2="150" y2="60" stroke="#94a3b8" strokeWidth="4" strokeDasharray="4 2" />
            {/* Growing crystal ingot */}
            <polygon points="140,50 160,50 175,110 125,110" fill="url(#crystal)" opacity="0.9" />
            {/* Glow / Heat waves */}
            <circle cx="150" cy="115" r="35" fill="none" stroke="#f59e0b" strokeWidth="1.5" opacity="0.6">
              <animate attributeName="r" values="30;45;30" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0.1;0.8" dur="3s" repeatCount="indefinite" />
            </circle>
          </svg>
        )}

        {stepIndex === 1 && (
          /* Step 1: Slicing & Polishing */
          <svg viewBox="0 0 300 160" width="100%" height="100%">
            <defs>
              <linearGradient id="waferGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>
            {/* Ingot block */}
            <rect x="50" y="50" width="90" height="70" rx="6" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
            {/* Slicing Blade */}
            <circle cx="170" cy="85" r="45" fill="none" stroke="#38bdf8" strokeWidth="4" strokeDasharray="8 4">
              <animateTransform attributeName="transform" type="rotate" from="0 170 85" to="360 170 85" dur="2s" repeatCount="indefinite" />
            </circle>
            {/* Cut Wafer */}
            <ellipse cx="230" cy="85" rx="12" ry="40" fill="url(#waferGrad)" stroke="#93c5fd" strokeWidth="2">
              <animate attributeName="cx" values="180;230" dur="1.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;1" dur="1.5s" repeatCount="indefinite" />
            </ellipse>
            {/* Sparkle */}
            <path d="M 230 60 L 234 70 L 244 74 L 234 78 L 230 88 L 226 78 L 216 74 L 226 70 Z" fill="#facc15">
              <animate attributeName="opacity" values="0.2;1;0.2" dur="1s" repeatCount="indefinite" />
            </path>
          </svg>
        )}

        {stepIndex === 2 && (
          /* Step 2: Deposition & Photoresist */
          <svg viewBox="0 0 300 160" width="100%" height="100%">
            {/* Substrate base */}
            <rect x="60" y="110" width="180" height="25" rx="4" fill="#3b82f6" />
            {/* Oxide layer */}
            <rect x="60" y="95" width="180" height="15" fill="#0ea5e9">
              <animate attributeName="y" values="120;95" dur="0.8s" fill="freeze" />
              <animate attributeName="height" values="0;15" dur="0.8s" fill="freeze" />
            </rect>
            {/* Photoresist layer */}
            <rect x="60" y="75" width="180" height="20" fill="#ec4899">
              <animate attributeName="y" values="110;75" begin="0.8s" dur="0.8s" fill="freeze" />
              <animate attributeName="height" values="0;20" begin="0.8s" dur="0.8s" fill="freeze" />
            </rect>
            {/* Nozzle applicator */}
            <path d="M 140 20 L 160 20 L 155 55 L 145 55 Z" fill="#94a3b8" />
            <circle cx="150" cy="60" r="4" fill="#f43f5e">
              <animate attributeName="cy" values="60;75;60" dur="1.2s" repeatCount="indefinite" />
            </circle>
          </svg>
        )}

        {stepIndex === 3 && (
          /* Step 3: Photolithography & Etching */
          <svg viewBox="0 0 300 160" width="100%" height="100%">
            {/* Substrate stack */}
            <rect x="50" y="110" width="200" height="20" fill="#334155" rx="2" />
            <rect x="50" y="95" width="200" height="15" fill="#ec4899" />
            {/* Photomask */}
            <rect x="70" y="55" width="160" height="12" fill="#64748b" stroke="#cbd5e1" strokeWidth="1" />
            <rect x="100" y="55" width="15" height="12" fill="#0f172a" />
            <rect x="140" y="55" width="25" height="12" fill="#0f172a" />
            <rect x="190" y="55" width="20" height="12" fill="#0f172a" />
            {/* UV Light Beams */}
            <polygon points="80,15 220,15 200,55 100,55" fill="#38bdf8" opacity="0.4">
              <animate attributeName="opacity" values="0.2;0.7;0.2" dur="1.5s" repeatCount="indefinite" />
            </polygon>
            <polygon points="105,55 115,55 110,95 100,95" fill="#facc15" opacity="0.8" />
            <polygon points="145,55 160,55 155,95 140,95" fill="#facc15" opacity="0.8" />
          </svg>
        )}

        {stepIndex === 4 && (
          /* Step 4: Implantation & Metallization */
          <svg viewBox="0 0 300 160" width="100%" height="100%">
            {/* Substrate */}
            <rect x="50" y="100" width="200" height="35" rx="4" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
            {/* Ion beams */}
            <g stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4">
              <line x1="90" y1="30" x2="100" y2="100">
                <animate attributeName="y1" values="20;90" dur="0.8s" repeatCount="indefinite" />
                <animate attributeName="y2" values="30;100" dur="0.8s" repeatCount="indefinite" />
              </line>
              <line x1="150" y1="30" x2="150" y2="100">
                <animate attributeName="y1" values="20;90" dur="0.8s" begin="0.3s" repeatCount="indefinite" />
                <animate attributeName="y2" values="30;100" dur="0.8s" begin="0.3s" repeatCount="indefinite" />
              </line>
              <line x1="210" y1="30" x2="200" y2="100">
                <animate attributeName="y1" values="20;90" dur="0.8s" begin="0.6s" repeatCount="indefinite" />
                <animate attributeName="y2" values="30;100" dur="0.8s" begin="0.6s" repeatCount="indefinite" />
              </line>
            </g>
            {/* Metal wiring links */}
            <path d="M 80 100 L 80 80 L 150 80 L 150 100" fill="none" stroke="#fbbf24" strokeWidth="3" />
            <path d="M 150 100 L 150 75 L 220 75 L 220 100" fill="none" stroke="#fbbf24" strokeWidth="3" />
          </svg>
        )}

        {stepIndex === 5 && (
          /* Step 5: Dicing, Packaging & Testing */
          <svg viewBox="0 0 300 160" width="100%" height="100%">
            {/* Wafer grid being diced */}
            <rect x="80" y="40" width="140" height="80" rx="4" fill="#3b82f6" stroke="#93c5fd" strokeWidth="2" />
            <line x1="150" y1="40" x2="150" y2="120" stroke="#1e293b" strokeWidth="3" strokeDasharray="6 2" />
            <line x1="80" y1="80" x2="220" y2="80" stroke="#1e293b" strokeWidth="3" strokeDasharray="6 2" />
            {/* Pass Checkmark */}
            <circle cx="235" cy="50" r="16" fill="#22c55e" />
            <path d="M 227 50 L 232 55 L 243 43" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            {/* Probe test needle */}
            <polygon points="120,15 125,15 122.5,45" fill="#facc15">
              <animate attributeName="transform" type="translate" values="0,0; 0,10; 0,0" dur="1.2s" repeatCount="indefinite" />
            </polygon>
          </svg>
        )}
      </div>

      <div style={{ marginTop: '16px', fontSize: '0.95rem', color: '#94a3b8', textAlign: 'center' }}>
        {t.currentStage} 0{stepIndex + 1}
      </div>
    </div>
  );
}
