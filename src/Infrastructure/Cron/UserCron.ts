import { CronJobManager } from "./BaseCron.js";
import { CronExpression } from "./CronExpression.js";

export class UserCron extends CronJobManager {
  constructor() {
    super();
    this.setupJobs();
  }

  private setupJobs(): void {
    // Define jobs with specific cron expressions
    this.addJob("dailyReport", CronExpression.EVERY_5_SECONDS, () => {
      console.log("Running daily report job");
      // Your daily report logic here
    });

    this.addJob("hourlyCleanup", "0 * * * *", () => {
      console.log("Running hourly cleanup job");
      // Your cleanup logic here
    });

    this.addJob("weeklyBackup", "0 0 * * 0", () => {
      console.log("Running weekly backup job");
      // Your backup logic here
    });
  }
}
