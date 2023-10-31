import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prismaClient = new PrismaClient();

const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,
};

export class PostgresLogDatasource implements LogDatasource {
    async saveLog(log: LogEntity): Promise<void> {
        const newlog = await prismaClient.logModel.create({
            data: {
                message: log.message,
                level: severityEnum[log.level],
                createdAt: log.createdAt,
                origin: log.origin,
            },
        });

        console.log("Postgres Log created", newlog.id);
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const level = severityEnum[severityLevel];
        const dbLogs = await prismaClient.logModel.findMany({
            where: {
                level,
            },
        });

        const logEntities = dbLogs.map((log) => LogEntity.fromObject(log));
        return logEntities;
    }
}
