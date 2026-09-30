export type FormulaNode =
  | { kind: 'literal'; value: string | number | boolean | null }
  | { kind: 'field'; fieldId: string }
  | { kind: 'binary'; operator: string; left: FormulaNode; right: FormulaNode }
  | { kind: 'unary'; operator: string; operand: FormulaNode }
  | { kind: 'call'; name: string; args: FormulaNode[] };

export interface CalculatedFieldDefinition {
  id: string;
  datasetId: string;
  name: string;
  expression: string;
  ast: FormulaNode;
}

export interface MeasureDefinition {
  id: string;
  datasetId: string;
  name: string;
  expression: string;
  ast: FormulaNode;
}
