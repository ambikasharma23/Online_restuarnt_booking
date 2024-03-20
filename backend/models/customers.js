module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define('Customer', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          alloNull:false,
          field:"created_at",
          timestamps: true,
        },
        updatedAt: {
          type: DataTypes.DATE,
          alloNull:false,
          field:"updated_at",
          timestamps: true,
        },
      });

      return Customer
}
