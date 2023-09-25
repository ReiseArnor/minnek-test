const config = require("../config/db.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: config.dialect,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle,
        },
    },
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user")(sequelize, Sequelize);
db.dog = require("./dog")(sequelize, Sequelize);
db.subbreed = require("./sub-breed")(sequelize, Sequelize);
db.refresh_token = require("./refresh-token")(sequelize, Sequelize);

db.dog.belongsToMany(db.subbreed, {
    through: "dog_sub_breeds",
    foreignKey: "dog_id",
    otherKey: "sub_breed_id",
});

db.subbreed.belongsToMany(db.dog, {
    through: "dog_sub_breeds",
    foreignKey: "sub_breed_id",
    otherKey: "dog_id",
});

db.user.hasMany(db.dog, {
    as: "dogs",
    foreignKey: "user_id",
    targetKey: "id",
});

db.dog.belongsTo(db.user, {
    foreignKey: "user_id",
    targetKey: "id",
});

db.refresh_token.belongsTo(db.user, {
    foreignKey: "user_id",
    targetKey: "id",
});

db.user.hasOne(db.refresh_token, {
    foreignKey: "user_id",
    targetKey: "id",
});

module.exports = db;
