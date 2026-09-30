export interface PdfTableConfidenceFactors {
  alignment: number;
  rowConsistency: number;
  density: number;
  headerPlausibility: number;
  typeConsistency: number;
}

export type PdfTableConfidenceLevel = 'high' | 'medium' | 'low';

export function scorePdfTable(f: PdfTableConfidenceFactors): { score: number; level: PdfTableConfidenceLevel } {
  const score =
    f.alignment * 0.35 +
    f.rowConsistency * 0.25 +
    f.density * 0.15 +
    f.headerPlausibility * 0.15 +
    f.typeConsistency * 0.10;
  const clamped = Math.max(0, Math.min(1, score));
  return { score: clamped, level: clamped >= 0.85 ? 'high' : clamped >= 0.65 ? 'medium' : 'low' };
}
