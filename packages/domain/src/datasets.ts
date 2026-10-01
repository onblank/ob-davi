export type FieldDataType =
  'string' | 'integer' | 'decimal' | 'boolean' | 'date' | 'time' | 'datetime' | 'duration' | 'json';

export type SemanticRole = 'dimension' | 'measure';

export interface DatasetField {
  id: string;
  datasetId: string;
  physicalName: string;
  displayName: string;
  dataType: FieldDataType;
  semanticRole: SemanticRole;
  nullable: boolean;
  ordinal: number;
  sourceFieldKey?: string;
  inferenceConfidence?: number;
}

export interface Dataset {
  id: string;
  sourceObjectId?: string;
  name: string;
  description?: string;
  rawRelationName?: string;
  preparedRelationName: string;
  rowCount?: bigint;
}
