export default (sequelize, DataTypes) => {
  const Appointment = sequelize.define(
    "Appointment",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
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
      foreignKey: "user_id",
      as: "users",
    });
  };

  return Appointment;
};
