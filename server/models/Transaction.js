export default (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    'Transaction',
    {
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      type: {
        type: DataTypes.ENUM(
          'current account',
          'savings account',
          'personal loan',
          'mortgage',
        ),
        allowNull: false,
      },
      amount: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
      date: { type: DataTypes.DATE, allowNull: false },
    },
    { tableName: 'transactions' },
  );

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.User, { foreignKey: 'user_id', as: 'users' });
  };

  return Transaction;
};
