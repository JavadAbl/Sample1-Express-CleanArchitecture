// JobContract.ts
export type JobContract<TJobs extends string, TPayloads extends Record<TJobs, any>> = {
  jobs: TJobs;
  payloads: TPayloads;
};
