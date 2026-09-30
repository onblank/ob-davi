export type TransformationKind =
  | 'rename_column' | 'reorder_columns' | 'remove_columns' | 'duplicate_column' | 'add_index'
  | 'cast_type' | 'filter_rows' | 'sort_rows' | 'distinct' | 'deduplicate'
  | 'replace_values' | 'replace_nulls' | 'fill_forward' | 'fill_backward'
  | 'trim' | 'lower' | 'upper' | 'substring' | 'split_column' | 'merge_columns'
  | 'regex_extract' | 'regex_replace' | 'arithmetic' | 'round' | 'abs'
  | 'parse_date' | 'date_part' | 'date_diff' | 'conditional_column' | 'calculated_column'
  | 'pivot' | 'unpivot' | 'group_aggregate' | 'join' | 'append_union'
  | 'json_flatten' | 'array_explode';

export interface TransformationStep {
  id: string;
  datasetId: string;
  order: number;
  operation: TransformationKind;
  config: Readonly<Record<string, unknown>>;
  enabled: boolean;
}
