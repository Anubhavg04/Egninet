const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { sequelize, User, Community, Membership, Message, DMRequest } = require('./database');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

// Seed default communities
const seedCommunities = async () => {
  const defaults = ['Engineering', 'Design', 'Product'];
  for (const name of defaults) {
    const existing = await Community.findOne({ where: { name } });
    if (!existing) {
      await Community.create({ name, description: `Default ${name} Community` });
    }
  }
};

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
  fs.mkdirSync(path.join(__dirname, 'uploads'));
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
});
const upload = multer({ storage: storage });

const JWT_SECRET = 'supersecret_enginet_key'; // in real app, use env var

// --- AUTH MIDDLEWARE ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// --- ROUTES ---

// Auth
app.post('/api/auth/register', async (req, res) => {
  try {
    const { id, password } = req.body;
    if (!id || !password || password.length < 6) {
      return res.status(400).json({ error: 'Invalid ID or password (min 6 chars).' });
    }

    const existingUser = await User.findByPk(id);
    if (existingUser) {
      return res.status(400).json({ error: 'User ID already taken.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      id,
      passwordHash,
      displayName: id, // Default to ID
    });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, displayName: user.displayName, avatarId: user.avatarId, status: user.status } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { id, password } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(400).json({ error: 'User not found.' });
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid password.' });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, displayName: user.displayName, avatarId: user.avatarId, status: user.status } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/users/profile', authenticateToken, async (req, res) => {
  try {
    const { displayName, avatarId, status } = req.body;
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    if (displayName) user.displayName = displayName;
    if (avatarId) user.avatarId = avatarId;
    if (status) user.status = status;
    
    await user.save();
    res.json({ id: user.id, displayName: user.displayName, avatarId: user.avatarId, status: user.status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Communities
app.get('/api/communities', authenticateToken, async (req, res) => {
  try {
    const communities = await Community.findAll();
    res.json(communities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/communities', authenticateToken, async (req, res) => {
  try {
    const { name, description, retentionMode, visibility } = req.body;
    const inviteCode = Math.random().toString(36).substring(2, 8);
    const comm = await Community.create({ 
      name, 
      description, 
      retentionMode, 
      visibility,
      ownerId: req.user.id,
      inviteCode
    });
    // Add owner as a member
    await Membership.create({
      CommunityId: comm.id,
      UserId: req.user.id,
      role: 'owner'
    });
    res.json(comm);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/communities/:id/messages', authenticateToken, async (req, res) => {
  try {
    const messages = await Message.findAll({
      where: { communityId: req.params.id },
      include: [{ model: User, as: 'sender', attributes: ['id', 'displayName', 'avatarId', 'status'] }],
      order: [['createdAt', 'ASC']]
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/communities/:id/members', authenticateToken, async (req, res) => {
  try {
    // Return all users for MVP
    const users = await User.findAll({ attributes: ['id', 'displayName', 'avatarId', 'status'] });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/upload', authenticateToken, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const fileUrl = `http://localhost:3005/uploads/${req.file.filename}`;
  res.json({ url: fileUrl, type: req.file.mimetype.startsWith('image/') ? 'image' : 'file', filename: req.file.originalname });
});

// DMs
app.post('/api/dms/request', authenticateToken, async (req, res) => {
  try {
    const { receiverId } = req.body;
    const reqObj = await DMRequest.create({ senderId: req.user.id, receiverId });
    res.json(reqObj);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/dms/pending', authenticateToken, async (req, res) => {
  try {
    const reqs = await DMRequest.findAll({
      where: { receiverId: req.user.id, status: 'pending' },
      include: [{ model: User, as: 'sender', attributes: ['id', 'displayName', 'avatarId'] }]
    });
    res.json(reqs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/dms/accept', authenticateToken, async (req, res) => {
  try {
    const { requestId } = req.body;
    const reqObj = await DMRequest.findByPk(requestId);
    if (reqObj && reqObj.receiverId === req.user.id) {
      reqObj.status = 'accepted';
      await reqObj.save();
      res.json(reqObj);
    } else {
      res.status(404).json({ error: 'Request not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/dms', authenticateToken, async (req, res) => {
  try {
    // Get all accepted DMs
    const reqs = await DMRequest.findAll({
      where: { status: 'accepted' },
      include: [
        { model: User, as: 'sender', attributes: ['id', 'displayName'] },
        { model: User, as: 'receiver', attributes: ['id', 'displayName'] }
      ]
    });
    // Filter to only those involving the current user
    const userDms = reqs.filter(r => r.senderId === req.user.id || r.receiverId === req.user.id);
    res.json(userDms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Socket.IO Logic
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join_community', (communityId) => {
    socket.join(communityId);
    console.log(`Socket ${socket.id} joined ${communityId}`);
  });

  socket.on('send_message', async (data) => {
    try {
      const { text, senderId, communityId, retentionMode, attachmentUrl, attachmentType } = data;
      let expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30);

      if (retentionMode === '24h') {
        expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 24);
      }

      const msg = await Message.create({ text, senderId, communityId, expiresAt, attachmentUrl, attachmentType });
      const fullMsg = await Message.findByPk(msg.id, {
        include: [{ model: User, as: 'sender', attributes: ['id', 'displayName', 'avatarId', 'status'] }]
      });

      io.to(communityId).emit('receive_message', fullMsg);
    } catch (err) {
      console.error(err);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3005;

sequelize.sync().then(async () => {
  console.log('Database synced');
  await seedCommunities();
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to sync database:', err);
});
