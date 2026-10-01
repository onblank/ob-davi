export type VisualizationKind =
  | 'table'
  | 'pivot_table'
  | 'kpi'
  | 'bar'
  | 'horizontal_bar'
  | 'grouped_bar'
  | 'stacked_bar'
  | 'line'
  | 'area'
  | 'stacked_area'
  | 'pie'
  | 'donut'
  | 'scatter'
  | 'bubble'
  | 'histogram'
  | 'heatmap'
  | 'treemap'
  | 'waterfall'
  | 'funnel'
  | 'gauge'
  | 'boxplot'
  | 'combo_bar_line';

export interface VisualizationDefinition {
  id: string;
  name: string;
  kind: VisualizationKind;
  query: Readonly<Record<string, unknown>>;
  encoding: Readonly<Record<string, unknown>>;
  style: Readonly<Record<string, unknown>>;
  interaction: Readonly<Record<string, unknown>>;
  pivotDefinitionId?: string;
}
