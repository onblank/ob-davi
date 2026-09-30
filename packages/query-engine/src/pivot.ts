export interface PivotAxisItem { fieldId: string; sort?: 'asc' | 'desc'; }
export interface PivotValueItem { measureId: string; }
export interface PivotDefinition {
  rows: PivotAxisItem[];
  columns: PivotAxisItem[];
  values: PivotValueItem[];
  filters: ReadonlyArray<Readonly<Record<string, unknown>>>;
  showSubtotals: boolean;
  showGrandTotals: boolean;
}
