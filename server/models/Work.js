export default (sequelize, DataTypes) => {
  const Work = sequelize.define(
    'Work',
    {
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      job: { type: DataTypes.STRING, allowNull: false, defaultValue: 'Administrative Assistant' },
      company: { type: DataTypes.STRING, allowNull: false, defaultValue: 'LifeSIM Inc.' },
      salary: { type: DataTypes.DECIMAL(15, 2), allowNull: false, defaultValue: 500.00 },
      work_experience: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 1 },
      status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }, // true = employed (1), false = unemployed (0)
      start_date: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      end_date: { type: DataTypes.DATE, allowNull: true }, // Nullable for current employment
    },
    { tableName: 'works' },
  );

  Work.associate = (models) => {
    Work.belongsTo(models.User, { foreignKey: 'user_id', as: 'users' });
  };

  return Work;
};
