import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import EmojiPicker from 'emoji-picker-react';
import { KeyRound, User, ArrowRight, Sparkles, MessageCircle, Hash, Users, Settings, Search, Bell, Send, Paperclip, Smile, MoreVertical, ShieldAlert, FileText, Image as ImageIcon, Plus, Link, LogOut } from 'lucide-react';

const socket = io('http://localhost:3005');

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    try {
      const res = await fetch(`http://localhost:3005${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId, password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[var(--color-canvas)] items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[var(--color-brand)] opacity-10 blur-3xl mix-blend-multiply pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-400 opacity-10 blur-3xl mix-blend-multiply pointer-events-none"></div>

      <div className="card w-full max-w-5xl flex overflow-hidden shadow-2xl z-10 min-h-[600px] border border-[var(--color-border)]/50 bg-white/80 backdrop-blur-xl">
        {/* Left Side: Branding / Marketing */}
        <div className="hidden lg:flex flex-col flex-1 bg-gradient-to-br from-[var(--color-brand)] to-teal-900 text-white p-12 justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-12">
              <Sparkles className="w-8 h-8 text-white" />
              <span className="text-2xl font-bold tracking-tight">EngiNet</span>
            </div>
            <h1 className="text-5xl font-extrabold leading-tight mb-6">
              Connect with<br />the builders.
            </h1>
            <p className="text-teal-100 text-lg max-w-md">
              A private, distraction-free space for engineers, designers, and product people to share ideas and ship faster.
            </p>
          </div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map(i => (
                <img key={i} src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i}&backgroundColor=ffd5dc,d1d4f9,c0aede,b6e3f4,ffdfbf`} alt="avatar" className="w-12 h-12 rounded-full border-2 border-teal-900 bg-white" />
              ))}
            </div>
            <span className="text-sm font-medium text-teal-100">Join 10,000+ professionals</span>
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="flex-1 p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative bg-white">
          <div className="max-w-md w-full mx-auto">
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-2">
                {isLogin ? 'Welcome back' : 'Create your account'}
              </h2>
              <p className="text-[var(--color-secondary)]">
                {isLogin ? 'Enter your credentials to access your communities.' : 'Pick a unique ID and join the network.'}
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium">{error}</div>}
              <div>
                <label className="block text-sm font-semibold text-[var(--color-primary)] mb-2">User ID</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                    placeholder="e.g. hackerman99"
                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[var(--color-primary)] placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-all outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-[var(--color-primary)]">Password</label>
                  {isLogin && <a href="#" className="text-sm font-medium text-[var(--color-brand)] hover:underline">Forgot password?</a>}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <KeyRound className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Min. 6 characters"
                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[var(--color-primary)] placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-all outline-none"
                  />
                </div>
              </div>

              <button disabled={loading} className="w-full flex items-center justify-center gap-2 bg-[var(--color-brand)] hover:bg-teal-600 disabled:opacity-70 text-white font-semibold py-3 px-4 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-teal-500/30">
                <span>{loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}</span>
                {!loading && <ArrowRight className="w-5 h-5" />}
              </button>
            </form>

            <div className="mt-8 text-center text-[var(--color-secondary)]">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-[var(--color-brand)] font-semibold hover:underline"
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [communities, setCommunities] = useState<any[]>([]);
  const [activeCommunity, setActiveCommunity] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDirectChatsMenu, setShowDirectChatsMenu] = useState(false);
  const [newCommName, setNewCommName] = useState('');
  const [newCommDesc, setNewCommDesc] = useState('');
  const [newCommVisibility, setNewCommVisibility] = useState('public');
  const [newCommRetentionMode, setNewCommRetentionMode] = useState('30d');
  const [showMenu, setShowMenu] = useState(false);
  const [attachment, setAttachment] = useState<File | null>(null);
  const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user') || '{}'));
  const [profileName, setProfileName] = useState(user.displayName || user.id);
  const [profileStatus, setProfileStatus] = useState(user.status || 'online');
  const [profileAvatar, setProfileAvatar] = useState(user.avatarId || user.id);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [directChats, setDirectChats] = useState<any[]>([]);
  const [activeDm, setActiveDm] = useState<any>(null);
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const fetchCommunities = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:3005/api/communities', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setCommunities(data);
      if (data.length > 0 && !activeCommunity && !activeDm) {
        setActiveCommunity(data[0]);
      }
    } catch (err) {
      console.error('Error fetching communities', err);
    }
  };

  const fetchDms = async () => {
    const token = localStorage.getItem('token');
    try {
      const resPending = await fetch('http://localhost:3005/api/dms/pending', { headers: { 'Authorization': `Bearer ${token}` } });
      setPendingRequests(await resPending.json());
      const resDms = await fetch('http://localhost:3005/api/dms', { headers: { 'Authorization': `Bearer ${token}` } });
      setDirectChats(await resDms.json());
    } catch (err) {
      console.error('Error fetching dms', err);
    }
  };

  const acceptRequest = async (requestId: string) => {
    const token = localStorage.getItem('token');
    try {
      await fetch('http://localhost:3005/api/dms/accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ requestId })
      });
      fetchDms();
    } catch (err) {
      console.error('Error accepting request', err);
    }
  };

  useEffect(() => {
    fetchCommunities();
    fetchDms();
  }, []);

  const handleCreateCommunity = async () => {
    if (!newCommName.trim()) return;
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:3005/api/communities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: newCommName, description: newCommDesc, visibility: newCommVisibility, retentionMode: newCommRetentionMode })
      });
      const data = await res.json();
      setShowCreateModal(false);
      setNewCommName('');
      setNewCommDesc('');
      setNewCommVisibility('public');
      setNewCommRetentionMode('30d');
      await fetchCommunities();
      setActiveCommunity(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user && user.id) {
      communities.forEach(c => socket.emit('join_community', c.id));
      directChats.forEach(dm => {
        const partnerId = dm.sender?.id === user.id ? dm.receiver?.id : dm.sender?.id;
        const roomId = [user.id, partnerId].sort().join('_');
        socket.emit('join_community', roomId);
      });
    }
  }, [communities, directChats, user]);

  useEffect(() => {
    const handleReceiveMessage = (msg: any) => {
      const activeRoomId = activeCommunity ? activeCommunity.id : (activeDm ? [user.id, activeDm.sender?.id === user.id ? activeDm.receiver?.id : activeDm.sender?.id].sort().join('_') : null);

      if (msg.communityId === activeRoomId) {
        setMessages(prev => [...prev, msg]);
        setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
      } else {
        setUnreadCounts(prev => ({
          ...prev,
          [msg.communityId]: (prev[msg.communityId] || 0) + 1
        }));
      }
    };

    socket.on('receive_message', handleReceiveMessage);
    return () => {
      socket.off('receive_message', handleReceiveMessage);
    };
  }, [activeCommunity, activeDm, user.id]);

  useEffect(() => {
    if (!activeCommunity && !activeDm) return;

    // For MVP, we will treat DM as joining a special room composed of both IDs sorted
    const roomId = activeCommunity ? activeCommunity.id : [user.id, activeDm.sender?.id === user.id ? activeDm.receiver?.id : activeDm.sender?.id].sort().join('_');

    const fetchMessages = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(`http://localhost:3005/api/communities/${roomId}/messages`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setMessages(data);
        setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
      } catch (err) {
        console.error('Error fetching messages', err);
      }
    };
    const fetchMembers = async () => {
      if (!activeCommunity) return; // skip for DMs
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(`http://localhost:3005/api/communities/${activeCommunity.id}/members`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setMembers(data);
      } catch (err) {
        console.error('Error fetching members', err);
      }
    };

    fetchMessages();
    fetchMembers();
  }, [activeCommunity, activeDm]);

  const requestDm = async (receiverId: string) => {
    const token = localStorage.getItem('token');
    await fetch('http://localhost:3005/api/dms/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ receiverId })
    });
    alert('DM Request Sent!');
  };

  const handleSendMessage = async () => {
    if ((!inputMessage.trim() && !attachment) || (!activeCommunity && !activeDm)) return;

    let attachmentUrl = '';
    let attachmentType = '';
    if (attachment) {
      const formData = new FormData();
      formData.append('file', attachment);
      const res = await fetch('http://localhost:3005/api/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: formData
      });
      const data = await res.json();
      attachmentUrl = data.url;
      attachmentType = data.type;
    }

    const roomId = activeCommunity ? activeCommunity.id : [user.id, activeDm.sender?.id === user.id ? activeDm.receiver?.id : activeDm.sender?.id].sort().join('_');
    socket.emit('send_message', {
      text: inputMessage,
      senderId: user.id,
      communityId: roomId,
      retentionMode: activeCommunity ? (activeCommunity.retentionMode || '30d') : '30d',
      attachmentUrl,
      attachmentType
    });
    setInputMessage('');
    setAttachment(null);
    setShowEmoji(false);
  };

  const handleSaveProfile = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:3005/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ displayName: profileName, status: profileStatus, avatarId: profileAvatar })
      });
      if (res.ok) {
        const updatedUser = await res.json();
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setShowProfileModal(false);
      }
    } catch (err) {
      console.error('Error saving profile', err);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[var(--color-canvas)] text-[var(--color-primary)] font-sans overflow-hidden">

      {/* 1. Icon Rail (Far Left) */}
      <div className="w-[72px] bg-white border-r border-gray-200 flex flex-col items-center py-6 shadow-sm z-20 flex-shrink-0">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center mb-8 shadow-md shadow-teal-500/20 text-white cursor-pointer hover:scale-105 transition-transform">
          <Sparkles className="w-6 h-6" />
        </div>

        <div className="flex flex-col gap-6 flex-1 w-full items-center relative">
          <button onClick={() => setShowDirectChatsMenu(!showDirectChatsMenu)} className={`p-3 rounded-xl transition-colors relative group ${showDirectChatsMenu ? 'bg-teal-50 text-teal-600' : 'bg-gray-50 text-gray-400 hover:bg-teal-50 hover:text-teal-600'}`}>
            <MessageCircle className="w-6 h-6" />
          </button>
          
          {showDirectChatsMenu && (
            <div className="absolute left-16 top-0 bg-white shadow-xl rounded-xl border border-gray-100 w-72 overflow-hidden z-50 animate-in slide-in-from-left-2 fade-in">
              <div className="p-4 border-b border-gray-50 flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-800">Direct Chats</h3>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-semibold">{directChats.length}</span>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {directChats.length === 0 ? (
                  <div className="p-6 text-center text-xs text-gray-400">No active direct chats.</div>
                ) : (
                  directChats.map(dm => {
                    const partner = dm.senderId === user.id ? dm.receiver : dm.sender;
                    return (
                      <div 
                        key={dm.id} 
                        onClick={() => { setActiveDm(dm); setActiveCommunity(null); setShowDirectChatsMenu(false); }}
                        className="p-3 border-b border-gray-50 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="relative">
                            <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${partner.id}&backgroundColor=ffd5dc,d1d4f9,c0aede,b6e3f4,ffdfbf`} className="w-8 h-8 rounded-full border border-gray-200" />
                            <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${!partner.status || partner.status === 'online' ? 'bg-green-500' : partner.status === 'away' ? 'bg-yellow-500' : partner.status === 'dnd' ? 'bg-red-500' : 'bg-gray-400'}`}></span>
                          </div>
                          <span className="text-sm font-semibold text-gray-800 truncate">{partner.displayName}</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
          
          <button onClick={() => setShowCreateModal(true)} className="p-3 rounded-xl bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-teal-600 transition-colors group relative">
            <Plus className="w-6 h-6" />
            <div className="absolute left-14 bg-black text-white text-xs px-2 py-1 rounded hidden group-hover:block whitespace-nowrap z-50">Create Community</div>
          </button>
        </div>

        <div className="flex flex-col gap-4 w-full items-center relative">
          {showSettings && (
            <div className="absolute bottom-16 left-16 bg-white shadow-xl rounded-xl border border-gray-100 w-48 overflow-hidden z-50 animate-in slide-in-from-bottom-2 fade-in">
              <div className="p-4 border-b border-gray-50 flex items-center gap-3">
                <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user.avatarId || user.id}&backgroundColor=ffd5dc,d1d4f9,c0aede,b6e3f4,ffdfbf`} className="w-10 h-10 rounded-full border border-gray-200" />
                <div className="min-w-0">
                  <div className="text-sm font-semibold truncate text-gray-800">{user.displayName || user.id}</div>
                  <div className="text-xs text-gray-500 capitalize">{user.status || 'online'}</div>
                </div>
              </div>
              <button onClick={() => { setShowSettings(false); setShowProfileModal(true); }} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium border-b border-gray-50">
                Edit Profile
              </button>
              <button onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/auth');
              }} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium">
                Log Out
              </button>
            </div>
          )}
          <button onClick={() => { setShowSettings(!showSettings); setIsEditingProfile(false); }} className={`p-3 rounded-xl transition-colors ${showSettings ? 'bg-gray-100 text-gray-800' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'}`}>
            <Settings className="w-6 h-6" />
          </button>
          <div onClick={() => { setShowSettings(!showSettings); setIsEditingProfile(false); }} className="relative mt-2 cursor-pointer hover:scale-105 transition-transform">
            <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user.avatarId || user.id}&backgroundColor=ffd5dc,d1d4f9,c0aede,b6e3f4,ffdfbf`} alt="profile" className="w-10 h-10 rounded-full border border-gray-200" />
            <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${user.status === 'online' || !user.status ? 'bg-green-500' : user.status === 'away' ? 'bg-yellow-500' : user.status === 'dnd' ? 'bg-red-500' : 'bg-gray-400'}`}></span>
          </div>
        </div>
      </div>

      {/* 2. List Panel (Chats & Communities) */}
      <div className="w-80 bg-[#f8fafc] border-r border-gray-200 flex flex-col flex-shrink-0 z-10">
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold tracking-tight text-gray-800">Messages</h2>
            <button className="p-2 rounded-full hover:bg-gray-200 text-gray-500 transition-colors">
              <Sparkles className="w-5 h-5" />
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search chats..."
              className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-6">
          {/* Section: Pending DMs */}
          {pendingRequests.length > 0 && (
            <div className="mt-8 mb-4">
              <div className="text-xs font-semibold text-teal-600 uppercase tracking-wider px-2 mb-2 flex items-center gap-2">
                <Bell className="w-3.5 h-3.5" /> Pending Requests
              </div>
              <div className="space-y-2">
                {pendingRequests.map(req => (
                  <div key={req.id} className="flex items-center justify-between gap-2 p-3 bg-white shadow-sm border border-teal-100 rounded-xl">
                    <div className="flex items-center gap-2">
                      <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${req.sender.id}&backgroundColor=ffd5dc,d1d4f9,c0aede,b6e3f4,ffdfbf`} className="w-6 h-6 rounded-full" />
                      <span className="text-sm font-semibold truncate text-gray-800">{req.sender.displayName}</span>
                    </div>
                    <button onClick={() => acceptRequest(req.id)} className="bg-teal-500 hover:bg-teal-600 text-white text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors shadow-sm">Accept</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-8 mb-4">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2">Your Communities</h2>
            <span className="bg-gray-200 text-gray-500 text-[10px] px-1.5 py-0.5 rounded-md">{communities.length}</span>
          </div>
          <div className="space-y-1">
            {communities.map((comm, i) => (
              <div
                key={comm.id}
                onClick={() => { setActiveCommunity(comm); setActiveDm(null); setUnreadCounts(prev => ({ ...prev, [comm.id]: 0 })); }}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${activeCommunity?.id === comm.id ? 'bg-white shadow-sm border border-gray-100' : 'hover:bg-gray-100/50 text-gray-600'}`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm bg-indigo-500 relative`}>
                  <Hash className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate flex items-center justify-between">
                    {comm.name}
                    {unreadCounts[comm.id] > 0 && (
                      <span className="bg-teal-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                        {unreadCounts[comm.id]}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-400 truncate">Tap to open</div>
                </div>
              </div>
            ))}
          </div>

          {/* Section: Direct Chats */}
          <div className="mt-8">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">Direct Chats</div>
            <div className="space-y-1">
              {directChats.length === 0 ? (
                <div className="text-xs text-gray-400 px-2 italic">No active direct chats.</div>
              ) : (
                Array.from(new Map(directChats.map(dm => {
                  const partner = dm.sender?.id === user.id ? dm.receiver : dm.sender;
                  return [partner?.id, { dm, partner }];
                })).values()).map(({ dm, partner }) => {
                  const dmRoomId = [user.id, partner.id].sort().join('_');
                  return (
                    <div
                      key={dm.id}
                      onClick={() => { setActiveDm(dm); setActiveCommunity(null); setUnreadCounts(prev => ({ ...prev, [dmRoomId]: 0 })); }}
                      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${activeDm?.id === dm.id ? 'bg-white shadow-sm border border-gray-100' : 'hover:bg-gray-100/50 text-gray-600'}`}
                    >
                      <div className="relative">
                        <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${partner.id}&backgroundColor=ffd5dc,d1d4f9,c0aede,b6e3f4,ffdfbf`} alt={partner.displayName} className="w-10 h-10 rounded-full border border-gray-200" />
                        <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${!partner.status || partner.status === 'online' ? 'bg-green-500' : partner.status === 'away' ? 'bg-yellow-500' : partner.status === 'dnd' ? 'bg-red-500' : 'bg-gray-400'}`}></span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-gray-800 truncate flex items-center justify-between">
                          {partner.displayName}
                          {unreadCounts[dmRoomId] > 0 && (
                            <span className="bg-teal-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                              {unreadCounts[dmRoomId]}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Conversation Panel (Center) */}
      <div className="flex-1 flex flex-col bg-white relative shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.05)] z-20">
        {/* Top Header */}
        <div className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-6 z-10 sticky top-0 flex-shrink-0">
          <div>
            <h1 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              {activeCommunity ? activeCommunity.name : (activeDm ? (activeDm.sender?.id === user.id ? activeDm.receiver?.displayName : activeDm.sender?.displayName) : 'Select a chat')}
            </h1>
            <div className="flex items-center gap-3 text-sm text-gray-500 mt-0.5">
              {activeCommunity && <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> Members</span>}
              {activeCommunity && <span className="w-1 h-1 rounded-full bg-gray-300"></span>}
              <span className="text-teal-600 font-medium bg-teal-50 px-2 py-0.5 rounded-md flex items-center gap-1 text-xs">
                <ShieldAlert className="w-3 h-3" /> Messages: {activeCommunity?.retentionMode === '24h' ? '24 hours' : '30 days'}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <button onClick={() => setShowMenu(!showMenu)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
              {showMenu && (
                <div className="absolute right-0 top-12 w-48 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden z-50">
                  <div className="py-1">
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Community Link Copied!');
                        setShowMenu(false);
                      }} 
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
                    >
                      <Link className="w-4 h-4 text-gray-400" />
                      Share Link
                    </button>
                    <button 
                      onClick={() => {
                        alert('You left the community.');
                        setShowMenu(false);
                        setActiveCommunity(null);
                      }} 
                      className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4 text-red-400" />
                      Leave Community
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#fcfcfd]">
          {messages.map((msg, i) => {
            const senderId = msg.senderId || msg.sender?.id;
            const isMine = senderId === user.id;
            const msgDate = new Date(msg.createdAt);
            const prevMsgDate = i > 0 ? new Date(messages[i - 1].createdAt) : null;

            let showDateSeparator = false;
            let dateString = '';

            if (!prevMsgDate || msgDate.toDateString() !== prevMsgDate.toDateString()) {
              showDateSeparator = true;
              const today = new Date();
              const yesterday = new Date(today);
              yesterday.setDate(yesterday.getDate() - 1);

              if (msgDate.toDateString() === today.toDateString()) {
                dateString = 'Today';
              } else if (msgDate.toDateString() === yesterday.toDateString()) {
                dateString = 'Yesterday';
              } else {
                dateString = msgDate.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
              }
            }

            return (
              <React.Fragment key={msg.id}>
                {showDateSeparator && (
                  <div className="flex justify-center my-4">
                    <span className="bg-gray-200/70 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                      {dateString}
                    </span>
                  </div>
                )}
                <div className={`flex gap-4 max-w-[80%] ${isMine ? 'flex-row-reverse self-end ml-auto' : ''}`}>
                  <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${senderId}&backgroundColor=ffd5dc,d1d4f9,c0aede,b6e3f4,ffdfbf`} alt={senderId} className={`w-10 h-10 rounded-full border mt-1 ${isMine ? 'border-teal-100' : 'border-gray-200'}`} />
                  <div className={`flex flex-col ${isMine ? 'items-end' : ''}`}>
                    <div className={`flex items-baseline gap-2 mb-1.5 ${isMine ? 'mr-1' : 'ml-1'}`}>
                      {isMine && <span className="text-xs text-gray-400 font-medium">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>}
                      <span className="font-semibold text-sm text-gray-800">{isMine ? 'You' : msg.sender?.displayName || senderId}</span>
                      {!isMine && <span className="text-xs text-gray-400 font-medium">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>}
                    </div>
                    <div className={`p-4 rounded-2xl shadow-sm text-[15px] leading-relaxed inline-block ${isMine ? 'bg-gradient-to-br from-teal-500 to-teal-600 rounded-tr-none text-white shadow-teal-500/20' : 'bg-white border border-gray-100 rounded-tl-none text-gray-700'}`}>
                      {msg.attachmentUrl && msg.attachmentType === 'image' && (
                        <img src={msg.attachmentUrl} alt="attachment" className="max-w-xs rounded-lg mb-2 border border-black/10" />
                      )}
                      {msg.attachmentUrl && msg.attachmentType === 'file' && (
                        <a href={msg.attachmentUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-black/10 p-2 rounded-lg mb-2 text-sm font-medium hover:bg-black/20 transition-colors">
                          <FileText className="w-4 h-4" /> Download Attachment
                        </a>
                      )}
                      {msg.text}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Composer */}
        <div className="p-4 bg-white border-t border-gray-100 z-10 relative">

          {showEmoji && (
            <div className="absolute bottom-20 right-16 shadow-2xl rounded-2xl overflow-hidden border border-gray-100 animate-in slide-in-from-bottom-4">
              <EmojiPicker
                onEmojiClick={(e) => setInputMessage(prev => prev + e.emoji)}
                lazyLoadEmojis={true}
              />
            </div>
          )}

          {attachment && (
            <div className="mb-2 p-2 bg-teal-50 text-teal-700 text-sm font-medium rounded-lg flex items-center justify-between border border-teal-100">
              <span className="flex items-center gap-2"><Paperclip className="w-4 h-4" /> Attached: {attachment.name}</span>
              <button onClick={() => setAttachment(null)} className="text-teal-600 hover:text-red-500 font-bold px-2">&times;</button>
            </div>
          )}

          <div className="bg-[#f8fafc] border border-gray-200 rounded-2xl flex items-end p-1 shadow-sm focus-within:ring-2 focus-within:ring-teal-500/20 focus-within:border-teal-400 transition-all">
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => e.target.files && setAttachment(e.target.files[0])}
              className="hidden"
            />
            <div className="flex gap-1 pb-1 pl-1">
              <button onClick={() => fileInputRef.current?.click()} className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
            </div>

            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
              placeholder={`Message ${activeCommunity?.name || 'Community'}...`}
              className="flex-1 bg-transparent border-none focus:ring-0 resize-none py-3 px-2 max-h-32 text-[15px] placeholder-gray-400 outline-none"
              rows={1}
            />

            <div className="flex gap-2 pb-1 pr-1">
              <button onClick={() => setShowEmoji(!showEmoji)} className={`p-2 rounded-xl transition-colors ${showEmoji ? 'text-amber-500 bg-amber-50' : 'text-gray-400 hover:text-amber-500 hover:bg-amber-50'}`}>
                <Smile className="w-5 h-5" />
              </button>
              <button onClick={handleSendMessage} className="p-3 bg-teal-500 hover:bg-teal-600 text-white rounded-xl shadow-md shadow-teal-500/30 transition-all active:scale-95 disabled:opacity-50" disabled={!inputMessage.trim() && !attachment}>
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="text-center mt-2">
            <span className="text-[10px] text-gray-400 font-medium">Messages in this chat disappear after 30 days</span>
          </div>
        </div>
      </div>

      {/* 4. Context Panel (Right) */}
      <div className="w-[300px] bg-[#f8fafc] border-l border-gray-200 flex flex-col flex-shrink-0 overflow-y-auto hidden xl:flex z-10">
        <div className="p-6">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-6">Community Details</h3>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500 flex items-center justify-center text-white mx-auto mb-4 shadow-md shadow-indigo-500/20">
              <Hash className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-gray-800 text-lg mb-1">{activeCommunity?.name}</h4>
            <p className="text-xs text-gray-500">Created {activeCommunity?.createdAt ? new Date(activeCommunity.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }) : 'recently'}</p>
            <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-600 leading-relaxed">
              Main discussion channel for {activeCommunity?.name}. Welcome to the community!
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-1 flex items-center justify-between">
              Members
              <span className="text-gray-500 text-[10px]">{members.length}</span>
            </h3>
            <div className="space-y-2">
              {members.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-100/80 cursor-pointer transition-colors group">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="relative flex-shrink-0">
                      <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${member.id}&backgroundColor=ffd5dc,d1d4f9,c0aede,b6e3f4,ffdfbf`} alt={member.displayName} className="w-8 h-8 rounded-full border border-gray-200" />
                      <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#f8fafc] ${!member.status || member.status === 'online' ? 'bg-green-500' : member.status === 'away' ? 'bg-yellow-500' : member.status === 'dnd' ? 'bg-red-500' : 'bg-gray-400'}`}></span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-gray-800 truncate">{member.displayName} {member.id === user.id && '(You)'}</div>
                    </div>
                  </div>
                  {member.id !== user.id && (
                    <button onClick={(e) => { e.stopPropagation(); requestDm(member.id); }} className="text-xs text-teal-600 font-semibold px-2 py-1 rounded bg-teal-50 hover:bg-teal-100 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Message
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Shared files removed by request */}

        </div>
      </div>

      {/* Edit Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"><User className="w-5 h-5 text-teal-500"/> Edit Profile</h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Display Name</label>
                <input type="text" value={profileName} onChange={e => setProfileName(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all outline-none" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Select Avatar</label>
                <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-3 max-h-64 overflow-y-auto p-4 border border-gray-200 rounded-xl bg-gray-50">
                  {Array.from({ length: 60 }, (_, i) => `avatar-${i + 1}`).map(seed => (
                    <div 
                      key={seed} 
                      onClick={() => setProfileAvatar(seed)}
                      className={`cursor-pointer rounded-full p-1 border-2 transition-all ${profileAvatar === seed ? 'border-teal-500 scale-110 shadow-md bg-white' : 'border-transparent hover:border-teal-300 hover:bg-white'}`}
                    >
                      <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${seed}&backgroundColor=ffd5dc,d1d4f9,c0aede,b6e3f4,ffdfbf`} alt={seed} className="w-full aspect-square rounded-full bg-white" />
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-gray-400 mt-2">60 unique colored avatars available.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Status</label>
                <select value={profileStatus} onChange={e => setProfileStatus(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all outline-none">
                  <option value="online">Online</option>
                  <option value="away">Away</option>
                  <option value="dnd">Do Not Disturb</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 justify-end mt-8">
              <button onClick={() => setShowProfileModal(false)} className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">Cancel</button>
              <button onClick={handleSaveProfile} className="px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-teal-500/20 transition-all active:scale-95">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Create Community Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><Hash className="w-5 h-5 text-teal-500" /> Create Community</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Community Name</label>
                <input
                  type="text"
                  value={newCommName}
                  onChange={e => setNewCommName(e.target.value)}
                  placeholder="e.g. Design System Team"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Description</label>
                <textarea
                  value={newCommDesc}
                  onChange={e => setNewCommDesc(e.target.value)}
                  placeholder="What is this community for?"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all outline-none resize-none"
                  rows={2}
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Server Type</label>
                  <select
                    value={newCommVisibility}
                    onChange={e => setNewCommVisibility(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all outline-none"
                  >
                    <option value="public">Club / Community (Public)</option>
                    <option value="private">Me and my friends (Private)</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Message Retention</label>
                  <select
                    value={newCommRetentionMode}
                    onChange={e => setNewCommRetentionMode(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all outline-none"
                  >
                    <option value="30d">30 Days</option>
                    <option value="24h">24 Hours</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-3 justify-end mt-8">
              <button onClick={() => setShowCreateModal(false)} className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">Cancel</button>
              <button onClick={handleCreateCommunity} disabled={!newCommName.trim()} className="px-5 py-2.5 bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white text-sm font-semibold rounded-xl shadow-md shadow-teal-500/20 transition-all active:scale-95">Create</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthScreen />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </Router>
  );
}

export default App;
