import { useState } from 'react';
import { useRouter } from '../app/router';
import { useLanguage } from '../app/language';
import './ContentPages.css';

export function ManufacturingPage() { 
  const { navigate } = useRouter(); 
  const { t } = useLanguage();
  const [active, setActive] = useState(0); 
  const steps = t.manufacturingSteps;
  const step = steps[active] || steps[0]; 

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
            <div className="wafer-art" aria-hidden="true">
              <span style={{ display: 'inline-block', width: '48px', height: '48px', border: '3px dashed #3b82f6', borderRadius: '50%' }} />
            </div>
          </div>
        </section>
        <button type="button" className="back-link" onClick={() => navigate('/')}>
          {t.backHome}
        </button>
      </div>
    </div>
  ); 
}
