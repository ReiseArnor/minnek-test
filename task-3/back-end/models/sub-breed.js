module.exports = (sequelize, dataType) => {
    const SubBreed = sequelize.define("sub_breed", {
        id: {
            type: dataType.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: dataType.STRING,
            unique: true,
        },
    });

    return SubBreed;
};
