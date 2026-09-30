CREATE SCHEMA IF NOT EXISTS obdavi_meta;
CREATE SCHEMA IF NOT EXISTS obdavi_model;
CREATE SCHEMA IF NOT EXISTS obdavi_raw;
CREATE SCHEMA IF NOT EXISTS obdavi_data;
CREATE SCHEMA IF NOT EXISTS obdavi_cache;

CREATE TYPE obdavi_model.source_adapter_kind AS ENUM (
  'excel','delimited_text','json','parquet','arrow','pdf','sqlite','duckdb','postgresql','mysql','sqlserver'
);
CREATE TYPE obdavi_model.source_object_kind AS ENUM ('sheet','table','view','json_table','pdf_table','file_table');
CREATE TYPE obdavi_model.field_data_type AS ENUM ('string','integer','decimal','boolean','date','time','datetime','duration','json');
CREATE TYPE obdavi_model.field_semantic_role AS ENUM ('dimension','measure');
CREATE TYPE obdavi_model.field_format_kind AS ENUM ('general','number','currency','percentage','date','datetime','duration','text');
CREATE TYPE obdavi_model.relationship_cardinality AS ENUM ('one_to_one','one_to_many','many_to_one');
CREATE TYPE obdavi_model.relationship_filter_direction AS ENUM ('single','both');
CREATE TYPE obdavi_model.transformation_kind AS ENUM (
  'rename_column','reorder_columns','remove_columns','duplicate_column','add_index','cast_type','filter_rows','sort_rows',
  'distinct','deduplicate','replace_values','replace_nulls','fill_forward','fill_backward','trim','lower','upper','substring',
  'split_column','merge_columns','regex_extract','regex_replace','arithmetic','round','abs','parse_date','date_part','date_diff',
  'conditional_column','calculated_column','pivot','unpivot','group_aggregate','join','append_union','json_flatten','array_explode'
);
CREATE TYPE obdavi_model.visualization_kind AS ENUM (
  'table','pivot_table','kpi','bar','horizontal_bar','grouped_bar','stacked_bar','line','area','stacked_area','pie','donut',
  'scatter','bubble','histogram','heatmap','treemap','waterfall','funnel','gauge','boxplot','combo_bar_line'
);
CREATE TYPE obdavi_model.dashboard_widget_kind AS ENUM ('visualization','slicer','text');
CREATE TYPE obdavi_model.filter_scope_type AS ENUM ('visualization','dashboard');
CREATE TYPE obdavi_model.field_reference_kind AS ENUM ('field','calculated_field','measure');
CREATE TYPE obdavi_model.filter_operator AS ENUM (
  'eq','neq','gt','gte','lt','lte','in','not_in','between','contains','starts_with','ends_with','is_null','is_not_null'
);
