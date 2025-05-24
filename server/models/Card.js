import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Card = sequelize.define(
    'Card',
    { user_id: { type: DataTypes.INTEGER, allowNull: false },
    card_id: { type: DataTypes.INTEGER, allowNull: false },
    card_number: { type: DataTypes.INTEGER, allowNull: false, unique: true, primaryKey: true },
    card_capital: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
    expiration_date: { type: DataTypes.DATE, allowNull: false },
    expired: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  },
    { tableName: 'cards' },
  );

  Card.associate = (models) => {
    Card.belongsTo(models.User, { foreignKey: 'user_id', as: 'users' });
  };
  return Card;
};
