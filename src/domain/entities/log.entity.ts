export enum LogSeverityLevel {
    low = "low",
    medium = "medium",
    high = "high",
}

export interface logEntityOptions {
    level: LogSeverityLevel;
    message: string;
    origin: string;
    createdAt?: Date;
}

export class LogEntity {
    [x: string]: any;
    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor(options: logEntityOptions) {
        const { message, level, origin, createdAt = new Date() } = options;
        this.level = level;
        this.message = message;
        this.createdAt = createdAt;
        this.origin = origin;
    }

    static fromJson(json: string): LogEntity {
        const { message, level, createdAt, origin } = JSON.parse(json);
        if (!message) throw new Error("message is required");
        if (!level) throw new Error("level is required");
        if (!createdAt) throw new Error("createdAt is required");

        const log = new LogEntity({
            message,
            level,
            createdAt,
            origin,
        });

        return log;
    }

    static fromObject = (object: { [key: string]: any }): LogEntity => {
        const { message, level, createdAt, origin } = object;
        if (!message) throw new Error("message is required");
        if (!level) throw new Error("level is required");
        if (!origin) throw new Error("origin is required");
        const log = new LogEntity({
            message,
            level,
            createdAt,
            origin,
        });
        return log;
    };
}
