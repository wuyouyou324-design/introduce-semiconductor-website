import { useRouter } from '../../app/router';
import './Footer.css';

export function Footer() {
  const { navigate } = useRouter();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>半導體啟蒙基地</h3>
          <p>為國高中生打造的互動式半導體科普教育平台，探索晶片奧秘與未來科技。</p>
        </div>
        <div className="footer-links">
          <h4>快速導覽</h4>
          <ul>
            <li><button type="button" onClick={() => navigate('/')}>首頁</button></li>
            <li><button type="button" onClick={() => navigate('/learn')}>學習路徑</button></li>
            <li><button type="button" onClick={() => navigate('/lab/logic-gates')}>邏輯閘實驗室</button></li>
            <li><button type="button" onClick={() => navigate('/manufacturing')}>晶片製造</button></li>
            <li><button type="button" onClick={() => navigate('/glossary')}>詞彙表</button></li>
          </ul>
        </div>
        <div className="footer-info">
          <h4>關於專案</h4>
          <p>本站為純前端科普教育網站，不包含任何商業營利、登入系統或後端資料庫。</p>
          <p className="copyright">© 2026 半導體啟蒙基地. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
