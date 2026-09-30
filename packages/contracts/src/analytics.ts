export interface QueryRequest {
  projectPath: string;
  sql: string;
  parameters: readonly unknown[];
}

export interface QueryResult {
  columns: string[];
  rows: ReadonlyArray<ReadonlyArray<unknown>>;
}

export interface AnalyticsEngine {
  query(request: QueryRequest, signal?: AbortSignal): Promise<QueryResult>;
}
