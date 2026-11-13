import { useRouter } from '../../app/useRouter';
import { useLanguage } from '../../app/useLanguage';
import './Footer.css';

export function Footer() {
  const { navigate } = useRouter();
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>{t.brandName}</h3>
          <p>{t.brandSubtitle}</p>
        </div>
        <div className="footer-links">
          <h4>{t.quickNav}</h4>
          <ul>
            <li><button type="button" onClick={() => navigate('/')}>{t.navHome}</button></li>
            <li><button type="button" onClick={() => navigate('/learn')}>{t.navLearn}</button></li>
            <li><button type="button" onClick={() => navigate('/lab/logic-gates')}>{t.navLab}</button></li>
            <li><button type="button" onClick={() => navigate('/manufacturing')}>{t.navMfg}</button></li>
            <li><button type="button" onClick={() => navigate('/glossary')}>{t.navGlossary}</button></li>
          </ul>
        </div>
        <div className="footer-info">
          <h4>{t.aboutProject}</h4>
          <p>{t.aboutDesc}</p>
          <p className="copyright">{t.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
