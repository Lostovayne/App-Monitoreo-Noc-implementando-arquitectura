export enum LogSeverityLevel {
    low = "low",
    medium = "medium",
    high = "high",
}

export class LogEntity {
    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;

    constructor(message: string, level: LogSeverityLevel) {
        this.level = level;
        this.message = message;
        this.createdAt = new Date();
    }

    static fromJson(json: string): LogEntity {
        const { message, level, createdAt } = JSON.parse(json);
        if (!message) throw new Error("message is required");
        if (!level) throw new Error("level is required");
        if (!createdAt) throw new Error("createdAt is required");

        const log = new LogEntity(message, level);
        log.createdAt = new Date(createdAt);

        return log;
    }
}
