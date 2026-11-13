import { useState } from 'react';
import { useRouter } from '../app/useRouter';
import { useLanguage } from '../app/useLanguage';
import { ManufacturingVisualizer } from '../components/ManufacturingVisualizer';
import type { ManufacturingStepId } from '../components/manufacturing/ManufacturingStepVisuals';
import './ContentPages.css';

const stepIds: ManufacturingStepId[] = [
  'purification',
  'slicing',
  'deposition',
  'photolithography',
  'implantation',
  'packaging',
];

export function ManufacturingPage() {
  const { navigate } = useRouter();
  const { t, language } = useLanguage();
  const [active, setActive] = useState(0);
  const steps = t.manufacturingSteps;
  const step = steps[active] || steps[0];
  const currentStepId = stepIds[active] || 'purification';

  return (
    <div className="content-page">
      <section className="content-hero">
        <span className="eyebrow">{t.mfgEyebrow}</span>
        <h1>{t.mfgTitle}</h1>
        <p>{t.mfgDesc}</p>
      </section>
      <div className="content-container">
        <section className="process-panel" id="wafer">
          <div className="process-list" role="tablist" aria-label={t.mfgTabList}>
            {steps.map(([number, title], index) => (
              <button
                type="button"
                role="tab"
                aria-selected={active === index}
                className={active === index ? 'active' : ''}
                key={number}
                onClick={() => setActive(index)}
              >
                <span>{number}</span>
                {title}
              </button>
            ))}
          </div>
          <div className="process-detail">
            <span className="lesson-number">{step[0]}</span>
            <h2>{step[1]}</h2>
            <p>{step[2]}</p>
            <ManufacturingVisualizer stepId={currentStepId} language={language} />
          </div>
        </section>
        <button type="button" className="back-link process-back-link" onClick={() => navigate('/')}>
          {t.backHome}
        </button>
      </div>
    </div>
  );
}
