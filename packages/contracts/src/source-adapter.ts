export interface AdapterCapabilities {
  multiObject: boolean;
  refresh: boolean;
  preview: boolean;
  requiresCredentials: boolean;
  mayUseNetwork: boolean;
}

export interface SourceObjectDescriptor {
  externalKey: string;
  displayName: string;
  kind: string;
  ordinal: number;
  metadata?: Readonly<Record<string, unknown>>;
}

export interface PreviewTable {
  columns: string[];
  rows: ReadonlyArray<ReadonlyArray<unknown>>;
  truncated: boolean;
}

export interface SourceAdapter<TLocator = unknown> {
  readonly id: string;
  readonly capabilities: AdapterCapabilities;
  probe(locator: TLocator, signal?: AbortSignal): Promise<void>;
  discoverObjects(locator: TLocator, signal?: AbortSignal): Promise<SourceObjectDescriptor[]>;
  previewObject(
    locator: TLocator,
    object: SourceObjectDescriptor,
    signal?: AbortSignal,
  ): Promise<PreviewTable>;
}
