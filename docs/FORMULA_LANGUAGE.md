# Formula Language v1

OB-DaVi formulas use stable field references in the AST even when the editor displays `[Revenue]`-style names.

## Calculated columns

Row context examples:

```text
[Revenue] - [Cost]
IF([Tickets] = 0, NULL, [Revenue] / [Tickets])
YEAR([Date])
```

## Measures

Filter/aggregation context examples:

```text
SUM([Revenue])
SUM([Revenue]) / NULLIF(SUM([Tickets]), 0)
COUNT_DISTINCT([Order Id])
```

## v1 operators

Arithmetic: `+ - * / %`  
Comparison: `= != > >= < <=`  
Boolean: `AND OR NOT`

## v1 function families

- aggregate: SUM, AVG, MIN, MAX, COUNT, COUNT_DISTINCT;
- null/conditional: IF, COALESCE, NULLIF;
- numeric: ABS, ROUND, FLOOR, CEIL;
- string: LOWER, UPPER, TRIM, LENGTH, CONCAT, CONTAINS;
- date: YEAR, QUARTER, MONTH, WEEK, DAY, HOUR, DATE_DIFF;

The parser produces a validated AST. Compilation resolves UUID-backed field references and emits safe DuckDB SQL fragments. Formula text is never concatenated blindly into executable SQL.
