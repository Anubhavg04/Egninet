const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database.sqlite'),
  logging: false
});

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
    defaultValue: 'offline'
  }
});

const Community = sequelize.define('Community', {
  id: {
    type: DataTypes.UUID,
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

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  attachmentUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  attachmentType: {
    type: DataTypes.STRING,
    allowNull: true
  },
  receiverId: {
    type: DataTypes.STRING,
    allowNull: true
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

Message.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });
User.hasMany(Message, { foreignKey: 'senderId' });

Message.belongsTo(Community, { foreignKey: 'communityId', as: 'community' });
Community.hasMany(Message, { foreignKey: 'communityId' });

Message.belongsTo(User, { foreignKey: 'receiverId', as: 'receiver' });

DMRequest.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });
DMRequest.belongsTo(User, { foreignKey: 'receiverId', as: 'receiver' });

module.exports = {
  sequelize,
  User,
  Community,
  Membership,
  Message,
  DMRequest
};
