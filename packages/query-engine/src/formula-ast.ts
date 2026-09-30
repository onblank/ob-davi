export type SafeExpression =
  | { type: 'literal'; value: string | number | boolean | null }
  | { type: 'field'; fieldId: string }
  | { type: 'binary'; op: string; left: SafeExpression; right: SafeExpression }
  | { type: 'unary'; op: string; value: SafeExpression }
  | { type: 'call'; fn: string; args: SafeExpression[] };
