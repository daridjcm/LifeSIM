export default (sequelize, DataTypes) => {
  const Work = sequelize.define(
    'Work',
    {
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      job: { type: DataTypes.STRING, allowNull: false },
      company: { type: DataTypes.STRING, allowNull: false },
      salary: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
      work_experience: { type: DataTypes.TINYINT, allowNull: false },
      status: { type: DataTypes.BOOLEAN, allowNull: false }, // true = employed, false = unemployed
    },
    { timestamp: true, tableName: 'works' },
  );

  Work.associate = (models) => {
    Work.belongsTo(models.User, { foreignKey: 'user_id', as: 'users' });
  };

  return Work;
};
