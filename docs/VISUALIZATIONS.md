# Visualization Model v1

Persist OB-DaVi definitions, never raw ECharts options.

## Kinds

- table
- pivot_table
- kpi
- bar
- horizontal_bar
- grouped_bar
- stacked_bar
- line
- area
- stacked_area
- pie
- donut
- scatter
- bubble
- histogram
- heatmap
- treemap
- waterfall
- funnel
- gauge
- boxplot
- combo_bar_line

## Definition layers

```text
Data
- fields/measures
- aggregation
- filters
- sort

Encoding
- x
- y
- series
- size
- category
- value

Appearance
- title/subtitle
- legend
- labels
- axes
- grid
- formats
- local color palette

Interaction
- tooltip
- zoom
- selection
- cross-filter behavior
```

The visualization engine converts the normalized definition plus query result into ECharts configuration.

## Cross-filter

A visual selection produces a normalized ephemeral selection event. The application/query layer resolves compatible fields through the relationship graph and re-queries affected visuals. Selection state is not persisted as a dashboard filter unless the user explicitly converts it into one.
