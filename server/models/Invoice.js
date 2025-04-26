export default (sequelize, DataTypes) => {
  const Invoice = sequelize.define(
    "Invoice",
    {
      invoice_number: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      items: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: "invoices",
    },
  );

  // Relation with User
  Invoice.associate = (models) => {
    Invoice.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Invoice;
};
