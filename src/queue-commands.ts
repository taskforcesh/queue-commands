import { JobOptions, JobStatusClean } from 'bull';
import { Events } from './queue-events';

export interface CleanParams {
  grace: number;
  status?: JobStatusClean;
  limit: number;
}

export enum CommandTypes {
  Authorized = 'authorized',
  Add = 'add',
  Pause = 'pause',
  Resume = 'resume',
  Empty = 'empty',
  Clean = 'clean',
  Process = 'process',
  Count = 'count',
  GetJobs = 'getJobs',
  GetJobsCount = 'getJobsCount',
  GetJobLogs = 'getJobLogs',
  RemoveRepeatable = 'removeRepeatable',
  JobsCommand = 'jobs',
  JobUpdate = 'jobUpdate',
  JobProgress = 'jobProgress',
  JobLog = 'jobLog',
  RegisterEvent = 'registerEvent',
  UnregisterEvent = 'unregisterEvent',
  SendEvent = 'sendEvent',
}

export interface Command<T = any> {
  readonly type: CommandTypes;
  payload?: T;
}

export interface AuthorizedCommand extends Command {
  readonly type: CommandTypes.Authorized;
}

export interface AddCommand extends Command {
  readonly type: CommandTypes.Add;
  payload: { data: object; opts: JobOptions };
}

export interface PauseCommand extends Command {
  readonly type: CommandTypes.Pause;
}

export interface ResumeCommand extends Command {
  readonly type: CommandTypes.Resume;
}

export interface EmptyCommand extends Command {
  readonly type: CommandTypes.Empty;
}

export interface CleanCommand extends Command {
  readonly type: CommandTypes.Clean;
  payload: CleanParams;
}

export interface CountCommand extends Command {
  readonly type: CommandTypes.Count;
}

export interface ProcessCommand extends Command {
  readonly type: CommandTypes.Process;
  payload: object;
}

export type GetJobsMethod =
  | 'getWaiting'
  | 'getActive'
  | 'getDelayed'
  | 'getCompleted'
  | 'getFailed'
  | 'getRepeatableJobs'
  | 'getWorkers';

export interface GetJobsParams {
  method: GetJobsMethod;
  start: number;
  end: number;
  asc: boolean;
}

export interface GetJobsCommand extends Command {
  readonly type: CommandTypes.GetJobs;
  payload: GetJobsParams;
}

export type GetJobsCountMethod =
  | 'getWaitingCount'
  | 'getActiveCount'
  | 'getDelayedCount'
  | 'getCompletedCount'
  | 'getFailedCount'
  | 'getRepeatableCount'
  | 'getWorkersCount';

export interface GetJobsCountCommand extends Command {
  readonly type: CommandTypes.GetJobsCount;
  payload: { method: GetJobsCountMethod };
}

export type JobsMethod = 'retry' | 'promote' | 'remove' | 'discard';

export interface JobsCommand extends Command {
  readonly type: CommandTypes.GetJobsCount;
  payload: { method: JobsMethod; jobId: string };
}

export interface RemoveRepeatableCommand extends Command {
  readonly type: CommandTypes.RemoveRepeatable;
  payload: { key: string };
}

export interface GetJobLogsCommand extends Command {
  readonly type: CommandTypes.GetJobLogs;
  payload: { jobId: string; start: number; end: number };
}

export interface JobUpdateCommand extends Command {
  readonly type: CommandTypes.JobUpdate;
  payload: {};
}

export interface JobProgressCommand extends Command {
  readonly type: CommandTypes.JobProgress;
  payload: { jobId: string; data: {} };
}

export interface JobLogCommand extends Command {
  readonly type: CommandTypes.JobLog;
  payload: { jobId: string; row: string };
}

export interface RegisterEvent extends Command {
  readonly type: CommandTypes.RegisterEvent;
  payload: { jobId: string; row: string };
}

export interface UnregisterEvent extends Command {
  readonly type: CommandTypes.UnregisterEvent;
  payload: { event: string };
}

export interface SendEvent extends Command {
  readonly type: CommandTypes.SendEvent;
  payload: { event: keyof Events; data: any };
}

export type CommandTypeUnion =
  | AddCommand
  | PauseCommand
  | PauseCommand
  | ResumeCommand
  | CleanCommand
  | CountCommand
  | EmptyCommand
  | GetJobsCommand
  | GetJobsCountCommand
  | JobsCommand
  | JobUpdateCommand
  | JobProgressCommand
  | JobLogCommand
  | RegisterEvent
  | UnregisterEvent
  | SendEvent;
