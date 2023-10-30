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
