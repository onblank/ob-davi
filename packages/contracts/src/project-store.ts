export interface ProjectStore {
  create(path: string, name: string): Promise<void>;
  open(path: string): Promise<void>;
  close(): Promise<void>;
  migrate(): Promise<void>;
}
