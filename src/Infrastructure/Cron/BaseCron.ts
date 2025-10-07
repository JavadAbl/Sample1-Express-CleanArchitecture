import * as cron from "node-cron";

// Define the type for the job wrapper
interface JobWrapper {
  name: string;
  cronExpression: string;
  task: cron.TaskFn;
  job: cron.ScheduledTask;
  options?: cron.TaskOptions; // Using any since node-cron doesn't export ScheduleOptions
}

export class CronJobManager {
  protected jobs: Map<string, JobWrapper>;

  constructor() {
    this.jobs = new Map<string, JobWrapper>();
  }

  /**
   * Add a cron job to the manager
   * @param name - The name of the job
   * @param cronExpression - The cron expression
   * @param task - The function to execute
   * @param options - Additional options for the job
   */
  addJob(name: string, cronExpression: string, task: cron.TaskFn, options: cron.TaskOptions = {}): this {
    if (this.jobs.has(name)) {
      throw new Error(`Job with name '${name}' already exists`);
    }

    const job = cron.createTask(cronExpression, task, options);

    this.jobs.set(name, {
      name,
      cronExpression,
      task,
      job,
      options,
    });

    return this;
  }

  /**
   * Find a job by name
   * @param name - The name of the job to find
   * @returns The job object or null if not found
   */
  findJob(name: string): JobWrapper | null {
    return this.jobs.get(name) || null;
  }

  /**
   * Start a job by name
   * @param name - The name of the job to start
   * @returns True if the job was started, false if not found
   */
  startJob(name: string): boolean {
    const jobWrapper = this.jobs.get(name);
    if (!jobWrapper) {
      return false;
    }

    jobWrapper.job.start();
    return true;
  }

  /**
   * Start all jobs
   * @returns This instance for chaining
   */
  startAllJobs(): this {
    this.jobs.forEach((jobWrapper) => {
      jobWrapper.job.start();
    });
    return this;
  }

  /**
   * Stop a job by name
   * @param name - The name of the job to stop
   * @returns True if the job was stopped, false if not found
   */
  stopJob(name: string): boolean {
    const jobWrapper = this.jobs.get(name);
    if (!jobWrapper) {
      return false;
    }

    jobWrapper.job.stop();
    return true;
  }

  /**
   * Stop all jobs
   * @returns This instance for chaining
   */
  stopAllJobs(): this {
    this.jobs.forEach((jobWrapper) => {
      jobWrapper.job.stop();
    });
    return this;
  }

  /**
   * Pause a job by name (alias for stop)
   * @param name - The name of the job to pause
   * @returns True if the job was paused, false if not found
   */
  pauseJob(name: string): boolean {
    return this.stopJob(name);
  }

  /**
   * Remove a job by name
   * @param name - The name of the job to remove
   * @returns True if the job was removed, false if not found
   */
  removeJob(name: string): boolean {
    const jobWrapper = this.jobs.get(name);
    if (!jobWrapper) {
      return false;
    }

    jobWrapper.job.stop();
    jobWrapper.job.destroy();
    this.jobs.delete(name);
    return true;
  }

  /**
   * Get all job names
   * @returns Array of job names
   */
  getJobNames(): string[] {
    return Array.from(this.jobs.keys());
  }

  /**
   * Get all jobs
   * @returns Array of job objects
   */
  getAllJobs(): JobWrapper[] {
    return Array.from(this.jobs.values());
  }
}
