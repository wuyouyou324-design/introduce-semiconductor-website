import { useMemo, useState } from 'react';
import { useRouter } from '../app/useRouter';
import { useLanguage } from '../app/useLanguage';
import './ContentPages.css';

export function GlossaryPage() { 
  const { navigate } = useRouter(); 
  const { t } = useLanguage();
  const [query, setQuery] = useState(''); 
  const terms = t.glossaryTerms;

  const filtered = useMemo(() => 
    terms.filter(([, zh, en, text]) => `${zh}${en}${text}`.toLowerCase().includes(query.toLowerCase())), 
    [query, terms]
  ); 

  return (
    <div className="content-page">
      <section className="content-hero">
        <span className="eyebrow">{t.glossaryEyebrow}</span>
        <h1>{t.glossaryTitle}</h1>
        <p>{t.glossaryDesc}</p>
        <label className="search-box">
          <span aria-hidden="true">⌕</span>
          <input 
            value={query} 
            onChange={(event) => setQuery(event.target.value)} 
            placeholder={t.searchPlaceholder} 
            aria-label={t.searchLabel} 
          />
        </label>
      </section>
      <div className="content-container">
        <div className="term-grid">
          {filtered.map(([id, zh, en, text]) => (
            <article className="term-card" id={id} key={id}>
              <h2>{zh}</h2>
              <span>{en}</span>
              <p>{text}</p>
            </article>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="empty-state">{t.emptyGlossary}</p>
        )}
        <button type="button" className="back-link" onClick={() => navigate('/')}>
          {t.backHome}
        </button>
      </div>
    </div>
  ); 
}
