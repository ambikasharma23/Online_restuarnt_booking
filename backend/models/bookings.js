module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define('Booking', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        slot_id: {
          type: DataTypes.INTEGER,
          references: {
            model: 'Slots',
            key: 'id',
          },
          allowNull: false,
        },
        customer_id: {
          type: DataTypes.INTEGER,
          references: {
            model: 'Customers',
            key: 'id',
          },
          allowNull: false,
        },
        customer_name: {
          type: DataTypes.STRING,
        },
        contact_number: {
          type: DataTypes.STRING,
        },
        booking_date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        num_guests: {
          type: DataTypes.INTEGER,
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

      return Booking
}