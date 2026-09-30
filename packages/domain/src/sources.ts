export type SourceAdapterKind =
  | 'excel'
  | 'delimited_text'
  | 'json'
  | 'parquet'
  | 'arrow'
  | 'pdf'
  | 'sqlite'
  | 'duckdb'
  | 'postgresql'
  | 'mysql'
  | 'sqlserver';

export type SourceObjectKind = 'sheet' | 'table' | 'view' | 'json_table' | 'pdf_table' | 'file_table';

export interface SourceIdentity {
  id: string;
  adapterKind: SourceAdapterKind;
  displayName: string;
  portableHint?: string;
  fingerprint?: string;
  snapshotRevision: number;
}
