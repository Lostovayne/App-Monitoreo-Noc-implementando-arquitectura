import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDataSource());

export class Server {
    public static start() {
        CronService.createJob("*/5 * * * * *", () => {
            const url = "https://google.com";

            const checkService = new CheckService(
                fileSystemLogRepository,
                () => console.log(`${url} is ok`),
                (error) => console.error(error)
            );
            checkService.execute(url);
        });
    }
}
