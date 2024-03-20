module.exports = (sequelize, DataTypes) => {
  const Restaurants = sequelize.define('Restaurants', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
      },
      location: {
        type: DataTypes.STRING,
      },
      cuisine_type: {
        type: DataTypes.STRING,
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
    Restaurants.associate = (models) => {
      Restaurants.hasMany(models.Slot, { foreignKey: 'restaurant_id' });
      Restaurants.hasMany(models.Inventory, { foreignKey: 'restaurant_id' });
    };
    return Restaurants
}