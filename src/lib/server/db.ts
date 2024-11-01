import { Sequelize } from "sequelize";

//TODO: make dotenv
export const sq = new Sequelize('postgres://postgres:445552@localhost:5432/part_store',
    { dialect: "postgres" }
);

(async () => {
    await sq.authenticate();
    await sq.sync();
})();