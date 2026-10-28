import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';

describe('Introduce Semiconductor Website M1', () => {
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

  it('navigates to logic gates lab page', () => {
    render(<App />);
    const labButtons = screen.getAllByText('邏輯閘實驗室');
    fireEvent.click(labButtons[0]);
    expect(screen.getByRole('heading', { name: '邏輯閘實驗室' })).toBeDefined();
  });

  it('navigates to manufacturing page', () => {
    render(<App />);
    const mfgButtons = screen.getAllByText('晶片製造');
    fireEvent.click(mfgButtons[0]);
    expect(screen.getByRole('heading', { name: '晶片製造工藝' })).toBeDefined();
  });

  it('navigates to glossary page', () => {
    render(<App />);
    const glossaryButtons = screen.getAllByText('詞彙表');
    fireEvent.click(glossaryButtons[0]);
    expect(screen.getByRole('heading', { name: '半導體詞彙表' })).toBeDefined();
  });
});
