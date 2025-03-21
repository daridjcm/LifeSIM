export default (sequelize, DataTypes) => {
  const Appointment = sequelize.define(
    "Appointment",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      doctor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      specialist: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      area: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "scheduled",
      },
    },
    {
      timestamps: true,
      tableName: "appointments",
    },
  );

  Appointment.associate = (models) => {
    Appointment.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user", // Alias for user association
    });
  };

  return Appointment;
};