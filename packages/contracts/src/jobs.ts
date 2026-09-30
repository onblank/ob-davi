export type JobStatus = 'queued' | 'running' | 'completed' | 'failed' | 'cancelled';

export interface JobProgress {
  jobId: string;
  status: JobStatus;
  fraction?: number;
  message?: string;
}
