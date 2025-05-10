export default (sequelize, DataTypes) => {
  const BankAccount = sequelize.define(
    'BankAccount',
    {
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      current_account: {
        type: DataTypes.DECIMAL(15, 2),
        defaultValue: 0,
        allowNull: false,
      },
      savings_account: {
        type: DataTypes.DECIMAL(15, 2),
        defaultValue: 0,
        allowNull: false,
      },
      money_inverted: {
        type: DataTypes.DECIMAL(15, 2),
        defaultValue: 0,
        allowNull: false,
      },
      debt: {
        type: DataTypes.DECIMAL(15, 2),
        defaultValue: 0,
        allowNull: false,
      },
    },
    { tableName: 'bank_accounts' },
  );

  BankAccount.associate = (models) => {
    BankAccount.belongsTo(models.User, { foreignKey: 'user_id', as: 'users' });
  };

  return BankAccount;
};
