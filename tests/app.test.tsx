import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';

beforeEach(() => {
  window.scrollTo = vi.fn();
  window.history.pushState({}, '', '/');
});

describe('Introduce Semiconductor Website Comprehensive Tests', () => {
  it('renders homepage correctly with hero and learning paths', () => {
    render(<App />);
    expect(screen.getAllByText('半導體啟蒙基地')[0]).toBeDefined();
    expect(screen.getByText('探索微小世界中的')).toBeDefined();
    expect(screen.getByText('核心學習路徑')).toBeDefined();
    expect(screen.getByText('熱門科普主題')).toBeDefined();
  });

  it('navigates to learn page when learning path or nav link is clicked', () => {
    render(<App />);
    const learnButtons = screen.getAllByText('學習路徑');
    fireEvent.click(learnButtons[0]);
    expect(screen.getByRole('heading', { name: '半導體基礎學習' })).toBeDefined();
  });

  it('navigates to individual article when a learning lesson card is clicked', () => {
    render(<App />);
    const learnButtons = screen.getAllByText('學習路徑');
    fireEvent.click(learnButtons[0]);
    
    // Click on the first lesson card
    const articleLink = screen.getByText('導體、絕緣體與半導體');
    fireEvent.click(articleLink);

    // Verify we are inside the article view
    expect(screen.getByRole('heading', { name: '導體、絕緣體與半導體' })).toBeDefined();
    expect(screen.getByText('能量能隙與導電控制')).toBeDefined();
    expect(screen.getByText('← 返回學習列表')).toBeDefined();
  });

  it('navigates to logic gates lab page and can switch to wafer yield lab', () => {
    render(<App />);
    const labButtons = screen.getAllByText('邏輯閘實驗室');
    fireEvent.click(labButtons[0]);
    expect(screen.getByRole('heading', { name: '邏輯閘實驗室' })).toBeDefined();

    // Click on Wafer Yield tab
    const waferTab = screen.getByText(/晶圓良率計算機/);
    fireEvent.click(waferTab);
    expect(screen.getByRole('heading', { name: '晶圓良率與晶粒計算機' })).toBeDefined();
    expect(screen.getByText(/總毛晶粒數 \(DPW\)/)).toBeDefined();
    expect(screen.getAllByText(/超大 AI 晶片|超級 AI 晶片/)[0]).toBeDefined();
  });

  it('navigates to manufacturing page and switches process steps with visualizer using step IDs', () => {
    render(<App />);
    const mfgButtons = screen.getAllByText('晶片製造');
    fireEvent.click(mfgButtons[0]);
    expect(screen.getByRole('heading', { name: '晶片製造工藝' })).toBeDefined();
    expect(screen.getByText('製程視覺化動態模擬')).toBeDefined();

    // Click on step 2: 切片與拋光
    const step2Button = screen.getByRole('tab', { name: /切片與拋光/ });
    fireEvent.click(step2Button);
    expect(screen.getByText('當前製程階段：Step 02')).toBeDefined();
  });

  it('navigates to glossary page', () => {
    render(<App />);
    const glossaryButtons = screen.getAllByText('詞彙表');
    fireEvent.click(glossaryButtons[0]);
    expect(screen.getByRole('heading', { name: '半導體詞彙表' })).toBeDefined();
  });

  it('switches language between Chinese and English', () => {
    render(<App />);
    const langToggleBtn = screen.getByRole('button', { name: /切換語言 \/ Switch Language/i });
    fireEvent.click(langToggleBtn);
    expect(screen.getAllByText('Semiconductor Ignition Base')[0]).toBeDefined();
    fireEvent.click(langToggleBtn);
    expect(screen.getAllByText('半導體啟蒙基地')[0]).toBeDefined();
  });

  it('toggles theme between light and dark', () => {
    render(<App />);
    const themeBtn = screen.getByRole('button', { name: /切換深淺模式|Toggle Theme/i });
    fireEvent.click(themeBtn);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    fireEvent.click(themeBtn);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('renders 404 Not Found page for unknown routes', () => {
    window.history.pushState({}, '', '/unknown-route-test');
    render(<App />);
    expect(screen.getByText(/404 - 找不到頁面|Page Not Found/i)).toBeDefined();
  });

  it('interacts with logic gates lab truth table and input toggles', () => {
    render(<App />);
    const labButtons = screen.getAllByText('邏輯閘實驗室');
    fireEvent.click(labButtons[0]);
    expect(screen.getByRole('heading', { name: '邏輯閘實驗室' })).toBeDefined();

    expect(screen.getByText(/真值表/)).toBeDefined();
    const inputAButton = screen.getByRole('button', { name: /輸入 A/i });
    fireEvent.click(inputAButton);
  });

  it('interacts with full adder and 4-bit adder circuit lab', () => {
    render(<App />);
    const labButtons = screen.getAllByText('邏輯閘實驗室');
    fireEvent.click(labButtons[0]);

    // Switch to circuit tab
    const circuitTab = screen.getByText('串接電路與半加器');
    fireEvent.click(circuitTab);

    // Switch to full-adder
    const fullAdderBtn = screen.getByText('全加器 (Full-Adder)');
    fireEvent.click(fullAdderBtn);
    expect(screen.getAllByText(/進位輸入 \(Cin\)/)[0]).toBeDefined();

    // Switch to 4-bit adder
    const fourBitBtn = screen.getByText('4 位元加減運算器 (4-bit ALU)');
    fireEvent.click(fourBitBtn);
    expect(screen.getByText(/輸入 A \(4 位元\)/)).toBeDefined();
    expect(screen.getByText(/4-Bit Ripple Carry Adder/)).toBeDefined();
  });
});
