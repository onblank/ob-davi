import type { SafeExpression } from './formula-ast.js';

export interface FieldSqlResolver {
  resolve(fieldId: string): string;
}

export function compileExpression(node: SafeExpression, fields: FieldSqlResolver): string {
  switch (node.type) {
    case 'literal':
      if (node.value === null) return 'NULL';
      if (typeof node.value === 'number')
        return Number.isFinite(node.value) ? String(node.value) : 'NULL';
      if (typeof node.value === 'boolean') return node.value ? 'TRUE' : 'FALSE';
      return `'${node.value.replaceAll("'", "''")}'`;
    case 'field':
      return fields.resolve(node.fieldId);
    case 'binary':
      return `(${compileExpression(node.left, fields)} ${node.op} ${compileExpression(node.right, fields)})`;
    case 'unary':
      return `(${node.op} ${compileExpression(node.value, fields)})`;
    case 'call':
      return `${node.fn}(${node.args.map((arg) => compileExpression(arg, fields)).join(', ')})`;
  }
}
