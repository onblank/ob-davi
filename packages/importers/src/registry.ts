export const V1_SOURCE_ADAPTERS = [
  { id: 'excel', extensions: ['xlsx', 'xls', 'xlsm', 'xlsb', 'ods'], network: false },
  { id: 'delimited_text', extensions: ['csv', 'tsv'], network: false },
  { id: 'json', extensions: ['json', 'jsonl', 'ndjson'], network: false },
  { id: 'parquet', extensions: ['parquet'], network: false },
  { id: 'arrow', extensions: ['arrow', 'feather'], network: false },
  { id: 'pdf', extensions: ['pdf'], network: false },
  { id: 'sqlite', extensions: ['sqlite', 'sqlite3', 'db'], network: false },
  { id: 'duckdb', extensions: ['duckdb'], network: false },
  { id: 'postgresql', extensions: [], network: true },
  { id: 'mysql', extensions: [], network: true },
  { id: 'sqlserver', extensions: [], network: true },
] as const;
