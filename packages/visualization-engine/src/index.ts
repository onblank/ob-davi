export interface EChartsAdapterInput {
  definition: Readonly<Record<string, unknown>>;
  columns: string[];
  rows: ReadonlyArray<ReadonlyArray<unknown>>;
}

export type EChartsOptionLike = Readonly<Record<string, unknown>>;

export function toEChartsOption(_input: EChartsAdapterInput): EChartsOptionLike {
  // Intentionally narrow foundation: each visualization kind gets an explicit adapter.
  // Do not persist raw ECharts options as project domain state.
  return {};
}
