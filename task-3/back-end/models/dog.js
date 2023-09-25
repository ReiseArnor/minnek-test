module.exports = (sequelize, dataType) => {
    const Dog = sequelize.define('dog', {
        name: {
            type: dataType.STRING
        },
        breed: {
            type: dataType.STRING
        },
        image: {
            type: dataType.STRING
        }
    });

    return Dog;
};
