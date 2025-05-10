import { DataTypes, INTEGER } from "sequelize";

export default (sequelize) => {
  const HealthInsurance = sequelize.define(
    'HealthInsurance',
    { user_id: { type: DataTypes.INTEGER, allowNull: false },
    type: { type: DataTypes.ENUM('basic', 'medium', 'premium'), allowNull: false },
    expiration_date: { type: DataTypes.DATE, allowNull: false },
    expired: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    card_id: { type: DataTypes.INTEGER, allowNull: false },
    card_number: { type: DataTypes.INTEGER, allowNull: false },
    card_capital: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
  },
    { tableName: 'health_insurances' },
  );

  HealthInsurance.associate = (models) => {
    HealthInsurance.belongsTo(models.User, { foreignKey: 'user_id', as: 'users' });
    HealthInsurance.belongsTo(models.HealthInsurance, { foreignKey: 'card_id', as: 'health_insurances' });
  };
  return HealthInsurance;
};
