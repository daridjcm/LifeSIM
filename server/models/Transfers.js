import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Transfer = sequelize.define(
    'Transfer',
    {
      from: { 
        type: DataTypes.STRING,  
        allowNull: false,
        validate: {
          isValidSource(value) {
            // Accept predefined values or numeric strings (for user IDs)
            const validValues = ['bank', 'current_account', 'savings_account'];
            if (!validValues.includes(value) && !/^\d+$/.test(value)) {
              throw new Error('From must be one of the predefined values or a user ID');
            }
          }
        }
      },
      to: { 
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isValidDestination(value) {
            // Accept predefined values or numeric strings (for user IDs)
            const validValues = ['bank', 'current_account', 'savings_account'];
            if (!validValues.includes(value) && !/^\d+$/.test(value)) {
              throw new Error('To must be one of the predefined values or a user ID');
            }
          }
        }
      },
      amount: { 
        type: DataTypes.DECIMAL(15, 2), 
        allowNull: false 
      },
      date: { 
        type: DataTypes.DATE, 
        allowNull: false 
      },
    },
    { 
      timestamps: true, 
      tableName: 'transfers' 
    },
  );
  
  // Helper instance methods to check the type
  Transfer.prototype.isFromUser = function() {
    return /^\d+$/.test(this.from);
  };
  
  Transfer.prototype.isToUser = function() {
    return /^\d+$/.test(this.to);
  };
  
  Transfer.prototype.getFromUserId = function() {
    return this.isFromUser() ? parseInt(this.from, 10) : null;
  };
  
  Transfer.prototype.getToUserId = function() {
    return this.isToUser() ? parseInt(this.to, 10) : null;
  };
  
  return Transfer;
};