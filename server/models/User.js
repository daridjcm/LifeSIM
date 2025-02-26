// server/models/User.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    email: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: true 
    },
    password: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    gender: { 
      type: DataTypes.STRING, 
      allowNull: false 
    }
  }, {
    timestamps: true,
    tableName: 'users'
  });

  User.associate = (models) => {
    User.hasMany(models.Invoice, {
      foreignKey: 'userID',
      as: 'invoices'
    });
  };

  return User;
};
