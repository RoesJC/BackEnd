import Sequelize from "sequelize";


const db = new Sequelize("tllmascotas","RoesJC","12306",{ //que raro esa es la que use...

    dialect: "mysql",
    host: "localhost",
    define: {
        freezeTableName: true, // Evita la pluralización automática en todos los modelos
    }
});

export {db};