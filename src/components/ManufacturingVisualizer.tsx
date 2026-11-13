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
  stepIndex: number;
  language: Language;
}

const stepIds: ManufacturingStepId[] = [
  'purification',
  'slicing',
  'deposition',
  'photolithography',
  'implantation',
  'packaging',
];

const stepVisuals: Record<ManufacturingStepId, () => ReactNode> = {
  purification: PurificationVisual,
  slicing: SlicingVisual,
  deposition: DepositionVisual,
  photolithography: PhotolithographyVisual,
  implantation: ImplantationVisual,
  packaging: PackagingVisual,
};

export function ManufacturingVisualizer({ stepIndex, language }: ManufacturingVisualizerProps) {
  const t = translations[language];
  const stepId = stepIds[stepIndex] ?? stepIds[0];
  const StepVisual = stepVisuals[stepId];

  return (
    <div className="mfg-visualizer">
      <div className="mfg-visualizer__label">{t.processSimulation}</div>
      <div className="mfg-visualizer__stage">
        <StepVisual />
      </div>
      <div className="mfg-visualizer__status">
        {t.currentStage} 0{stepIndex + 1}
      </div>
    </div>
  );
}
