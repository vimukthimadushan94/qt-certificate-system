const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Certificate = sequelize.define('certificates', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  certificate_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  file_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sync the model with the database
Certificate.sync({ force: false })
  .then(() => {
    console.log('Certificate table created successfully');
  })
  .catch((err) => {
    console.error('Error creating Certificate table:', err);
  });

module.exports = Certificate;
