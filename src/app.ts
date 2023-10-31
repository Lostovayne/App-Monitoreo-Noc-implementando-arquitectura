import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";

(async () => {
    main();
})();

async function main() {
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    });

    //* prisma crear
    // const prisma = new PrismaClient();
    // const newLog = await prisma.logModel.create({
    //     data: {
    //         level: "LOW",
    //         message: "Test desde Prisma",
    //         origin: "App.ts",
    //     },
    // });

    //* prisma mostrar datos

    // const logs = await prisma.logModel.findMany({
    //     where: {
    //         origin: "App.ts",
    //     },
    // });
    // console.log("Logs : ", logs);

    // //* Crear un elemento y lo guarda en Mongo
    // const newLog = await LogModel.create({
    //     message: "Test desde Mongo",
    //     origin: "App.ts",
    //     level: "low",
    // });
    // await newLog.save();
    // console.log("Log saved : ", newLog);

    Server.start();
    // console.log(envs.PORT);
}
