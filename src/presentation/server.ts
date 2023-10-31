import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log,datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

//* se está usando como inyector de dependencia para el uso del file system
const logRepository = new LogRepositoryImpl(new PostgresLogDatasource());
const emailService = new EmailService();

//* arreglo de logRepository
const fsLogRepository = new LogRepositoryImpl(new FileSystemDataSource());
const mongoLogRepository = new LogRepositoryImpl(new MongoLogDatasource());
const postgresLogRepository = new LogRepositoryImpl(new PostgresLogDatasource());

export class Server {
    public static start() {
        console.log("Server started...");

        //* Mandar Email simple
        // const emailService = new EmailService(fileSystemLogRepository);
        // emailService.sendEmail({
        //     to: "epsaind@gmail.com",
        //     subject: "Logs de sistema",
        //     htmlBody: `<h3>Logs de sistema</h3>`,
        // });

        //* Formas de Mandar Email con archivos
        // new SendEmailLogs(emailService, logRepository).execute(["epsaind@gmail.com"]);
        // const EmailServiceWithFileSystem = new EmailService(logRepository);
        // EmailServiceWithFileSystem.sendEmailWithFileSystemLogs(["epsaind@gmail.com"]);

        //* Crear una tarea de cron cada cierto tiempo
        // CronService.createJob("*/5 * * * * *", () => {
        //     const url = "https://google.com";
        //     const checkService = new CheckService(
        //         logRepository,
        //         () => console.log(`${url} is ok`),
        //         (error) => console.error(error)
        //     );
        //     checkService.execute(url);
        // });

        CronService.createJob("*/5 * * * * *", () => {
            const url = "https://google.com";
            const checkService = new CheckServiceMultiple(
                [fsLogRepository, mongoLogRepository, postgresLogRepository],
                () => console.log(`${url} is ok`),
                (error) => console.error(error)
            );
            checkService.execute(url);
        });
    }
}
