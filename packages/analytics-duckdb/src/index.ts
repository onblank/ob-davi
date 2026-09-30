export interface AnalyticsJobRequest { projectPath: string; kind: string; payload: Readonly<Record<string, unknown>>; }
export interface AnalyticsJobResponse { ok: boolean; payload?: unknown; error?: string; }
