import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CodeBracketIcon, 
  PaintBrushIcon, 
  CubeTransparentIcon, 
  CommandLineIcon, 
  CpuChipIcon, 
  BeakerIcon, 
  WrenchScrewdriverIcon, 
  SwatchIcon,
  SparklesIcon
} from '@heroicons/react/24/solid';
import { PencilIcon as PenTool, EyeSlashIcon, EyeIcon } from '@heroicons/react/24/outline';

const EngiNetLogo = ({ className, interactive = false }: { className?: string, interactive?: boolean }) => (
  <svg className={`${className} ${interactive ? 'hover:rotate-180 transition-transform duration-700 cursor-pointer' : ''}`} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 8H12C9.79086 8 8 9.79086 8 12V20C8 22.2091 9.79086 24 12 24H22" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 16H18" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <circle cx="24" cy="8" r="4" fill="currentColor" />
    <circle cx="21" cy="16" r="4" fill="currentColor" />
    <circle cx="24" cy="24" r="4" fill="currentColor" />
  </svg>
);

const Landing = () => {
  const [scrollY, setScrollY] = useState(0);
  const [focusMode, setFocusMode] = useState(false);
  const [ctaInput, setCtaInput] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const navigate = useNavigate();

  const handleDeploy = () => {
    if (!ctaInput.trim() || isDeploying) return;
    setIsDeploying(true);
    setTimeout(() => {
      navigate('/auth');
    }, 1500);
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen font-sans transition-colors duration-1000 overflow-x-hidden ${focusMode ? 'bg-[#050505] text-gray-400' : 'bg-white text-gray-800'} selection:bg-teal-500 selection:text-white`}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrollY > 50 ? (focusMode ? 'bg-[#050505]/95 border-b border-gray-900' : 'bg-[#0D9488]/95') : 'bg-transparent'} backdrop-blur-md shadow-lg py-3`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-white hover:opacity-90 transition-opacity">
            <EngiNetLogo className="w-8 h-8" interactive={true} />
            <span className="text-xl font-bold tracking-tight" style={{ fontFamily: "'Righteous', system-ui, cursive" }}>EngiNet</span>
          </Link>
          
          <div className={`hidden md:flex items-center gap-8 font-semibold text-[15px] transition-colors duration-700 ${focusMode ? 'text-gray-500' : 'text-white'}`}>
            <a href="#features" className="hover:text-teal-400 transition-colors">Features</a>
            <a href="#focus" className="hover:text-teal-400 transition-colors">Focus Mode</a>
            <a href="#safety" className="hover:text-teal-400 transition-colors">Safety</a>
            <a href="#support" className="hover:text-teal-400 transition-colors">Support</a>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setFocusMode(!focusMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all duration-500 border ${focusMode ? 'border-teal-900/50 text-teal-500 hover:bg-teal-900/20' : 'border-white/20 text-white hover:bg-white/10'}`}
              title="Toggle Focus Mode"
            >
              {focusMode ? <EyeIcon className="w-4 h-4" /> : <EyeSlashIcon className="w-4 h-4" />}
              <span className="hidden sm:inline">{focusMode ? 'Exit Focus' : 'Focus Mode'}</span>
            </button>
            <Link 
              to="/auth" 
              className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-sm hover:shadow-md ${focusMode ? 'bg-gray-900 text-teal-500 border border-gray-800 hover:bg-gray-800' : 'bg-white text-teal-800 hover:bg-teal-50'}`}
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={`relative pt-32 pb-24 md:pt-48 md:pb-32 transition-colors duration-1000 ${focusMode ? 'bg-[#050505]' : 'bg-[#0D9488]'} overflow-hidden flex flex-col items-center justify-center text-center px-4`}>
        {/* Animated Background Mesh */}
        <div className={`absolute inset-0 mix-blend-color-burn transition-opacity duration-1000 ${focusMode ? 'opacity-0' : 'opacity-30'}`}>
           <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-teal-400 blur-3xl animate-pulse"></div>
           <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Floating Icons Background */}
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${focusMode ? 'opacity-0' : 'opacity-20'}`}>
          <CodeBracketIcon className="absolute top-[15%] left-[8%] w-16 h-16 text-white rotate-12 animate-pulse" />
          <PaintBrushIcon className="absolute top-[20%] right-[12%] w-20 h-20 text-white -rotate-12 animate-bounce" style={{ animationDuration: '3s' }} />
          <CubeTransparentIcon className="absolute bottom-[25%] left-[10%] w-24 h-24 text-white rotate-45 opacity-60" />
          <CommandLineIcon className="absolute bottom-[15%] right-[20%] w-16 h-16 text-white -rotate-6 animate-pulse" style={{ animationDuration: '4s' }} />
          <CpuChipIcon className="absolute top-[45%] left-[2%] w-12 h-12 text-white rotate-90" />
          <BeakerIcon className="absolute top-[10%] right-[30%] w-14 h-14 text-white rotate-12 opacity-70" />
          <WrenchScrewdriverIcon className="absolute bottom-[40%] right-[5%] w-20 h-20 text-white -rotate-45" />
          <SwatchIcon className="absolute top-[60%] left-[25%] w-16 h-16 text-white rotate-12 animate-bounce" style={{ animationDuration: '5s' }} />
        </div>

        <div className={`relative z-10 max-w-5xl mx-auto transform transition-all duration-1000 hover:scale-[1.01] ${focusMode ? 'opacity-80' : 'opacity-100'}`}>
          <h1 className={`text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter mb-8 drop-shadow-xl transition-colors duration-1000 ${focusMode ? 'text-gray-200' : 'text-white'}`} style={{ fontFamily: "'Righteous', system-ui, cursive" }}>
            IMAGINE A WORKSPACE...
          </h1>
          <p className={`text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-12 font-medium drop-shadow-md transition-colors duration-1000 ${focusMode ? 'text-gray-500' : 'text-teal-50'}`}>
            ...where you can belong to a developer club, a study group, or just a private community to ship your ideas. Where it's easy to talk every day and hang out more often.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              to="/auth" 
              className={`px-8 py-4 rounded-full font-bold text-lg transition-all w-full sm:w-auto flex items-center justify-center gap-3 animate-pulse-glow hover:scale-105 ${focusMode ? 'bg-gray-900 text-teal-400 border border-teal-900/50 hover:bg-gray-800' : 'bg-white text-gray-900 hover:bg-gray-50'}`}
            >
              Open EngiNet in your browser
              <SparklesIcon className="w-5 h-5 text-teal-500" />
            </Link>
          </div>
        </div>
        
        {/* Wavy bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none">
          <svg className={`relative block w-full h-[50px] md:h-[100px] transition-colors duration-1000 ${focusMode ? 'fill-[#050505]' : 'fill-[#eef1f5]'}`} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,121.32,201.2,111.45,242.09,105.74,282.8,92.21,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* Bento Box Feature Highlights */}
      <section className={`py-24 px-6 relative z-20 transition-colors duration-1000 ${focusMode ? 'bg-[#050505]' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-5xl font-black tracking-tight mb-4 transition-colors duration-1000 ${focusMode ? 'text-white' : 'text-gray-900'}`}>
              Built for <span className="text-teal-500">Engineering Velocity</span>
            </h2>
            <p className={`text-lg md:text-xl max-w-2xl mx-auto transition-colors duration-1000 ${focusMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Not just another chat app. EngiNet is packed with features designed specifically to remove friction from your development workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[auto] md:auto-rows-[250px]">
            {/* Tile 1: Executable Code Blocks (Span 2) */}
            <div className={`col-span-1 md:col-span-2 row-span-1 rounded-3xl overflow-hidden relative group transition-all duration-500 hover:-translate-y-1 shadow-lg ${focusMode ? 'bg-[#0D1117] border border-gray-800' : 'bg-white border border-gray-200'}`}>
               <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
               <div className="p-8 h-full flex flex-col md:flex-row items-center gap-8 relative z-10">
                 <div className="flex-1">
                   <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-500 flex items-center justify-center mb-4"><CommandLineIcon className="w-6 h-6" /></div>
                   <h3 className={`text-2xl font-bold mb-2 ${focusMode ? 'text-white' : 'text-gray-900'}`}>Executable Code Blocks</h3>
                   <p className={`${focusMode ? 'text-gray-400' : 'text-gray-600'}`}>Stop context switching. Paste a snippet and run it directly in the chat to debug together instantly.</p>
                 </div>
                 <div className="flex-1 w-full bg-[#1e1e1e] rounded-xl p-4 font-mono text-sm shadow-inner transform group-hover:scale-105 transition-transform duration-500">
                    <div className="flex items-center justify-between border-b border-gray-700 pb-2 mb-2">
                       <span className="text-gray-400">api_test.js</span>
                       <button className="bg-green-600 hover:bg-green-500 text-white text-xs px-3 py-1 rounded flex items-center gap-1">Run</button>
                    </div>
                    <div className="text-blue-400">fetch<span className="text-white">('/api/users')</span></div>
                    <div className="text-white">  .then(res =&gt; res.<span className="text-blue-400">json</span>())</div>
                    <div className="text-gray-500 mt-2 border-t border-gray-700 pt-2">{'>'} {`{ status: 200, data: [...] }`}</div>
                 </div>
               </div>
            </div>

            {/* Tile 2: Deep Work / Focus Mode */}
            <div className={`col-span-1 row-span-1 rounded-3xl overflow-hidden relative group transition-all duration-500 hover:-translate-y-1 shadow-lg ${focusMode ? 'bg-[#0D1117] border border-gray-800' : 'bg-white border border-gray-200'}`}>
               <div className="p-8 h-full flex flex-col justify-between relative z-10">
                 <div>
                   <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-500 flex items-center justify-center mb-4"><EyeSlashIcon className="w-6 h-6" /></div>
                   <h3 className={`text-xl font-bold mb-2 ${focusMode ? 'text-white' : 'text-gray-900'}`}>Deep Work Mode</h3>
                   <p className={`text-sm ${focusMode ? 'text-gray-400' : 'text-gray-600'}`}>Mute the noise. Let your team know you're in the zone automatically.</p>
                 </div>
                 <div className={`mt-4 rounded-lg p-3 flex items-center gap-3 ${focusMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xs">JD</div>
                    <div>
                       <div className={`text-xs font-bold flex items-center gap-1 ${focusMode ? 'text-white' : 'text-gray-900'}`}>Focusing <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span></div>
                       <div className="text-xs text-gray-500">Working on API Auth</div>
                    </div>
                 </div>
               </div>
            </div>

            {/* Tile 3: AI Summaries */}
            <div className={`col-span-1 row-span-1 rounded-3xl overflow-hidden relative group transition-all duration-500 hover:-translate-y-1 shadow-lg ${focusMode ? 'bg-[#0D1117] border border-gray-800' : 'bg-white border border-gray-200'}`}>
               <div className="p-8 h-full flex flex-col relative z-10">
                 <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-500 flex items-center justify-center mb-4"><SparklesIcon className="w-6 h-6" /></div>
                 <h3 className={`text-xl font-bold mb-2 ${focusMode ? 'text-white' : 'text-gray-900'}`}>AI Thread Summaries</h3>
                 <p className={`text-sm ${focusMode ? 'text-gray-400' : 'text-gray-600'}`}>Catch up instantly. Wake up to 200 messages, click one button to get the 3 key decisions.</p>
               </div>
            </div>

            {/* Tile 4: Ephemeral War Rooms (Span 2) */}
            <div className={`col-span-1 md:col-span-2 row-span-1 rounded-3xl overflow-hidden relative group transition-all duration-500 hover:-translate-y-1 shadow-lg ${focusMode ? 'bg-[#0D1117] border border-gray-800' : 'bg-white border border-gray-200'}`}>
               <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
               <div className="p-8 h-full flex flex-col md:flex-row items-center gap-8 relative z-10">
                 <div className="flex-1">
                   <div className="w-12 h-12 rounded-xl bg-red-500/20 text-red-500 flex items-center justify-center mb-4"><WrenchScrewdriverIcon className="w-6 h-6" /></div>
                   <h3 className={`text-2xl font-bold mb-2 ${focusMode ? 'text-white' : 'text-gray-900'}`}>Ephemeral War Rooms</h3>
                   <p className={`${focusMode ? 'text-gray-400' : 'text-gray-600'}`}>Incident response made easy. Temporary channels that pull in logs, page the on-call, and self-destruct when resolved.</p>
                 </div>
                 <div className="flex-1 w-full flex justify-center relative">
                    <div className="w-full max-w-[200px] h-32 bg-gray-900 rounded-xl border border-red-500/30 flex flex-col p-4 shadow-xl transform md:rotate-3 group-hover:rotate-0 transition-transform duration-500">
                       <div className="flex items-center gap-2 mb-3">
                          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                          <span className="text-red-400 text-xs font-bold uppercase">INCIDENT-404</span>
                       </div>
                       <div className="space-y-2">
                          <div className="w-3/4 h-2 bg-gray-700 rounded"></div>
                          <div className="w-full h-2 bg-gray-700 rounded"></div>
                          <div className="w-1/2 h-2 bg-gray-700 rounded"></div>
                       </div>
                    </div>
                 </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={`py-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col gap-32 transition-all duration-1000 ${focusMode ? 'grayscale' : ''}`}>
        {/* Feature 1 */}
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24 group">
          <div className={`flex-1 w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border transition-transform duration-700 group-hover:-rotate-2 group-hover:scale-105 ${focusMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-100 border-gray-200'}`}>
            <img src="/wallpapers/illustration_cyber_market_1783749875141.png" alt="EngiNet Feature" className={`w-full h-full object-cover ${focusMode ? 'opacity-50' : ''}`} />
          </div>
          <div className="flex-1 transition-all duration-700 group-hover:translate-x-4">
            <h2 className={`text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6 transition-colors duration-1000 ${focusMode ? 'text-gray-300' : 'text-gray-900'}`}>
              Create an invite-only place where you belong
            </h2>
            <p className={`text-lg leading-relaxed transition-colors duration-1000 ${focusMode ? 'text-gray-500' : 'text-gray-600'}`}>
              EngiNet servers are organized into topic-based channels where you can collaborate, share, and just talk about your day without clogging up a group chat.
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-24 group">
          <div className={`flex-1 w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border transition-transform duration-700 group-hover:rotate-2 group-hover:scale-105 ${focusMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-100 border-gray-200'}`}>
             <img src="/wallpapers/designer_abstract_dark_1783750027689.png" alt="EngiNet Hangout" className={`w-full h-full object-cover ${focusMode ? 'opacity-50' : ''}`} />
          </div>
          <div className="flex-1 transition-all duration-700 group-hover:-translate-x-4">
            <h2 className={`text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6 transition-colors duration-1000 ${focusMode ? 'text-gray-300' : 'text-gray-900'}`}>
              Where hanging out is easy
            </h2>
            <p className={`text-lg leading-relaxed transition-colors duration-1000 ${focusMode ? 'text-gray-500' : 'text-gray-600'}`}>
              Grab a seat in a community. Friends in your server can see you're around and instantly pop in to talk without having to call.
            </p>
          </div>
        </div>
      </section>

      {/* Feature 3 - Whiteboard Showcase */}
      <section id="whiteboard" className="relative py-32 md:py-48 mt-12 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/wallpapers/cinematic_scifi_city_1783749487100.png" alt="Collaborative Environment" className="w-full h-full object-cover opacity-40 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
           <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8" style={{ fontFamily: "'Righteous', system-ui, cursive" }}>
              COLLABORATE IN REAL-TIME
           </h2>
           <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-12">
              Visualize your ideas together. Jump into the built-in collaborative whiteboard during any chat to instantly sketch architecture diagrams, UI flows, or just brainstorm with your team.
           </p>
           
           <div className="glass-card rounded-3xl p-4 max-w-4xl mx-auto transform hover:rotate-1 hover:scale-105 transition-all duration-700">
             <div className="aspect-[21/9] bg-white rounded-2xl overflow-hidden flex flex-col shadow-2xl relative">
               {/* Mock Toolbar */}
               <div className="absolute top-4 left-4 right-4 h-12 bg-gray-100 rounded-xl border border-gray-200 flex items-center px-4 gap-4 shadow-sm z-10">
                 <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center"><PenTool className="w-5 h-5" /></div>
                 <div className="w-8 h-8 rounded-lg hover:bg-gray-200 text-gray-500 flex items-center justify-center"><CubeTransparentIcon className="w-5 h-5" /></div>
                 <div className="w-8 h-8 rounded-lg hover:bg-gray-200 text-gray-500 flex items-center justify-center"><span className="font-serif font-bold">T</span></div>
               </div>
               
               {/* Mock Whiteboard Canvas */}
               <div className="flex-1 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] relative overflow-hidden">
                 {/* Drawn shapes */}
                 <div className="absolute top-1/3 left-1/4 w-32 h-20 border-2 border-teal-500 bg-teal-50 rounded-lg flex items-center justify-center text-teal-800 font-semibold shadow-sm transform -rotate-2">
                   Client
                 </div>
                 <svg className="absolute top-1/3 left-[calc(25%+8rem)] w-32 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                 </svg>
                 <div className="absolute top-1/3 right-1/4 w-32 h-20 border-2 border-indigo-500 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-800 font-semibold shadow-sm transform rotate-1">
                   Server
                 </div>

                 {/* Floating Chat bubbles */}
                 <div className="absolute right-8 bottom-8 flex flex-col gap-3 animate-float z-20">
                   <div className="bg-teal-600 text-white text-sm px-4 py-2 rounded-2xl rounded-br-sm shadow-lg max-w-xs">
                     I just sketched out the auth flow on the board! ✍️
                   </div>
                   <div className="bg-gray-800 text-gray-200 text-sm px-4 py-2 rounded-2xl rounded-bl-sm shadow-lg max-w-xs self-start -ml-12">
                     Looks perfect. Let's build it.
                   </div>
                 </div>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* Interactive Terminal CTA */}
      <section className={`py-32 px-6 relative overflow-hidden transition-colors duration-1000 ${focusMode ? 'bg-[#050505]' : 'bg-gray-900'}`}>
         {/* Background Elements */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-5xl pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px]"></div>
         </div>

         <div className={`relative z-10 max-w-3xl mx-auto transform transition-all duration-1000 ${focusMode ? 'opacity-90' : ''}`}>
            <div className="text-center mb-12">
               <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4" style={{ fontFamily: "'Righteous', system-ui, cursive" }}>
                  Ready to deploy your <span className="text-teal-400">workspace?</span>
               </h2>
               <p className="text-gray-400 text-lg">Initialize your distraction-free environment directly from the browser.</p>
            </div>

            {/* Terminal Window */}
            <div className="bg-[#0D1117] rounded-xl border border-gray-800 shadow-2xl overflow-hidden font-mono text-sm md:text-base">
               {/* Terminal Header */}
               <div className="bg-[#161B22] px-4 py-3 flex items-center justify-between border-b border-gray-800">
                  <div className="flex gap-2">
                     <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                     <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                     <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                  </div>
                  <div className="text-gray-500 text-xs text-center flex-1 pr-12">bash - enginet-cli</div>
               </div>
               
               {/* Terminal Body */}
               <div className="p-6 md:p-8 text-gray-300 flex flex-col gap-4 min-h-[250px]">
                  <div className="flex items-start gap-3">
                     <span className="text-teal-400 font-bold">➜</span>
                     <span className="text-blue-400 font-bold">~</span>
                     <span className="text-white">npx create-enginet-workspace@latest</span>
                  </div>
                  
                  <div className="text-gray-500">
                     Downloading dependencies...
                  </div>

                  <div className="flex items-center gap-2 flex-wrap mt-2">
                     <span className="text-green-400 font-bold">?</span>
                     <span className="font-bold text-white">Project name:</span>
                     <div className="relative flex-1 min-w-[200px] flex items-center group">
                        <input 
                          type="text" 
                          placeholder="my-awesome-team"
                          value={ctaInput}
                          onChange={(e) => setCtaInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleDeploy()}
                          disabled={isDeploying}
                          className="bg-transparent text-teal-300 outline-none w-full border-b border-gray-700 focus:border-teal-400 transition-colors py-1 disabled:opacity-50"
                          spellCheck={false}
                        />
                        {!isDeploying && ctaInput && (
                           <span className="absolute right-0 text-gray-600 text-xs opacity-0 group-focus-within:opacity-100 transition-opacity">Press Enter</span>
                        )}
                     </div>
                  </div>

                  {isDeploying && (
                     <div className="mt-4 flex flex-col gap-2">
                        <div className="text-teal-400 animate-pulse">Initializing {ctaInput}...</div>
                        <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                           <div className="bg-gradient-to-r from-teal-500 to-indigo-500 h-full animate-[progress_1.5s_ease-in-out_forwards]" style={{ width: '0%' }}>
                              <style>{`
                                @keyframes progress {
                                   0% { width: 0%; }
                                   50% { width: 70%; }
                                   100% { width: 100%; }
                                }
                              `}</style>
                           </div>
                        </div>
                     </div>
                  )}

                  {!isDeploying && (
                     <div className="mt-8 pt-6 border-t border-gray-800 flex justify-end">
                        <button 
                          onClick={handleDeploy}
                          className={`px-6 py-3 rounded font-bold text-sm transition-all flex items-center gap-2 group ${ctaInput.trim() ? 'bg-white text-gray-900 hover:bg-teal-400' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
                        >
                           Initialize <CpuChipIcon className={`w-4 h-4 ${ctaInput.trim() ? 'group-hover:rotate-180 transition-transform duration-500' : ''}`} />
                        </button>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </section>

      {/* Footer - Professional & Creative */}
      <footer className={`pt-24 pb-12 border-t transition-colors duration-1000 ${focusMode ? 'bg-[#020202] border-gray-900' : 'bg-gray-950 border-gray-800'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
            <div className="col-span-2 lg:col-span-2">
              <Link to="/" className="flex items-center gap-2 text-white hover:opacity-90 transition-opacity mb-6">
                <EngiNetLogo className="w-8 h-8 text-teal-500" interactive={true} />
                <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: "'Righteous', system-ui, cursive" }}>EngiNet</span>
              </Link>
              <p className="text-gray-400 mb-8 max-w-sm text-sm leading-relaxed">
                The modern workspace for developers. Connect, collaborate, and ship brilliant ideas without the noise.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-teal-500 hover:text-white hover:border-teal-500 transition-all"><CodeBracketIcon className="w-5 h-5"/></a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-teal-500 hover:text-white hover:border-teal-500 transition-all"><CommandLineIcon className="w-5 h-5"/></a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-teal-500 hover:text-white hover:border-teal-500 transition-all"><CpuChipIcon className="w-5 h-5"/></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 tracking-wide text-sm uppercase">Product</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a href="#features" className="hover:text-teal-400 transition-colors">Features</a></li>
                <li><a href="#focus" className="hover:text-teal-400 transition-colors">Focus Mode</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors flex items-center gap-2">Integrations <span className="bg-teal-500/20 text-teal-400 text-[10px] px-2 py-0.5 rounded-full font-bold">NEW</span></a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 tracking-wide text-sm uppercase">Resources</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a href="#" className="hover:text-teal-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 tracking-wide text-sm uppercase">Company</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a href="#" className="hover:text-teal-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Legal</a></li>
              </ul>
            </div>
          </div>
          
          <div className="w-full border-t border-gray-800/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} EngiNet Inc. Built for builders.</p>
            <div className="flex gap-6 text-sm text-gray-500">
               <a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a>
               <a href="#" className="hover:text-teal-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
