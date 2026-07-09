const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

require('dotenv').config();

const sequelizeOptions = {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false }
  }
};

const sequelize = process.env.POSTGRES_URI 
  ? new Sequelize(process.env.POSTGRES_URI, sequelizeOptions)
  : new Sequelize(sequelizeOptions);

const User = sequelize.define('User', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  displayName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  avatarId: {
    type: DataTypes.STRING,
    defaultValue: 'default'
  },
  status: {
    type: DataTypes.ENUM('online', 'away', 'dnd', 'offline'),
    defaultValue: 'online'
  }
});

const Community = sequelize.define('Community', {
  id: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: DataTypes.TEXT,
  rules: DataTypes.TEXT,
  visibility: {
    type: DataTypes.ENUM('public', 'private'),
    defaultValue: 'public'
  },
  inviteCode: {
    type: DataTypes.STRING,
    unique: true
  },
  retentionMode: {
    type: DataTypes.ENUM('30d', '24h'),
    defaultValue: '30d'
  }
});

const Membership = sequelize.define('Membership', {
  role: {
    type: DataTypes.ENUM('owner', 'admin', 'member'),
    defaultValue: 'member'
  }
});

const DMRequest = sequelize.define('DMRequest', {
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
    defaultValue: 'pending'
  }
});

// Relationships
User.hasMany(Community, { foreignKey: 'ownerId', as: 'ownedCommunities' });
Community.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });

User.belongsToMany(Community, { through: Membership });
Community.belongsToMany(User, { through: Membership });

DMRequest.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });
DMRequest.belongsTo(User, { foreignKey: 'receiverId', as: 'receiver' });

module.exports = {
  sequelize,
  User,
  Community,
  Membership,
  DMRequest
};
