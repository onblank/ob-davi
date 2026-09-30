export type RelationshipCardinality = 'one_to_one' | 'one_to_many' | 'many_to_one';
export type RelationshipFilterDirection = 'single' | 'both';

export interface Relationship {
  id: string;
  fromDatasetId: string;
  fromFieldId: string;
  toDatasetId: string;
  toFieldId: string;
  cardinality: RelationshipCardinality;
  filterDirection: RelationshipFilterDirection;
  isActive: boolean;
}
