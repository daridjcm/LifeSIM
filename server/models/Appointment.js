export default (sequelize, DataTypes) => {
  const Appointment = sequelize.define(
    "Appointment",
    {
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      doctor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      time: {
        type: DataTypes.STRING,
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
      foreignKey: "userID",
      as: "user"
      })
    };

  return Appointment;
};