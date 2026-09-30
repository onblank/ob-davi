# PDF Table Extraction v1

OB-DaVi supports text-based PDFs only. OCR is out of scope for v1.

## Extraction

Using PDF.js:
1. extract text items and coordinates per page;
2. group text into row candidates using vertical tolerance derived from item/font geometry;
3. detect recurring horizontal column bands;
4. split candidate cells;
5. score candidate table structure;
6. infer potential header row;
7. show preview before import.

## Confidence

Recommended weighted score:
- column alignment consistency: 0.35;
- row width/column-count consistency: 0.25;
- cell occupancy/density: 0.15;
- header plausibility: 0.15;
- numeric/text type consistency by column: 0.10.

Threshold policy:
- `>= 0.85`: high; preview and normal import allowed;
- `>= 0.65 && < 0.85`: medium; explicit inspection/confirmation required;
- `< 0.65`: low; import blocked.

Even high-confidence candidates are previewed.

## Unsupported

If reliable text items are absent and the PDF appears image/scanned, show:

> This PDF does not contain reliable text-based tabular data. Scanned documents require OCR, which is not supported in OB-DaVi v1.

Never return guessed nonsense just to claim PDF support.
