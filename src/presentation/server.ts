import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDataSource());

const emailService = new EmailService();

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
        // new SendEmailLogs(emailService, fileSystemLogRepository).execute(["epsaind@gmail.com"]);

        // const EmailServiceWithFileSystem = new EmailService(fileSystemLogRepository);
        // EmailServiceWithFileSystem.sendEmailWithFileSystemLogs(["epsaind@gmail.com"]);

        //* Crear una tarea de cron cada cierto tiempo
        // CronService.createJob("*/5 * * * * *", () => {
        //     const url = "https://google.com";
        //     const checkService = new CheckService(
        //         fileSystemLogRepository,
        //         () => console.log(`${url} is ok`),
        //         (error) => console.error(error)
        //     );
        //     checkService.execute(url);
        // });
    }
}
