export default (sequelize, DataTypes) => {
  const Invoice = sequelize.define(
    'Invoice',
    {
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      invoice_number: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      items: { type: DataTypes.JSON, allowNull: false },
      total_amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      payment_method: { type: DataTypes.STRING, allowNull: false },
    },
    { timestamps: true, tableName: 'invoices' },
  );

  // Relation with User
  Invoice.associate = (models) => {
    Invoice.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return Invoice;
};
