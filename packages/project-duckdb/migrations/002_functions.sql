-- DuckDB helper macros. Keep domain semantics in code unless a SQL helper is clearly reusable.
CREATE OR REPLACE MACRO obdavi_safe_divide(numerator, denominator) AS
  CASE WHEN denominator IS NULL OR denominator = 0 THEN NULL ELSE numerator / denominator END;
