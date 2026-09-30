# Visual Export v1

Exports are presentation/data artifacts, not editable OB-DaVi projects.

## Dashboard

- PDF: print-quality static dashboard export through Electron/Chromium print pipeline;
- PNG: raster snapshot of selected dashboard/canvas.

## Individual visual

- PNG;
- SVG when the visualization renderer can faithfully represent it.

## Tables and pivots

- CSV;
- XLSX.

Export operations that can be expensive run as cancellable jobs outside the renderer where feasible.
