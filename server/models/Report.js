export default (sequelize, DataTypes) => {
  const Report = sequelize.define(
    'Report',
    {
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      doctor: { type: DataTypes.STRING, allowNull: false },
      appointment_id: { type: DataTypes.INTEGER, allowNull: false },
      system: { type: DataTypes.STRING, allowNull: false },
      disease: { type: DataTypes.STRING, allowNull: false },
      severity: { type: DataTypes.STRING, allowNull: false },
      status: { type: DataTypes.STRING, allowNull: false },
      treatments: { type: DataTypes.JSON, allowNull: false },
      symptoms: { type: DataTypes.STRING, allowNull: false },
    },
    { tableName: 'reports' },
  );

  Report.associate = (models) => {
    Report.belongsTo(models.User, { foreignKey: 'user_id', as: 'users' });
  };

  return Report;
};
