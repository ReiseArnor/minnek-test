module.exports = (sequelize, dataType) => {
    const User = sequelize.define("user", {
      username: {
        type: dataType.STRING
      },
      password: {
        type: dataType.STRING
      }
    });

    return User;
};
