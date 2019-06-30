import { Job } from 'bull';

export interface Events<K = any> {
  error: (err: Error) => void;
  'global:error': (err: Error) => void;
  waiting: (jobId: string) => void;
  'global:waiting': (jobId: string) => void;
  active: (job: Job<K>) => K;
  'global:active': (jobId: string) => void;
  stalled: (job: Job<K>) => K;
  'global:stalled': (jobId: string) => void;
  progress: (job: Job<K>, progress: {}) => void;
  'global:progress': (jobId: string, progress: {}) => void;
  completed: (job: Job<K>, result: {}) => void;
  'global:completed': (jobId: string, result: {}) => void;
  failed: (job: Job<K>, err: Error) => void;
  'global:failed': (jobId: string, err: Error) => void;
  paused: () => void;
  'global:paused': () => void;
  resumed: () => void;
  'global:resumed': () => void;
  cleaned: (jobs: Job<K>[], type: string) => void;
  'global:cleaned': (jobIds: string[], type: string) => void;
  drained: () => void;
  'global:drained': () => void;
  removed: (job: Job<K>) => K;
  'global:removed': (jobId: string) => void;
}
