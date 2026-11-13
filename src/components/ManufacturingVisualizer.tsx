import { translations, type Language } from '../data/translations';
import type { ReactNode } from 'react';
import {
  DepositionVisual,
  ImplantationVisual,
  PackagingVisual,
  PhotolithographyVisual,
  PurificationVisual,
  SlicingVisual,
  type ManufacturingStepId,
} from './manufacturing/ManufacturingStepVisuals';

interface ManufacturingVisualizerProps {
  stepId: ManufacturingStepId;
  language: Language;
}

const stepVisuals: Record<ManufacturingStepId, () => ReactNode> = {
  purification: PurificationVisual,
  slicing: SlicingVisual,
  deposition: DepositionVisual,
  photolithography: PhotolithographyVisual,
  implantation: ImplantationVisual,
  packaging: PackagingVisual,
};

const stepNumberMap: Record<ManufacturingStepId, string> = {
  purification: '01',
  slicing: '02',
  deposition: '03',
  photolithography: '04',
  implantation: '05',
  packaging: '06',
};

export function ManufacturingVisualizer({ stepId, language }: ManufacturingVisualizerProps) {
  const t = translations[language];
  const StepVisual = stepVisuals[stepId] || stepVisuals.purification;
  const stepNum = stepNumberMap[stepId] || '01';

  return (
    <div className="mfg-visualizer">
      <div className="mfg-visualizer__label">{t.processSimulation}</div>
      <div className="mfg-visualizer__stage">
        <StepVisual />
      </div>
      <div className="mfg-visualizer__status">
        {t.currentStage} {stepNum}
      </div>
    </div>
  );
}
