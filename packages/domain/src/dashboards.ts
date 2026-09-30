export type DashboardWidgetKind = 'visualization' | 'slicer' | 'text';

export interface DashboardWidget {
  id: string;
  dashboardId: string;
  kind: DashboardWidgetKind;
  visualizationId?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  config: Readonly<Record<string, unknown>>;
}
